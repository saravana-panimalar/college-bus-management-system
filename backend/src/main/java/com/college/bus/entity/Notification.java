package com.college.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    private String id;

    private String userId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(nullable = false)
    private String date;

    private Boolean isRead = false;

    @Column(nullable = false)
    private String type; // "Info", "Warning", "Alert"

    public Notification() {}

    public Notification(String id, String userId, String title, String message, String date, Boolean isRead, String type) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.date = date;
        this.isRead = isRead;
        this.type = type;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
