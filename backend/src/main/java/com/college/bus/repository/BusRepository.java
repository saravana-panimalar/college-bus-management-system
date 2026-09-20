package com.college.bus.repository;

import com.college.bus.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, String> {
    List<Bus> findByStatus(String status);
}
