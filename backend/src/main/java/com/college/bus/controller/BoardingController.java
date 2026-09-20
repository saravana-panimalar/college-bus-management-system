package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.BoardingRecord;
import com.college.bus.service.BoardingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boarding")
@CrossOrigin(origins = "*")
public class BoardingController {

    private final BoardingService boardingService;

    public BoardingController(BoardingService boardingService) {
        this.boardingService = boardingService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BoardingRecord>>> getAllRecords(
            @RequestParam(required = false) String tripId) {
        if (tripId != null && !tripId.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok(boardingService.getRecordsByTripId(tripId)));
        }
        return ResponseEntity.ok(ApiResponse.ok(boardingService.getAllBoardingRecords()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BoardingRecord>> recordBoarding(@RequestBody BoardingRecord record) {
        BoardingRecord saved = boardingService.recordBoarding(record);
        return ResponseEntity.ok(ApiResponse.ok("Boarding recorded", saved));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<BoardingRecord>> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            String boardingTime = body.get("boardingTime");
            BoardingRecord updated = boardingService.updateStatus(id, status, boardingTime);
            return ResponseEntity.ok(ApiResponse.ok("Boarding status updated", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }
}
