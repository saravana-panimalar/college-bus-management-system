package com.college.bus.service;

import com.college.bus.dto.LoginRequest;
import com.college.bus.dto.LoginResponse;
import com.college.bus.entity.User;
import com.college.bus.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // In production, compare with BCryptPasswordEncoder
            if (request.getPassword() != null && request.getPassword().equals(user.getPassword())) {
                String token = "jwt-" + UUID.randomUUID().toString();
                return new LoginResponse(true, "Login successful", token, user);
            }
        }
        return new LoginResponse(false, "Invalid email or password", null, null);
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
}
