package com.college.bus.service;

import com.college.bus.entity.Bus;
import com.college.bus.repository.BusRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BusService {

    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Optional<Bus> getBusById(String id) {
        return busRepository.findById(id);
    }

    public Bus createBus(Bus bus) {
        if (bus.getId() == null || bus.getId().trim().isEmpty()) {
            bus.setId("B-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return busRepository.save(bus);
    }

    public Bus updateBus(String id, Bus busDetails) {
        return busRepository.findById(id).map(bus -> {
            bus.setBusNumber(busDetails.getBusNumber());
            bus.setRegistrationNumber(busDetails.getRegistrationNumber());
            bus.setModel(busDetails.getModel());
            bus.setCapacity(busDetails.getCapacity());
            bus.setRouteId(busDetails.getRouteId());
            bus.setInsuranceExpiry(busDetails.getInsuranceExpiry());
            bus.setLastMaintenanceDate(busDetails.getLastMaintenanceDate());
            bus.setStatus(busDetails.getStatus());
            return busRepository.save(bus);
        }).orElseThrow(() -> new RuntimeException("Bus not found with id: " + id));
    }

    public void deleteBus(String id) {
        busRepository.deleteById(id);
    }
}
