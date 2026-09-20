# College Bus Management System

A full-stack **College Bus Management System** designed to simplify and manage college transportation operations through a modern web application.

The system provides separate workflows for **Administrators and Students**, with modules for bus management, route management, student registration, trip tracking, boarding records, maintenance, notifications, reports, and authentication.

---

## Features

### Admin

- Admin authentication and protected routes
- Dashboard with transportation statistics
- Bus management
- Route and stop management
- Student management
- Trip management
- Live bus tracking interface
- Boarding management
- Bus maintenance management
- Notifications
- Reports and dashboard analytics
- Application settings

### Student

- Student authentication
- Student dashboard
- Assigned route information
- Boarding history
- Protected student-specific routes

### Backend

- RESTful API architecture
- Spring Boot 3
- Java 17
- Spring Data JPA
- H2 in-memory database
- PostgreSQL support
- MySQL support
- CORS configuration
- Pre-seeded sample data
- Layered Controller-Service-Repository architecture

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Motion

### Backend

- Java 17
- Spring Boot 3.2.5
- Spring Web
- Spring Data JPA
- Bean Validation
- Maven

### Database

- H2
- PostgreSQL
- MySQL

---

## Project Architecture

```text
college-bus-management-system/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── StatusBadge.tsx
│   │   │
│   │   └── ProtectedRoute.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── mock/
│   │   ├── mockBuses.ts
│   │   ├── mockOther.ts
│   │   ├── mockRoutes.ts
│   │   └── mockStudents.ts
│   │
│   ├── pages/
│   │   ├── AdminDashboard.tsx
│   │   ├── BusManagement.tsx
│   │   ├── BusTracking.tsx
│   │   ├── Login.tsx
│   │   ├── RouteManagement.tsx
│   │   ├── Settings.tsx
│   │   └── StudentManagement.tsx
│   │
│   ├── services/
│   │   ├── apiConfig.ts
│   │   ├── busService.ts
│   │   ├── otherServices.ts
│   │   ├── routeService.ts
│   │   └── studentService.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/college/bus/
│   │       │   ├── config/
│   │       │   ├── controller/
│   │       │   ├── dto/
│   │       │   ├── entity/
│   │       │   ├── repository/
│   │       │   └── service/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   └── README.md
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## System Architecture

```text
                 ┌──────────────────────────┐
                 │       React Frontend     │
                 │     TypeScript + Vite    │
                 └────────────┬─────────────┘
                              │
                              │ REST API
                              ▼
                 ┌──────────────────────────┐
                 │    Spring Boot Backend   │
                 │        Java 17           │
                 └────────────┬─────────────┘
                              │
                    Spring Data JPA
                              │
                              ▼
                 ┌──────────────────────────┐
                 │       Database           │
                 │ H2 / PostgreSQL / MySQL  │
                 └──────────────────────────┘
