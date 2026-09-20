package com.college.bus.service;

import com.college.bus.entity.Route;
import com.college.bus.repository.RouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(String id) {
        return routeRepository.findById(id);
    }

    public Route createRoute(Route route) {
        if (route.getId() == null || route.getId().trim().isEmpty()) {
            route.setId("R-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return routeRepository.save(route);
    }

    public Route updateRoute(String id, Route details) {
        return routeRepository.findById(id).map(route -> {
            route.setRouteName(details.getRouteName());
            route.setStartingPoint(details.getStartingPoint());
            route.setDestination(details.getDestination());
            if (details.getStops() != null) {
                route.setStops(details.getStops());
            }
            route.setDistance(details.getDistance());
            route.setEstimatedTime(details.getEstimatedTime());
            route.setAssignedBusId(details.getAssignedBusId());
            route.setStatus(details.getStatus());
            return routeRepository.save(route);
        }).orElseThrow(() -> new RuntimeException("Route not found with id: " + id));
    }

    public void deleteRoute(String id) {
        routeRepository.deleteById(id);
    }
}
