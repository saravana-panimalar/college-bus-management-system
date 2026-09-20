package com.college.bus.config;

import com.college.bus.entity.*;
import com.college.bus.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BusRepository busRepository;
    private final RouteRepository routeRepository;
    private final StudentRepository studentRepository;
    private final TripRepository tripRepository;
    private final NotificationRepository notificationRepository;

    public DataInitializer(UserRepository userRepository,
                           BusRepository busRepository,
                           RouteRepository routeRepository,
                           StudentRepository studentRepository,
                           TripRepository tripRepository,
                           NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.busRepository = busRepository;
        this.routeRepository = routeRepository;
        this.studentRepository = studentRepository;
        this.tripRepository = tripRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(new User("U1", "Admin Office", "Admin", "admin@college.edu", "admin123", null));
            userRepository.save(new User("U3", "Sarah Student", "Student", "sarah@college.edu", "student123", null));
        }

        if (busRepository.count() == 0) {
            busRepository.save(new Bus("B001", "Bus 12", "TN-01-AB-1234", "Tata Starbus Ultra", 50, "R001", "2027-12-31", "2026-08-15", "Active"));
            busRepository.save(new Bus("B002", "Bus 05", "TN-01-CD-5678", "Ashok Leyland Lynx", 40, "R002", "2027-10-15", "2026-07-20", "Active"));
            busRepository.save(new Bus("B003", "Bus 08", "TN-01-EF-9012", "Eicher Skyline Pro", 45, null, "2027-05-10", "2026-09-01", "Maintenance"));
        }

        if (routeRepository.count() == 0) {
            routeRepository.save(new Route("R001", "Central Station - Campus", "Central Station", "College Campus",
                    Arrays.asList("Central Station", "City Square", "Green Park", "Tech Hub", "College Campus"),
                    24.5, "45 mins", "B001", "Active"));
            routeRepository.save(new Route("R002", "North Gate - Campus", "North Gate", "College Campus",
                    Arrays.asList("North Gate", "Metro Mall", "Sunrise Junction", "College Campus"),
                    18.2, "35 mins", "B002", "Active"));
        }

        if (studentRepository.count() == 0) {
            studentRepository.save(new Student("S001", "CS202401", "Alice Johnson", "Computer Science", 3,
                    "+1 555-0101", "alice.j@college.edu", "+1 555-9901", "R001", "City Square", "Active"));
            studentRepository.save(new Student("S002", "EC202402", "David Miller", "Electronics", 2,
                    "+1 555-0102", "david.m@college.edu", "+1 555-9902", "R001", "Green Park", "Active"));
            studentRepository.save(new Student("S003", "ME202403", "Emma Watson", "Mechanical", 4,
                    "+1 555-0103", "emma.w@college.edu", "+1 555-9903", "R002", "Metro Mall", "Active"));
        }

        if (tripRepository.count() == 0) {
            tripRepository.save(new Trip("T1001", "B001", "R001", "2026-09-19", "07:30 AM", "08:15 AM", 38, "Running"));
            tripRepository.save(new Trip("T1002", "B002", "R002", "2026-09-19", "07:45 AM", "08:20 AM", 29, "Scheduled"));
        }

        if (notificationRepository.count() == 0) {
            notificationRepository.save(new Notification("N001", "U1", "Bus 12 on route", "Bus 12 has departed Central Station on schedule.", "2026-09-19 07:32", false, "Info"));
            notificationRepository.save(new Notification("N002", "U1", "Bus 08 Maintenance", "Bus 08 regular brake inspection scheduled.", "2026-09-18 16:00", true, "Warning"));
        }
    }
}
