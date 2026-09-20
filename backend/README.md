# College Bus Management System - Java Spring Boot Backend

A production-ready Spring Boot 3 REST API backend built with Java 17, Spring Data JPA, and H2/PostgreSQL/MySQL database support.

---

## 🚀 Quick Start

### Prerequisites
- Java 17+ (e.g. OpenJDK 17 or Eclipse Temurin)
- Maven 3.8+

### 1. Run Locally (Default In-Memory H2 DB)
```bash
cd backend
mvn clean spring-boot:run
```
The server will start on port `8080`:
- **API Base URL**: `http://localhost:8080/api`
- **H2 Database Console**: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:collegebusdb`
  - Username: `sa`
  - Password: *(leave blank)*

### 2. Run with Docker
```bash
cd backend
docker build -t college-bus-backend .
docker run -p 8080:8080 college-bus-backend
```

---

## 🗄️ Database Configuration

By default, the backend runs with an in-memory **H2 database** pre-seeded with sample buses, routes, drivers, students, trips, and notifications.

To switch to **PostgreSQL** or **MySQL**, edit `src/main/resources/application.properties`:

### PostgreSQL
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/collegebus
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

### MySQL
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/collegebus?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---

## 📡 REST API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate user (Admin, Student) |
| `GET` | `/api/auth/me/{id}` | Get authenticated user profile |

### 🚌 Buses (`/api/buses`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/buses` | List all college buses |
| `GET` | `/api/buses/{id}` | Get bus details by ID |
| `POST` | `/api/buses` | Register a new bus |
| `PUT` | `/api/buses/{id}` | Update bus details |
| `DELETE` | `/api/buses/{id}` | Remove a bus |

### 🗺️ Routes (`/api/routes`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/routes` | List all routes and stops |
| `GET` | `/api/routes/{id}` | Get route details by ID |
| `POST` | `/api/routes` | Create a new route |
| `PUT` | `/api/routes/{id}` | Update route and stops |
| `DELETE` | `/api/routes/{id}` | Delete a route |

### 🎓 Students (`/api/students`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | List all registered students |
| `GET` | `/api/students/{id}` | Get student by ID |
| `GET` | `/api/students/route/{routeId}` | List students assigned to a route |
| `POST` | `/api/students` | Register a student for bus transport |
| `PUT` | `/api/students/{id}` | Update student registration |
| `DELETE` | `/api/students/{id}` | Delete a student |

### 🧭 Trips & Live Tracking (`/api/trips`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | List scheduled & completed trips |
| `GET` | `/api/trips/active` | Get currently running trips for live tracking |
| `GET` | `/api/trips/{id}` | Get trip details |
| `POST` | `/api/trips` | Schedule a new trip |
| `PUT` | `/api/trips/{id}` | Update trip |
| `PATCH` | `/api/trips/{id}/status` | Update trip status (`Scheduled`, `Running`, `Completed`, `Cancelled`) |
| `DELETE` | `/api/trips/{id}` | Delete trip |

### 📋 Boarding (`/api/boarding`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/boarding` | List boarding records (optional `?tripId=...`) |
| `POST` | `/api/boarding` | Record student boarding |
| `PUT` | `/api/boarding/{id}/status` | Update boarding status |

### 🔧 Maintenance (`/api/maintenance`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/maintenance` | List maintenance logs (optional `?busId=...`) |
| `POST` | `/api/maintenance` | Log a maintenance event |
| `PUT` | `/api/maintenance/{id}` | Update maintenance record |
| `DELETE` | `/api/maintenance/{id}` | Delete record |

### 🔔 Notifications (`/api/notifications`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notifications` | List notifications (optional `?userId=...`) |
| `POST` | `/api/notifications` | Broadcast or send a notification |
| `PATCH` | `/api/notifications/{id}/read` | Mark notification as read |

### 📊 Dashboard & Reports (`/api/reports`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reports/summary` | Real-time fleet metrics (total buses, students, active trips, etc.) |

---

## 🔗 Connecting with the React Frontend

The React frontend has been configured with an API configuration layer (`src/services/apiConfig.ts`).
1. When `VITE_API_BASE_URL` is configured (or defaults to `http://localhost:8080/api`), requests can be dispatched to this Spring Boot backend.
2. If the Java backend is not reachable, the frontend automatically falls back gracefully to in-memory state so UI previews remain functional.
