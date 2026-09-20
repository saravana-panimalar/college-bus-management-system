package com.college.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "maintenance_records")
public class MaintenanceRecord {

    @Id
    private String id;

    @Column(nullable = false)
    private String busId;

    @Column(nullable = false)
    private String type; // "Regular Service", "Repair", "Inspection", "Emergency"

    @Column(nullable = false)
    private String date;

    private String description;
    private Double cost;
    private String nextMaintenanceDate;

    @Column(nullable = false)
    private String status; // "Completed", "Scheduled", "In Progress"

    public MaintenanceRecord() {}

    public MaintenanceRecord(String id, String busId, String type, String date,
                             String description, Double cost, String nextMaintenanceDate, String status) {
        this.id = id;
        this.busId = busId;
        this.type = type;
        this.date = date;
        this.description = description;
        this.cost = cost;
        this.nextMaintenanceDate = nextMaintenanceDate;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBusId() { return busId; }
    public void setBusId(String busId) { this.busId = busId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getNextMaintenanceDate() { return nextMaintenanceDate; }
    public void setNextMaintenanceDate(String nextMaintenanceDate) { this.nextMaintenanceDate = nextMaintenanceDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
