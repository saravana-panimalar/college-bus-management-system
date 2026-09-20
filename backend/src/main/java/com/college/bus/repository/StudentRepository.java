package com.college.bus.repository;

import com.college.bus.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByRollNumber(String rollNumber);
    List<Student> findByAssignedRouteId(String routeId);
}
