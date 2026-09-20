package com.college.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "buses")
public class Bus {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String busNumber;

    @Column(nullable = false)
    private String registrationNumber;

    private String model;

    @Column(nullable = false)
    private Integer capacity;

    private String routeId;
    private String insuranceExpiry;
    private String lastMaintenanceDate;

    @Column(nullable = false)
    private String status; // "Active", "Inactive", "Maintenance"

    public Bus() {}

    public Bus(String id, String busNumber, String registrationNumber, String model,
               Integer capacity, String routeId,
               String insuranceExpiry, String lastMaintenanceDate, String status) {
        this.id = id;
        this.busNumber = busNumber;
        this.registrationNumber = registrationNumber;
        this.model = model;
        this.capacity = capacity;
        this.routeId = routeId;
        this.insuranceExpiry = insuranceExpiry;
        this.lastMaintenanceDate = lastMaintenanceDate;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }

    public String getInsuranceExpiry() { return insuranceExpiry; }
    public void setInsuranceExpiry(String insuranceExpiry) { this.insuranceExpiry = insuranceExpiry; }

    public String getLastMaintenanceDate() { return lastMaintenanceDate; }
    public void setLastMaintenanceDate(String lastMaintenanceDate) { this.lastMaintenanceDate = lastMaintenanceDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
