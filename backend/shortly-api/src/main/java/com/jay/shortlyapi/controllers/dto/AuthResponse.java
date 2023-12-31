package com.jay.shortlyapi.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {
    private String firstName;
    private String lastName;
    private String jwtToken;
}
