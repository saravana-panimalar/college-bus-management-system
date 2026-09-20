package com.college.bus.dto;

public class DashboardStatsResponse {
    private long totalBuses;
    private long activeBuses;
    private long totalStudents;
    private long totalRoutes;
    private long activeTrips;
    private long maintenanceCount;

    public DashboardStatsResponse() {}

    public DashboardStatsResponse(long totalBuses, long activeBuses,
                                  long totalStudents, long totalRoutes,
                                  long activeTrips, long maintenanceCount) {
        this.totalBuses = totalBuses;
        this.activeBuses = activeBuses;
        this.totalStudents = totalStudents;
        this.totalRoutes = totalRoutes;
        this.activeTrips = activeTrips;
        this.maintenanceCount = maintenanceCount;
    }

    public long getTotalBuses() { return totalBuses; }
    public void setTotalBuses(long totalBuses) { this.totalBuses = totalBuses; }

    public long getActiveBuses() { return activeBuses; }
    public void setActiveBuses(long activeBuses) { this.activeBuses = activeBuses; }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalRoutes() { return totalRoutes; }
    public void setTotalRoutes(long totalRoutes) { this.totalRoutes = totalRoutes; }

    public long getActiveTrips() { return activeTrips; }
    public void setActiveTrips(long activeTrips) { this.activeTrips = activeTrips; }

    public long getMaintenanceCount() { return maintenanceCount; }
    public void setMaintenanceCount(long maintenanceCount) { this.maintenanceCount = maintenanceCount; }
}
