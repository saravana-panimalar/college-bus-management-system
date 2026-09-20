package com.college.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String rollNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    private Integer year;
    private String phone;
    private String email;
    private String parentContact;
    private String assignedRouteId;

    @Column(nullable = false)
    private String pickupStop;

    @Column(nullable = false)
    private String status; // "Active", "Inactive"

    public Student() {}

    public Student(String id, String rollNumber, String name, String department,
                   Integer year, String phone, String email, String parentContact,
                   String assignedRouteId, String pickupStop, String status) {
        this.id = id;
        this.rollNumber = rollNumber;
        this.name = name;
        this.department = department;
        this.year = year;
        this.phone = phone;
        this.email = email;
        this.parentContact = parentContact;
        this.assignedRouteId = assignedRouteId;
        this.pickupStop = pickupStop;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getParentContact() { return parentContact; }
    public void setParentContact(String parentContact) { this.parentContact = parentContact; }

    public String getAssignedRouteId() { return assignedRouteId; }
    public void setAssignedRouteId(String assignedRouteId) { this.assignedRouteId = assignedRouteId; }

    public String getPickupStop() { return pickupStop; }
    public void setPickupStop(String pickupStop) { this.pickupStop = pickupStop; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
