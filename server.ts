import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { getDb, initDatabase } from './server/db';
import { panimalarRoutes, panimalarBuses } from './src/data/panimalarRoutes';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize DB tables and seed data
  await initDatabase();

  // API Routes

  // Health and Database connection status
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/db/status', async (req, res) => {
    try {
      const { client, isTursoCloud } = getDb();
      const rawUrl = process.env.TURSO_DATABASE_URL || '';
      const maskedUrl = rawUrl
        ? rawUrl.replace(/(:\/\/)([^@]+@)?([^/?#]+)/, '$1***@$3')
        : 'Local SQLite (file:local_turso.db)';

      const [rCount, bCount, sCount, tCount] = await Promise.all([
        client.execute('SELECT COUNT(*) as c FROM routes'),
        client.execute('SELECT COUNT(*) as c FROM buses'),
        client.execute('SELECT COUNT(*) as c FROM students'),
        client.execute('SELECT COUNT(*) as c FROM trips'),
      ]);

      res.json({
        connected: true,
        provider: isTursoCloud ? 'Turso Cloud (libSQL)' : 'Local LibSQL / SQLite (Ready for Turso)',
        isTursoCloud,
        databaseUrl: isTursoCloud ? maskedUrl : 'file:local_turso.db',
        hasAuthToken: Boolean(process.env.TURSO_AUTH_TOKEN),
        counts: {
          routes: Number(rCount.rows[0]?.c ?? 0),
          buses: Number(bCount.rows[0]?.c ?? 0),
          students: Number(sCount.rows[0]?.c ?? 0),
          trips: Number(tCount.rows[0]?.c ?? 0),
        },
      });
    } catch (err: any) {
      res.status(500).json({ connected: false, error: err.message });
    }
  });

  // Re-seed or sync Panimalar 77 routes
  app.post('/api/db/sync-seed', async (req, res) => {
    try {
      const { client } = getDb();

      // Upsert routes
      for (const r of panimalarRoutes) {
        await client.execute({
          sql: `INSERT INTO routes (id, route_name, starting_point, destination, stops, distance, estimated_time, assigned_bus_id, status, source_time, destination_time)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                  route_name = excluded.route_name,
                  starting_point = excluded.starting_point,
                  destination = excluded.destination,
                  stops = excluded.stops,
                  distance = excluded.distance,
                  estimated_time = excluded.estimated_time,
                  assigned_bus_id = excluded.assigned_bus_id,
                  status = excluded.status,
                  source_time = excluded.source_time,
                  destination_time = excluded.destination_time`,
          args: [
            r.id,
            r.routeName,
            r.startingPoint,
            r.destination,
            JSON.stringify(r.stops),
            r.distance,
            r.estimatedTime,
            r.assignedBusId,
            r.status,
            r.sourceTime || null,
            r.destinationTime || null,
          ],
        });
      }

      // Upsert buses
      for (const b of panimalarBuses) {
        await client.execute({
          sql: `INSERT INTO buses (id, bus_number, registration_number, model, capacity, route_id, insurance_expiry, last_maintenance_date, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                  bus_number = excluded.bus_number,
                  registration_number = excluded.registration_number,
                  model = excluded.model,
                  capacity = excluded.capacity,
                  route_id = excluded.route_id,
                  insurance_expiry = excluded.insurance_expiry,
                  last_maintenance_date = excluded.last_maintenance_date,
                  status = excluded.status`,
          args: [
            b.id,
            b.busNumber,
            b.registrationNumber,
            b.model,
            b.capacity,
            b.routeId,
            b.insuranceExpiry,
            b.lastMaintenanceDate,
            b.status,
          ],
        });
      }

      res.json({ success: true, message: `Synced ${panimalarRoutes.length} Panimalar routes and buses to database.` });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ROUTES Endpoints
  app.get('/api/routes', async (req, res) => {
    try {
      const { client } = getDb();
      const result = await client.execute('SELECT * FROM routes ORDER BY id ASC');
      const routes = result.rows.map((row) => ({
        id: String(row.id),
        routeName: String(row.route_name),
        startingPoint: String(row.starting_point),
        destination: String(row.destination),
        stops: typeof row.stops === 'string' ? JSON.parse(row.stops) : [],
        distance: Number(row.distance),
        estimatedTime: Number(row.estimated_time),
        assignedBusId: row.assigned_bus_id ? String(row.assigned_bus_id) : null,
        status: String(row.status) as 'Active' | 'Inactive',
        sourceTime: row.source_time ? String(row.source_time) : undefined,
        destinationTime: row.destination_time ? String(row.destination_time) : undefined,
      }));
      res.json(routes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/routes', async (req, res) => {
    try {
      const { client } = getDb();
      const r = req.body;
      const id = r.id || `R-${Date.now().toString().slice(-4)}`;
      await client.execute({
        sql: `INSERT INTO routes (id, route_name, starting_point, destination, stops, distance, estimated_time, assigned_bus_id, status, source_time, destination_time)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          r.routeName,
          r.startingPoint,
          r.destination,
          JSON.stringify(r.stops || [r.startingPoint, r.destination]),
          r.distance || 25,
          r.estimatedTime || 60,
          r.assignedBusId || null,
          r.status || 'Active',
          r.sourceTime || '06:00 AM',
          r.destinationTime || '07:15 AM',
        ],
      });
      res.status(201).json({ ...r, id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/routes/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      const r = req.body;
      await client.execute({
        sql: `UPDATE routes SET
                route_name = COALESCE(?, route_name),
                starting_point = COALESCE(?, starting_point),
                destination = COALESCE(?, destination),
                stops = COALESCE(?, stops),
                distance = COALESCE(?, distance),
                estimated_time = COALESCE(?, estimated_time),
                assigned_bus_id = COALESCE(?, assigned_bus_id),
                status = COALESCE(?, status),
                source_time = COALESCE(?, source_time),
                destination_time = COALESCE(?, destination_time)
              WHERE id = ?`,
        args: [
          r.routeName ?? null,
          r.startingPoint ?? null,
          r.destination ?? null,
          r.stops ? JSON.stringify(r.stops) : null,
          r.distance ?? null,
          r.estimatedTime ?? null,
          r.assignedBusId ?? null,
          r.status ?? null,
          r.sourceTime ?? null,
          r.destinationTime ?? null,
          id,
        ],
      });
      res.json({ success: true, id, ...r });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/routes/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      await client.execute({ sql: 'DELETE FROM routes WHERE id = ?', args: [id] });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // BUSES Endpoints
  app.get('/api/buses', async (req, res) => {
    try {
      const { client } = getDb();
      const result = await client.execute('SELECT * FROM buses ORDER BY id ASC');
      const buses = result.rows.map((row) => ({
        id: String(row.id),
        busNumber: String(row.bus_number),
        registrationNumber: String(row.registration_number),
        model: String(row.model),
        capacity: Number(row.capacity),
        routeId: row.route_id ? String(row.route_id) : null,
        insuranceExpiry: String(row.insurance_expiry),
        lastMaintenanceDate: String(row.last_maintenance_date),
        status: String(row.status) as 'Active' | 'Maintenance' | 'Inactive',
      }));
      res.json(buses);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/buses', async (req, res) => {
    try {
      const { client } = getDb();
      const b = req.body;
      const id = b.id || `B-${Date.now().toString().slice(-4)}`;
      await client.execute({
        sql: `INSERT INTO buses (id, bus_number, registration_number, model, capacity, route_id, insurance_expiry, last_maintenance_date, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          b.busNumber,
          b.registrationNumber,
          b.model,
          b.capacity || 60,
          b.routeId || null,
          b.insuranceExpiry || '2027-12-31',
          b.lastMaintenanceDate || new Date().toISOString().split('T')[0],
          b.status || 'Active',
        ],
      });
      res.status(201).json({ ...b, id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/buses/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      const b = req.body;
      await client.execute({
        sql: `UPDATE buses SET
                bus_number = COALESCE(?, bus_number),
                registration_number = COALESCE(?, registration_number),
                model = COALESCE(?, model),
                capacity = COALESCE(?, capacity),
                route_id = COALESCE(?, route_id),
                insurance_expiry = COALESCE(?, insurance_expiry),
                last_maintenance_date = COALESCE(?, last_maintenance_date),
                status = COALESCE(?, status)
              WHERE id = ?`,
        args: [
          b.busNumber ?? null,
          b.registrationNumber ?? null,
          b.model ?? null,
          b.capacity ?? null,
          b.routeId ?? null,
          b.insuranceExpiry ?? null,
          b.lastMaintenanceDate ?? null,
          b.status ?? null,
          id,
        ],
      });
      res.json({ success: true, id, ...b });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/buses/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      await client.execute({ sql: 'DELETE FROM buses WHERE id = ?', args: [id] });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // STUDENTS Endpoints
  app.get('/api/students', async (req, res) => {
    try {
      const { client } = getDb();
      const result = await client.execute('SELECT * FROM students ORDER BY id ASC');
      const students = result.rows.map((row) => ({
        id: String(row.id),
        rollNumber: String(row.roll_number),
        name: String(row.name),
        department: String(row.department),
        year: String(row.year),
        phone: String(row.phone),
        email: String(row.email),
        parentContact: String(row.parent_contact),
        assignedRouteId: row.assigned_route_id ? String(row.assigned_route_id) : null,
        pickupStop: String(row.pickup_stop),
        status: String(row.status) as 'Active' | 'Inactive',
      }));
      res.json(students);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/students', async (req, res) => {
    try {
      const { client } = getDb();
      const s = req.body;
      const id = s.id || `S-${Date.now().toString().slice(-4)}`;
      await client.execute({
        sql: `INSERT INTO students (id, roll_number, name, department, year, phone, email, parent_contact, assigned_route_id, pickup_stop, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          s.rollNumber,
          s.name,
          s.department,
          s.year,
          s.phone,
          s.email,
          s.parentContact,
          s.assignedRouteId || null,
          s.pickupStop,
          s.status || 'Active',
        ],
      });
      res.status(201).json({ ...s, id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/students/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      const s = req.body;
      await client.execute({
        sql: `UPDATE students SET
                roll_number = COALESCE(?, roll_number),
                name = COALESCE(?, name),
                department = COALESCE(?, department),
                year = COALESCE(?, year),
                phone = COALESCE(?, phone),
                email = COALESCE(?, email),
                parent_contact = COALESCE(?, parent_contact),
                assigned_route_id = COALESCE(?, assigned_route_id),
                pickup_stop = COALESCE(?, pickup_stop),
                status = COALESCE(?, status)
              WHERE id = ?`,
        args: [
          s.rollNumber ?? null,
          s.name ?? null,
          s.department ?? null,
          s.year ?? null,
          s.phone ?? null,
          s.email ?? null,
          s.parentContact ?? null,
          s.assignedRouteId ?? null,
          s.pickupStop ?? null,
          s.status ?? null,
          id,
        ],
      });
      res.json({ success: true, id, ...s });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/students/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      await client.execute({ sql: 'DELETE FROM students WHERE id = ?', args: [id] });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // TRIPS Endpoints
  app.get('/api/trips', async (req, res) => {
    try {
      const { client } = getDb();
      const result = await client.execute('SELECT * FROM trips ORDER BY date DESC, departure_time ASC');
      const trips = result.rows.map((row) => ({
        id: String(row.id),
        busId: String(row.bus_id),
        routeId: String(row.route_id),
        date: String(row.date),
        departureTime: String(row.departure_time),
        arrivalTime: row.arrival_time ? String(row.arrival_time) : '',
        occupancy: Number(row.occupancy),
        status: String(row.status) as 'Scheduled' | 'Running' | 'Completed' | 'Delayed',
      }));
      res.json(trips);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/trips/:id', async (req, res) => {
    try {
      const { client } = getDb();
      const { id } = req.params;
      const t = req.body;
      await client.execute({
        sql: `UPDATE trips SET
                status = COALESCE(?, status),
                occupancy = COALESCE(?, occupancy),
                arrival_time = COALESCE(?, arrival_time)
              WHERE id = ?`,
        args: [t.status ?? null, t.occupancy ?? null, t.arrivalTime ?? null, id],
      });
      res.json({ success: true, id, ...t });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // MAINTENANCE Endpoints
  app.get('/api/maintenance', (req, res) => {
    res.json([
      {
        id: 'M001',
        busId: 'B-03',
        type: 'Repair',
        date: '2026-09-15',
        description: 'Engine cooling system inspection and oil change',
        cost: 4500,
        nextMaintenanceDate: '2027-03-15',
        status: 'In Progress',
      },
      {
        id: 'M002',
        busId: 'B-07',
        type: 'Inspection',
        date: '2026-09-10',
        description: 'Brake pad and suspension safety check',
        cost: 2200,
        nextMaintenanceDate: '2026-12-10',
        status: 'Completed',
      },
      {
        id: 'M003',
        busId: 'B-14',
        type: 'Routine',
        date: '2026-09-01',
        description: 'Tyre rotation and wheel alignment',
        cost: 3000,
        nextMaintenanceDate: '2026-12-01',
        status: 'Completed',
      }
    ]);
  });

  // DASHBOARD STATS Endpoint
  app.get('/api/reports/stats', async (req, res) => {
    try {
      const { client } = getDb();
      const [busesRes, routesRes, studentsRes, tripsRes] = await Promise.all([
        client.execute('SELECT COUNT(*) as total, SUM(capacity) as cap, SUM(CASE WHEN status = "Active" THEN 1 ELSE 0 END) as active FROM buses'),
        client.execute('SELECT COUNT(*) as total FROM routes'),
        client.execute('SELECT COUNT(*) as total FROM students'),
        client.execute('SELECT COUNT(*) as active FROM trips WHERE status = "Running"'),
      ]);

      res.json({
        totalBuses: Number(busesRes.rows[0]?.total ?? 0),
        activeBuses: Number(busesRes.rows[0]?.active ?? 0),
        totalCapacity: Number(busesRes.rows[0]?.cap ?? 0),
        totalRoutes: Number(routesRes.rows[0]?.total ?? 0),
        totalStudents: Number(studentsRes.rows[0]?.total ?? 0),
        activeTrips: Number(tripsRes.rows[0]?.active ?? 0),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
