package com.college.bus.service;

import com.college.bus.entity.BoardingRecord;
import com.college.bus.repository.BoardingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BoardingService {

    private final BoardingRepository boardingRepository;

    public BoardingService(BoardingRepository boardingRepository) {
        this.boardingRepository = boardingRepository;
    }

    public List<BoardingRecord> getAllBoardingRecords() {
        return boardingRepository.findAll();
    }

    public List<BoardingRecord> getRecordsByTripId(String tripId) {
        return boardingRepository.findByTripId(tripId);
    }

    public Optional<BoardingRecord> getRecordById(String id) {
        return boardingRepository.findById(id);
    }

    public BoardingRecord recordBoarding(BoardingRecord record) {
        if (record.getId() == null || record.getId().trim().isEmpty()) {
            record.setId("BR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return boardingRepository.save(record);
    }

    public BoardingRecord updateStatus(String id, String status, String boardingTime) {
        return boardingRepository.findById(id).map(record -> {
            record.setStatus(status);
            if (boardingTime != null) {
                record.setBoardingTime(boardingTime);
            }
            return boardingRepository.save(record);
        }).orElseThrow(() -> new RuntimeException("Boarding record not found with id: " + id));
    }
}
