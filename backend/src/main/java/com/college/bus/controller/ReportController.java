package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.dto.DashboardStatsResponse;
import com.college.bus.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getSummary() {
        return ResponseEntity.ok(ApiResponse.ok(reportService.getDashboardStats()));
    }
}
