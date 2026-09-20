package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.Trip;
import com.college.bus.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Trip>>> getAllTrips() {
        return ResponseEntity.ok(ApiResponse.ok(tripService.getAllTrips()));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Trip>>> getActiveTrips() {
        return ResponseEntity.ok(ApiResponse.ok(tripService.getTripsByStatus("Running")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Trip>> getTripById(@PathVariable String id) {
        return tripService.getTripById(id)
                .map(t -> ResponseEntity.ok(ApiResponse.ok(t)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Trip not found")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Trip>> createTrip(@RequestBody Trip trip) {
        Trip created = tripService.createTrip(trip);
        return ResponseEntity.ok(ApiResponse.ok("Trip scheduled successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Trip>> updateTrip(@PathVariable String id, @RequestBody Trip trip) {
        try {
            Trip updated = tripService.updateTrip(id, trip);
            return ResponseEntity.ok(ApiResponse.ok("Trip updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Trip>> updateTripStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            Trip updated = tripService.updateTripStatus(id, status);
            return ResponseEntity.ok(ApiResponse.ok("Trip status updated", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTrip(@PathVariable String id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok(ApiResponse.ok("Trip deleted successfully", null));
    }
}
