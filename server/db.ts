import { createClient, Client } from '@libsql/client';
import { panimalarRoutes, panimalarBuses } from '../src/data/panimalarRoutes';

let dbClient: Client | null = null;
let isTursoCloud = false;

export function getDb(): { client: Client; isTursoCloud: boolean } {
  if (!dbClient) {
    const url = process.env.TURSO_DATABASE_URL || 'file:local_turso.db';
    const authToken = process.env.TURSO_AUTH_TOKEN;

    isTursoCloud = Boolean(
      process.env.TURSO_DATABASE_URL &&
      (process.env.TURSO_DATABASE_URL.startsWith('libsql://') || process.env.TURSO_DATABASE_URL.startsWith('https://'))
    );

    console.log(`[Database] Initializing database client. Target: ${isTursoCloud ? 'Turso Cloud' : 'Local LibSQL/SQLite (' + url + ')'}`);

    dbClient = createClient({
      url,
      authToken: authToken || undefined,
    });
  }

  return { client: dbClient, isTursoCloud };
}

export async function initDatabase() {
  const { client, isTursoCloud: isCloud } = getDb();

  try {
    // 1. Create Tables
    await client.execute(`
      CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        route_name TEXT NOT NULL,
        starting_point TEXT NOT NULL,
        destination TEXT NOT NULL,
        stops TEXT NOT NULL,
        distance REAL NOT NULL,
        estimated_time INTEGER NOT NULL,
        assigned_bus_id TEXT,
        status TEXT NOT NULL,
        source_time TEXT,
        destination_time TEXT
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS buses (
        id TEXT PRIMARY KEY,
        bus_number TEXT NOT NULL,
        registration_number TEXT NOT NULL,
        model TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        route_id TEXT,
        insurance_expiry TEXT NOT NULL,
        last_maintenance_date TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        roll_number TEXT NOT NULL,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        year TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        parent_contact TEXT NOT NULL,
        assigned_route_id TEXT,
        pickup_stop TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS trips (
        id TEXT PRIMARY KEY,
        bus_id TEXT NOT NULL,
        route_id TEXT NOT NULL,
        date TEXT NOT NULL,
        departure_time TEXT NOT NULL,
        arrival_time TEXT,
        occupancy INTEGER NOT NULL,
        status TEXT NOT NULL
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        user_id TEXT NOT NULL,
        read INTEGER NOT NULL DEFAULT 0
      );
    `);

    // 2. Check and Seed Routes
    const existingRoutes = await client.execute('SELECT COUNT(*) as count FROM routes');
    const routeCount = Number(existingRoutes.rows[0]?.count ?? 0);

    if (routeCount === 0) {
      console.log(`[Database] Seeding 77 Panimalar Engineering College routes into ${isCloud ? 'Turso' : 'Local SQLite'}...`);
      for (const r of panimalarRoutes) {
        await client.execute({
          sql: `INSERT INTO routes (id, route_name, starting_point, destination, stops, distance, estimated_time, assigned_bus_id, status, source_time, destination_time)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      console.log(`[Database] Successfully seeded ${panimalarRoutes.length} routes.`);
    }

    // 3. Check and Seed Buses
    const existingBuses = await client.execute('SELECT COUNT(*) as count FROM buses');
    const busCount = Number(existingBuses.rows[0]?.count ?? 0);

    if (busCount === 0) {
      console.log(`[Database] Seeding 77 Panimalar Engineering College buses into ${isCloud ? 'Turso' : 'Local SQLite'}...`);
      for (const b of panimalarBuses) {
        await client.execute({
          sql: `INSERT INTO buses (id, bus_number, registration_number, model, capacity, route_id, insurance_expiry, last_maintenance_date, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      console.log(`[Database] Successfully seeded ${panimalarBuses.length} buses.`);
    }

    // 4. Seed initial sample students and trips if empty
    const existingStudents = await client.execute('SELECT COUNT(*) as count FROM students');
    const studentCount = Number(existingStudents.rows[0]?.count ?? 0);

    if (studentCount === 0) {
      const sampleStudents = [
        {
          id: 'S001',
          rollNumber: 'CS202401',
          name: 'Arun Kumar',
          department: 'Computer Science and Engineering',
          year: '3rd Year',
          phone: '+91 98765 43210',
          email: 'arun.cs@panimalar.ac.in',
          parentContact: '+91 98765 01234',
          assignedRouteId: 'R-01',
          pickupStop: 'Arcot Bus Stand',
          status: 'Active',
        },
        {
          id: 'S002',
          rollNumber: 'IT202445',
          name: 'Priya Dharshini',
          department: 'Information Technology',
          year: '2nd Year',
          phone: '+91 98765 43211',
          email: 'priya.it@panimalar.ac.in',
          parentContact: '+91 98765 01235',
          assignedRouteId: 'R-07',
          pickupStop: 'Kancheepuram Bus Stand',
          status: 'Active',
        },
        {
          id: 'S003',
          rollNumber: 'EC202412',
          name: 'Vigneshwaran S',
          department: 'Electronics and Communication',
          year: '4th Year',
          phone: '+91 98765 43212',
          email: 'vicky.ece@panimalar.ac.in',
          parentContact: '+91 98765 01236',
          assignedRouteId: 'R-46',
          pickupStop: 'Thirumangalam',
          status: 'Active',
        },
        {
          id: 'S004',
          rollNumber: 'ME202488',
          name: 'Karthik Raja',
          department: 'Mechanical Engineering',
          year: '3rd Year',
          phone: '+91 98765 43213',
          email: 'karthik.mech@panimalar.ac.in',
          parentContact: '+91 98765 01237',
          assignedRouteId: 'R-72',
          pickupStop: 'Porur Junction',
          status: 'Active',
        },
      ];

      for (const s of sampleStudents) {
        await client.execute({
          sql: `INSERT INTO students (id, roll_number, name, department, year, phone, email, parent_contact, assigned_route_id, pickup_stop, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            s.id,
            s.rollNumber,
            s.name,
            s.department,
            s.year,
            s.phone,
            s.email,
            s.parentContact,
            s.assignedRouteId,
            s.pickupStop,
            s.status,
          ],
        });
      }
    }

    const existingTrips = await client.execute('SELECT COUNT(*) as count FROM trips');
    const tripCount = Number(existingTrips.rows[0]?.count ?? 0);

    if (tripCount === 0) {
      const today = new Date().toISOString().split('T')[0];
      const sampleTrips = [
        { id: 'T-01', busId: 'B-01', routeId: 'R-01', date: today, departureTime: '05:10 AM', arrivalTime: '07:15 AM', occupancy: 52, status: 'Running' },
        { id: 'T-02', busId: 'B-07', routeId: 'R-07', date: today, departureTime: '06:00 AM', arrivalTime: '07:15 AM', occupancy: 48, status: 'Running' },
        { id: 'T-03', busId: 'B-46', routeId: 'R-46', date: today, departureTime: '06:30 AM', arrivalTime: '07:15 AM', occupancy: 55, status: 'Scheduled' },
        { id: 'T-04', busId: 'B-72', routeId: 'R-72', date: today, departureTime: '06:30 AM', arrivalTime: '07:15 AM', occupancy: 40, status: 'Scheduled' },
      ];

      for (const t of sampleTrips) {
        await client.execute({
          sql: `INSERT INTO trips (id, bus_id, route_id, date, departure_time, arrival_time, occupancy, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [t.id, t.busId, t.routeId, t.date, t.departureTime, t.arrivalTime, t.occupancy, t.status],
        });
      }
    }

    console.log(`[Database] Database initialized and verified successfully.`);
  } catch (err) {
    console.error('[Database] Error initializing database tables:', err);
  }
}
