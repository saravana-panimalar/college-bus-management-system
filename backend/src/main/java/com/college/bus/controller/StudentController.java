package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.entity.Student;
import com.college.bus.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents() {
        return ResponseEntity.ok(ApiResponse.ok(studentService.getAllStudents()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id)
                .map(s -> ResponseEntity.ok(ApiResponse.ok(s)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Student not found")));
    }

    @GetMapping("/route/{routeId}")
    public ResponseEntity<ApiResponse<List<Student>>> getStudentsByRoute(@PathVariable String routeId) {
        return ResponseEntity.ok(ApiResponse.ok(studentService.getStudentsByRouteId(routeId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Student>> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.ok(ApiResponse.ok("Student created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(@PathVariable String id, @RequestBody Student student) {
        try {
            Student updated = studentService.updateStudent(id, student);
            return ResponseEntity.ok(ApiResponse.ok("Student updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.ok("Student deleted successfully", null));
    }
}
