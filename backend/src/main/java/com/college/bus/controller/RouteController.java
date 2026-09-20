package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.Route;
import com.college.bus.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Route>>> getAllRoutes() {
        return ResponseEntity.ok(ApiResponse.ok(routeService.getAllRoutes()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Route>> getRouteById(@PathVariable String id) {
        return routeService.getRouteById(id)
                .map(r -> ResponseEntity.ok(ApiResponse.ok(r)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Route not found")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Route>> createRoute(@RequestBody Route route) {
        Route created = routeService.createRoute(route);
        return ResponseEntity.ok(ApiResponse.ok("Route created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Route>> updateRoute(@PathVariable String id, @RequestBody Route route) {
        try {
            Route updated = routeService.updateRoute(id, route);
            return ResponseEntity.ok(ApiResponse.ok("Route updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRoute(@PathVariable String id) {
        routeService.deleteRoute(id);
        return ResponseEntity.ok(ApiResponse.ok("Route deleted successfully", null));
    }
}
