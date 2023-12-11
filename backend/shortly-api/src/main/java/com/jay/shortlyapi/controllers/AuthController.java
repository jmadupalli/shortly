package com.jay.shortlyapi.controllers;

import com.jay.shortlyapi.controllers.dto.AuthResponse;
import com.jay.shortlyapi.controllers.dto.LoginDTO;
import com.jay.shortlyapi.controllers.dto.RegisterDTO;
import com.jay.shortlyapi.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Valid @RequestBody RegisterDTO registerDTO) throws Exception {
        authService.registerUser(registerDTO);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginDTO loginDTO) throws Exception {
        return authService.loginUser(loginDTO);
    }
}
