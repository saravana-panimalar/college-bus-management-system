package com.college.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "boarding_records")
public class BoardingRecord {

    @Id
    private String id;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String tripId;

    private String stop;
    private String boardingTime;

    @Column(nullable = false)
    private String status; // "Boarded", "Not Boarded", "Pending"

    public BoardingRecord() {}

    public BoardingRecord(String id, String studentId, String tripId, String stop, String boardingTime, String status) {
        this.id = id;
        this.studentId = studentId;
        this.tripId = tripId;
        this.stop = stop;
        this.boardingTime = boardingTime;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getTripId() { return tripId; }
    public void setTripId(String tripId) { this.tripId = tripId; }

    public String getStop() { return stop; }
    public void setStop(String stop) { this.stop = stop; }

    public String getBoardingTime() { return boardingTime; }
    public void setBoardingTime(String boardingTime) { this.boardingTime = boardingTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
