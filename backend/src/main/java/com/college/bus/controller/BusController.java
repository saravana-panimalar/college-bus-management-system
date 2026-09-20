package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.Bus;
import com.college.bus.service.BusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "*")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Bus>>> getAllBuses() {
        return ResponseEntity.ok(ApiResponse.ok(busService.getAllBuses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Bus>> getBusById(@PathVariable String id) {
        return busService.getBusById(id)
                .map(bus -> ResponseEntity.ok(ApiResponse.ok(bus)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Bus not found")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Bus>> createBus(@RequestBody Bus bus) {
        Bus created = busService.createBus(bus);
        return ResponseEntity.ok(ApiResponse.ok("Bus created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Bus>> updateBus(@PathVariable String id, @RequestBody Bus bus) {
        try {
            Bus updated = busService.updateBus(id, bus);
            return ResponseEntity.ok(ApiResponse.ok("Bus updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBus(@PathVariable String id) {
        busService.deleteBus(id);
        return ResponseEntity.ok(ApiResponse.ok("Bus deleted successfully", null));
    }
}
