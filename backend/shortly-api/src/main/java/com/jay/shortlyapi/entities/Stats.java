package com.jay.shortlyapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="shortly_stats")
public class Stats {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String ipAddress;
    private String country;
    private String browser;
    private String os;
    private String device;
    private String visitDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="short_code", referencedColumnName = "short_code")
    @JsonIgnore
    private Shortly shortly;

    @PrePersist
    private void onCreate() {
        visitDate = LocalDate.now().toString();
    }
}
