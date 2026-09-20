package com.college.bus.controller;

import com.college.bus.dto.ApiResponse;
import com.college.bus.dto.LoginRequest;
import com.college.bus.dto.LoginResponse;
import com.college.bus.entity.User;
import com.college.bus.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(response);
    }

    @GetMapping("/me/{id}")
    public ResponseEntity<ApiResponse<User>> getCurrentUser(@PathVariable String id) {
        return authService.getUserById(id)
                .map(u -> ResponseEntity.ok(ApiResponse.ok(u)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("User not found")));
    }
}
