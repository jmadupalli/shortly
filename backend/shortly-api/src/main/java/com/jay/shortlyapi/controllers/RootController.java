package com.jay.shortlyapi.controllers;

import com.jay.shortlyapi.services.ShortlyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequestMapping("/")
@RestController
@RequiredArgsConstructor
public class RootController {
    private final ShortlyService shortlyService;

    @GetMapping("/")
    public ResponseEntity<String> helloThere() {
        return ResponseEntity.ok("Hello, I'm Shortly API!");
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectToOriginal(@PathVariable String shortCode) throws Exception{
        return ResponseEntity
                .status(HttpStatus.MOVED_PERMANENTLY)
                .location(URI.create(shortlyService.getOriginalURL(shortCode)))
                .build();
    }

}
