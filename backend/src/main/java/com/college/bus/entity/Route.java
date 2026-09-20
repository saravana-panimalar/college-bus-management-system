package com.college.bus.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    private String id;

    @Column(nullable = false)
    private String routeName;

    @Column(nullable = false)
    private String startingPoint;

    @Column(nullable = false)
    private String destination;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "route_stops", joinColumns = @JoinColumn(name = "route_id"))
    @Column(name = "stop_name")
    private List<String> stops = new ArrayList<>();

    private Double distance;
    private String estimatedTime;
    private String assignedBusId;

    @Column(nullable = false)
    private String status; // "Active", "Inactive"

    public Route() {}

    public Route(String id, String routeName, String startingPoint, String destination,
                 List<String> stops, Double distance, String estimatedTime,
                 String assignedBusId, String status) {
        this.id = id;
        this.routeName = routeName;
        this.startingPoint = startingPoint;
        this.destination = destination;
        this.stops = stops != null ? stops : new ArrayList<>();
        this.distance = distance;
        this.estimatedTime = estimatedTime;
        this.assignedBusId = assignedBusId;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRouteName() { return routeName; }
    public void setRouteName(String routeName) { this.routeName = routeName; }

    public String getStartingPoint() { return startingPoint; }
    public void setStartingPoint(String startingPoint) { this.startingPoint = startingPoint; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public List<String> getStops() { return stops; }
    public void setStops(List<String> stops) { this.stops = stops; }

    public Double getDistance() { return distance; }
    public void setDistance(Double distance) { this.distance = distance; }

    public String getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }

    public String getAssignedBusId() { return assignedBusId; }
    public void setAssignedBusId(String assignedBusId) { this.assignedBusId = assignedBusId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
