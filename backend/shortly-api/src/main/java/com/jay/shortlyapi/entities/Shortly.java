package com.jay.shortlyapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Base64;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="shortly")
public class Shortly {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String originalURL;

    @Column(unique = true, name = "short_code")
    private String shortCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private Date created;

    @PrePersist
    private void onCreate() {
        created = new Date();
    }

}
