package com.college.bus.service;

import com.college.bus.dto.DashboardStatsResponse;
import com.college.bus.repository.*;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final BusRepository busRepository;
    private final StudentRepository studentRepository;
    private final RouteRepository routeRepository;
    private final TripRepository tripRepository;
    private final MaintenanceRepository maintenanceRepository;

    public ReportService(BusRepository busRepository,
                         StudentRepository studentRepository,
                         RouteRepository routeRepository,
                         TripRepository tripRepository,
                         MaintenanceRepository maintenanceRepository) {
        this.busRepository = busRepository;
        this.studentRepository = studentRepository;
        this.routeRepository = routeRepository;
        this.tripRepository = tripRepository;
        this.maintenanceRepository = maintenanceRepository;
    }

    public DashboardStatsResponse getDashboardStats() {
        long totalBuses = busRepository.count();
        long activeBuses = busRepository.findByStatus("Active").size();
        long totalStudents = studentRepository.count();
        long totalRoutes = routeRepository.count();
        long activeTrips = tripRepository.findByStatus("Running").size();
        long maintenanceCount = maintenanceRepository.count();

        return new DashboardStatsResponse(
                totalBuses,
                activeBuses,
                totalStudents,
                totalRoutes,
                activeTrips,
                maintenanceCount
        );
    }
}