```

---

## Frontend Modules

### Authentication

The application includes protected routes and role-based access control for:

* Admin
* Student

Authentication is handled through:

```text
src/context/AuthContext.tsx
src/components/ProtectedRoute.tsx
```

---

### Admin Dashboard

The admin dashboard provides an overview of the college transportation system.

It is designed to display information such as:

* Total buses
* Registered students
* Active trips
* Route information
* Transportation status
* Operational statistics

---

### Bus Management

Administrators can manage college buses.

Supported operations include:

* View buses
* Add buses
* Update bus information
* Remove buses
* View bus status
* Manage bus-related information

---

### Route Management

The route module manages college transportation routes and stops.

Features include:

* View routes
* Create routes
* Update routes
* Delete routes
* Manage route stops
* Associate students with routes

---

### Student Management

Administrators can manage students registered for college transportation.

Features include:

* View students
* Add students
* Update student registration
* Delete students
* Filter students by route

---

### Bus Tracking

The application provides a bus tracking interface for monitoring active trips and transportation operations.

The backend supports active-trip retrieval through:

```text
GET /api/trips/active
```

---

### Boarding Management

The backend provides boarding-record functionality for tracking student boarding activity.

Supported operations include:

* View boarding records
* Record student boarding
* Update boarding status
* Filter records by trip

---

### Maintenance Management

The maintenance module is designed to track bus maintenance activities.

Supported operations include:

* View maintenance records
* Add maintenance records
* Update maintenance records
* Delete maintenance records
* Filter maintenance records by bus

---

### Notifications

The notification module allows transportation-related notifications to be created and managed.

Supported operations include:

* View notifications
* Send notifications
* Broadcast notifications
* Mark notifications as read

---

### Reports

The backend provides transportation summary information through the reporting API.

Example metrics include:

* Total buses
* Total students
* Active trips
* Fleet-related statistics

---

## Backend Architecture

The Spring Boot backend follows a layered architecture.

```text
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Database
```

### Controllers

Controllers expose REST API endpoints.

```text
AuthController
BusController
RouteController
StudentController
TripController
BoardingController
MaintenanceController
NotificationController
ReportController
```

### Services

Business logic is separated into service classes.

```text
AuthService
BusService
RouteService
StudentService
TripService
BoardingService
MaintenanceService
NotificationService
ReportService
```

### Repositories

Spring Data JPA repositories provide database access.

```text
UserRepository
BusRepository
RouteRepository
StudentRepository
TripRepository
BoardingRepository
MaintenanceRepository
NotificationRepository
```

### Entities

The main database entities include:

```text
User
Bus
Route
Student
Trip
BoardingRecord
MaintenanceRecord
Notification
```

---

## REST API

### Authentication

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/auth/login`   | Authenticate a user |
| GET    | `/api/auth/me/{id}` | Get user profile    |

### Buses

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| GET    | `/api/buses`      | Get all buses   |
| GET    | `/api/buses/{id}` | Get bus details |
| POST   | `/api/buses`      | Add a bus       |
| PUT    | `/api/buses/{id}` | Update a bus    |
| DELETE | `/api/buses/{id}` | Delete a bus    |

### Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/routes`      | Get all routes    |
| GET    | `/api/routes/{id}` | Get route details |
| POST   | `/api/routes`      | Create a route    |
| PUT    | `/api/routes/{id}` | Update a route    |
| DELETE | `/api/routes/{id}` | Delete a route    |

### Students

| Method | Endpoint                        | Description                      |
| ------ | ------------------------------- | -------------------------------- |
| GET    | `/api/students`                 | Get all students                 |
| GET    | `/api/students/{id}`            | Get student details              |
| GET    | `/api/students/route/{routeId}` | Get students assigned to a route |
| POST   | `/api/students`                 | Register a student               |
| PUT    | `/api/students/{id}`            | Update student details           |
| DELETE | `/api/students/{id}`            | Delete a student                 |

### Trips

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| GET    | `/api/trips`             | Get all trips      |
| GET    | `/api/trips/active`      | Get active trips   |
| GET    | `/api/trips/{id}`        | Get trip details   |
| POST   | `/api/trips`             | Schedule a trip    |
| PUT    | `/api/trips/{id}`        | Update a trip      |
| PATCH  | `/api/trips/{id}/status` | Update trip status |
| DELETE | `/api/trips/{id}`        | Delete a trip      |

Supported trip statuses:

```text
Scheduled
Running
Completed
Cancelled
```

### Boarding

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | `/api/boarding`             | Get boarding records   |
| POST   | `/api/boarding`             | Record boarding        |
| PUT    | `/api/boarding/{id}/status` | Update boarding status |

Optional filter:

```text
/api/boarding?tripId={tripId}
```

### Maintenance

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/maintenance`      | Get maintenance records   |
| POST   | `/api/maintenance`      | Add maintenance record    |
| PUT    | `/api/maintenance/{id}` | Update maintenance record |
| DELETE | `/api/maintenance/{id}` | Delete maintenance record |

Optional filter:

```text
/api/maintenance?busId={busId}
```

### Notifications

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/notifications`           | Get notifications         |
| POST   | `/api/notifications`           | Create/send notification  |
| PATCH  | `/api/notifications/{id}/read` | Mark notification as read |

