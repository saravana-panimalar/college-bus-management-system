package com.college.bus.service;

import com.college.bus.entity.Trip;
import com.college.bus.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(String id) {
        return tripRepository.findById(id);
    }

    public List<Trip> getTripsByStatus(String status) {
        return tripRepository.findByStatus(status);
    }

    public Trip createTrip(Trip trip) {
        if (trip.getId() == null || trip.getId().trim().isEmpty()) {
            trip.setId("T-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return tripRepository.save(trip);
    }

    public Trip updateTrip(String id, Trip details) {
        return tripRepository.findById(id).map(trip -> {
            trip.setBusId(details.getBusId());
            trip.setRouteId(details.getRouteId());
            trip.setDate(details.getDate());
            trip.setDepartureTime(details.getDepartureTime());
            trip.setArrivalTime(details.getArrivalTime());
            trip.setOccupancy(details.getOccupancy());
            trip.setStatus(details.getStatus());
            return tripRepository.save(trip);
        }).orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));
    }

    public Trip updateTripStatus(String id, String status) {
        return tripRepository.findById(id).map(trip -> {
            trip.setStatus(status);
            return tripRepository.save(trip);
        }).orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));
    }

    public void deleteTrip(String id) {
        tripRepository.deleteById(id);
    }
}
