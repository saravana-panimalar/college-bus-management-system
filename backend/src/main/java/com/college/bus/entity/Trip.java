package com.college.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    private String id;

    @Column(nullable = false)
    private String busId;

    @Column(nullable = false)
    private String routeId;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String departureTime;

    private String arrivalTime;
    private Integer occupancy;

    @Column(nullable = false)
    private String status; // "Scheduled", "Running", "Completed", "Cancelled"

    public Trip() {}

    public Trip(String id, String busId, String routeId, String date,
                String departureTime, String arrivalTime, Integer occupancy, String status) {
        this.id = id;
        this.busId = busId;
        this.routeId = routeId;
        this.date = date;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.occupancy = occupancy;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBusId() { return busId; }
    public void setBusId(String busId) { this.busId = busId; }

    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }

    public Integer getOccupancy() { return occupancy; }
    public void setOccupancy(Integer occupancy) { this.occupancy = occupancy; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
