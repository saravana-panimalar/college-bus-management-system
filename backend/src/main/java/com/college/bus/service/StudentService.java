package com.college.bus.service;

import com.college.bus.entity.Student;
import com.college.bus.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    public Optional<Student> getStudentByRollNumber(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber);
    }

    public List<Student> getStudentsByRouteId(String routeId) {
        return studentRepository.findByAssignedRouteId(routeId);
    }

    public Student createStudent(Student student) {
        if (student.getId() == null || student.getId().trim().isEmpty()) {
            student.setId("S-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return studentRepository.save(student);
    }

    public Student updateStudent(String id, Student details) {
        return studentRepository.findById(id).map(student -> {
            student.setRollNumber(details.getRollNumber());
            student.setName(details.getName());
            student.setDepartment(details.getDepartment());
            student.setYear(details.getYear());
            student.setPhone(details.getPhone());
            student.setEmail(details.getEmail());
            student.setParentContact(details.getParentContact());
            student.setAssignedRouteId(details.getAssignedRouteId());
            student.setPickupStop(details.getPickupStop());
            student.setStatus(details.getStatus());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }
}
