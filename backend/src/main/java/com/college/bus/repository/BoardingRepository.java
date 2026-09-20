package com.college.bus.repository;

import com.college.bus.entity.BoardingRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardingRepository extends JpaRepository<BoardingRecord, String> {
    List<BoardingRecord> findByTripId(String tripId);
    List<BoardingRecord> findByStudentId(String studentId);
}