Optional filter:

```text
/api/notifications?userId={userId}
```

### Reports

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/api/reports/summary` | Get transportation summary |

---

# Getting Started

## Prerequisites

Install the following software before running the project.

### Frontend

* Node.js 18+
* npm

### Backend

* Java 17+
* Maven 3.8+

---

## Clone the Repository

```bash
git clone <your-repository-url>
cd college-bus-management-system
```

---

# Running the Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## Frontend Commands

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

---

# Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn clean spring-boot:run
```

The backend starts on:

```text
http://localhost:8080
```

API base URL:

```text
http://localhost:8080/api
```

---

# H2 Database

The default backend configuration uses an in-memory H2 database.

H2 Console:

```text
http://localhost:8080/h2-console
```

Database configuration:

```text
JDBC URL: jdbc:h2:mem:collegebusdb
Username: sa
Password:
```

The database is automatically initialized with sample transportation data through the application's data initializer.

---

# PostgreSQL Configuration

To use PostgreSQL, update:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/collegebus
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

Create the database before starting the backend:

```sql
CREATE DATABASE collegebus;
```

---

# MySQL Configuration

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/collegebus?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

Create the database:

```sql
CREATE DATABASE collegebus;
```

---

# Frontend and Backend Integration

The frontend contains an API configuration layer:

```text
src/services/apiConfig.ts
```

The default backend API URL is:

```text
http://localhost:8080/api
```

You can configure the API base URL using:

```text
VITE_API_BASE_URL
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

When the backend is unavailable, the frontend can use its mock/in-memory service data for UI functionality.

---

# Environment Variables

Create a local environment file if required:

```text
.env.local
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Do not commit sensitive credentials or secrets to the repository.

---

# Development Workflow

Run the backend first:

```bash
cd backend
mvn spring-boot:run
```

Then open another terminal and start the frontend:

```bash
npm install
npm run dev
```

Application:

```text
Frontend → http://localhost:3000
Backend  → http://localhost:8080
API      → http://localhost:8080/api
H2       → http://localhost:8080/h2-console
```

---

# Data Flow

A typical request follows this flow:

```text
User
 │
 ▼
React UI
 │
 ▼
Frontend Service
 │
 ▼
REST API
 │
 ▼
Spring Boot Controller
 │
 ▼
Service Layer
 │
 ▼
JPA Repository
 │
 ▼
Database
```

The response follows the reverse path:

```text
Database
 │
 ▼
Repository
 │
 ▼
Service
 │
 ▼
Controller
 │
 ▼
REST Response
 │
 ▼
React Application
 │
 ▼
User Interface
```

---

# Security

The frontend implements protected routes using:

```text
ProtectedRoute.tsx
```

Role-based access is currently organized around:

```text
Admin
Student
```

Administrative pages are protected from unauthorized student access.

Authentication API:

```text
POST /api/auth/login
```

---

# Future Enhancements

Potential improvements include:

* Real-time GPS bus tracking
* Google Maps integration
* Driver management interface
* QR-based student boarding
* Automated route optimization
* Push notifications
* SMS/email notifications
* Advanced transportation analytics
* Role-based permissions beyond Admin and Student
* JWT-based authentication
* PostgreSQL production deployment
* Mobile application for students and drivers
* Automated attendance and boarding analytics
* Bus capacity monitoring
* Maintenance reminders
* Trip scheduling automation

---

# Project Status

The project currently contains:

* React frontend
* TypeScript application structure
* Admin authentication flow
* Student authentication flow
* Admin dashboard
* Bus management
* Route management
* Student management
* Bus tracking interface
* Spring Boot REST backend
* JPA repositories
* H2 database support
* PostgreSQL support
* MySQL support
* Transportation-related API modules

Some frontend modules are currently represented as placeholder pages while their backend/API infrastructure is available.

---

# License

This project is intended for educational and academic purposes.

---

# Authors

**Saravanakumar G**

**Saran Kumar**

**Nitheesh kumar**

**Mathesh**
