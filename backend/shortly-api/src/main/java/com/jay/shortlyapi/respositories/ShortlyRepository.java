package com.jay.shortlyapi.respositories;

import com.jay.shortlyapi.entities.Shortly;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShortlyRepository extends JpaRepository<Shortly, Integer> {
    List<Shortly> findByUserIdOrderByCreated(Integer userId);
    Optional<Shortly> findByUserIdAndShortCode(Integer userId, String shortCode);
    Optional<Shortly> findByShortCode(String shortCode);
    void deleteByShortCode(String shortCode);
}
