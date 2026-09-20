package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.Notification;
import com.college.bus.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Notification>>> getAllNotifications(
            @RequestParam(required = false) String userId) {
        if (userId != null && !userId.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok(notificationService.getNotificationsByUserId(userId)));
        }
        return ResponseEntity.ok(ApiResponse.ok(notificationService.getAllNotifications()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Notification>> sendNotification(@RequestBody Notification notification) {
        Notification sent = notificationService.sendNotification(notification);
        return ResponseEntity.ok(ApiResponse.ok("Notification sent", sent));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Notification>> markAsRead(@PathVariable String id) {
        return notificationService.markAsRead(id)
                .map(n -> ResponseEntity.ok(ApiResponse.ok("Notification marked as read", n)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Notification not found")));
    }
}
