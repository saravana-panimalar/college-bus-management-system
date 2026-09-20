package com.college.bus.service;

import com.college.bus.entity.MaintenanceRecord;
import com.college.bus.repository.MaintenanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    public MaintenanceService(MaintenanceRepository maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    public List<MaintenanceRecord> getAllRecords() {
        return maintenanceRepository.findAll();
    }

    public List<MaintenanceRecord> getRecordsByBusId(String busId) {
        return maintenanceRepository.findByBusId(busId);
    }

    public Optional<MaintenanceRecord> getRecordById(String id) {
        return maintenanceRepository.findById(id);
    }

    public MaintenanceRecord createRecord(MaintenanceRecord record) {
        if (record.getId() == null || record.getId().trim().isEmpty()) {
            record.setId("M-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return maintenanceRepository.save(record);
    }

    public MaintenanceRecord updateRecord(String id, MaintenanceRecord details) {
        return maintenanceRepository.findById(id).map(record -> {
            record.setBusId(details.getBusId());
            record.setType(details.getType());
            record.setDate(details.getDate());
            record.setDescription(details.getDescription());
            record.setCost(details.getCost());
            record.setNextMaintenanceDate(details.getNextMaintenanceDate());
            record.setStatus(details.getStatus());
            return maintenanceRepository.save(record);
        }).orElseThrow(() -> new RuntimeException("Maintenance record not found with id: " + id));
    }

    public void deleteRecord(String id) {
        maintenanceRepository.deleteById(id);
    }
}
