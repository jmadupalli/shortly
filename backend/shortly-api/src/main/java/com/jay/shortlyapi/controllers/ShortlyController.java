package com.jay.shortlyapi.controllers;

import com.jay.shortlyapi.controllers.dto.ShortlyDTO;
import com.jay.shortlyapi.controllers.dto.ShortlyResponse;
import com.jay.shortlyapi.controllers.dto.StatsResponse;
import com.jay.shortlyapi.entities.Shortly;
import com.jay.shortlyapi.services.ShortlyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/shortly")
@PreAuthorize("hasRole('ROLE_USER')")
@CrossOrigin
public class ShortlyController {
    private final ShortlyService shortlyService;

    @Operation(security = @SecurityRequirement(name="bearerAuth"))
    @PostMapping("/")
    public ShortlyResponse createShortURL(@Valid @RequestBody ShortlyDTO shortlyDTO) throws Exception {
        return new ShortlyResponse(shortlyService.createShortly(shortlyDTO));
    }

    @Operation(security = @SecurityRequirement(name="bearerAuth"))
    @DeleteMapping("/{shortCode}")
    public void deleteShortURL(@PathVariable String shortCode) throws Exception{
        shortlyService.deleteShortly(shortCode);
    }

    @Operation(security = @SecurityRequirement(name="bearerAuth"))
    @GetMapping("/")
    public List<Shortly> getUserShortly() throws Exception {
        return shortlyService.getUserShortly();
    }

    @Operation(security = @SecurityRequirement(name="bearerAuth"))
    @GetMapping("/stats/{shortCode}")
    public StatsResponse getShortlyStats(@PathVariable String shortCode) throws Exception {
        return shortlyService.getShortlyStats(shortCode);
    }

}
