package com.college.bus.repository;

import com.college.bus.entity.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRepository extends JpaRepository<MaintenanceRecord, String> {
    List<MaintenanceRecord> findByBusId(String busId);
}
