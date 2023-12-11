package com.jay.shortlyapi.services;

import com.jay.shortlyapi.controllers.dto.ShortlyDTO;
import com.jay.shortlyapi.entities.Shortly;
import com.jay.shortlyapi.entities.User;
import com.jay.shortlyapi.respositories.ShortlyRepository;
import com.jay.shortlyapi.respositories.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShortlyService {
    private final ShortlyRepository shortlyRepository;
    private final UserRepository userRepository;

    public String createShortly(ShortlyDTO shortlyDTO) throws Exception {
        User user = getUserFromContext();
        Shortly shortURL = Shortly.builder()
                .originalURL(shortlyDTO.getOriginalURL())
                .user(user)
                .build();
        shortURL = shortlyRepository.save(shortURL);
        String shortCode = Base64.getUrlEncoder().withoutPadding().encodeToString(shortURL.getId().toString().getBytes());
        shortURL.setShortCode(shortCode);
        shortlyRepository.save(shortURL);
        return shortCode;

    }

    @Transactional
    public void deleteShortly(String shortCode) throws Exception {
        User user = getUserFromContext();
        Shortly shortly = shortlyRepository.findByUserIdAndShortCode(user.getId(), shortCode)
                .orElseThrow(() -> new Exception("Invalid operation"));
        shortlyRepository.deleteByShortCode(shortCode);
    }

    public String getOriginalURL(String shortCode) throws Exception{
        Optional<Shortly> shortURL = shortlyRepository.findByShortCode(shortCode);
        if(shortURL.isEmpty())
            throw new Exception("Short URL not found");
        return shortURL.get().getOriginalURL();
    }

    public List<Shortly> getUserShortly() throws Exception {
        User user = getUserFromContext();
        return shortlyRepository.findByUserIdOrderByCreated(user.getId());
    }

    private User getUserFromContext() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow( () -> new Exception("User not logged in!"));
    }
}
