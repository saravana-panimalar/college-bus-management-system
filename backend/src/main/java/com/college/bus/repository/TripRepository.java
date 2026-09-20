package com.college.bus.repository;

import com.college.bus.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {
    List<Trip> findByStatus(String status);
    List<Trip> findByBusId(String busId);
}
