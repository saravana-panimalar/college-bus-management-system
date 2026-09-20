package com.college.bus.service;

import com.college.bus.entity.Notification;
import com.college.bus.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification sendNotification(Notification notification) {
        if (notification.getId() == null || notification.getId().trim().isEmpty()) {
            notification.setId("N-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (notification.getIsRead() == null) {
            notification.setIsRead(false);
        }
        return notificationRepository.save(notification);
    }

    public Optional<Notification> markAsRead(String id) {
        return notificationRepository.findById(id).map(notif -> {
            notif.setIsRead(true);
            return notificationRepository.save(notif);
        });
    }
}
