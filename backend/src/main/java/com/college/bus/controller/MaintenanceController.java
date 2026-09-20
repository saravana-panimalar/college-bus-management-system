package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.MaintenanceRecord;
import com.college.bus.service.MaintenanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "*")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MaintenanceRecord>>> getAllRecords(
            @RequestParam(required = false) String busId) {
        if (busId != null && !busId.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok(maintenanceService.getRecordsByBusId(busId)));
        }
        return ResponseEntity.ok(ApiResponse.ok(maintenanceService.getAllRecords()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MaintenanceRecord>> getRecordById(@PathVariable String id) {
        return maintenanceService.getRecordById(id)
                .map(r -> ResponseEntity.ok(ApiResponse.ok(r)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Record not found")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MaintenanceRecord>> createRecord(@RequestBody MaintenanceRecord record) {
        MaintenanceRecord created = maintenanceService.createRecord(record);
        return ResponseEntity.ok(ApiResponse.ok("Maintenance record logged", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MaintenanceRecord>> updateRecord(
            @PathVariable String id, @RequestBody MaintenanceRecord record) {
        try {
            MaintenanceRecord updated = maintenanceService.updateRecord(id, record);
            return ResponseEntity.ok(ApiResponse.ok("Maintenance record updated", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRecord(@PathVariable String id) {
        maintenanceService.deleteRecord(id);
        return ResponseEntity.ok(ApiResponse.ok("Maintenance record deleted", null));
    }
}
