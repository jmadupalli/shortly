package com.jay.shortlyapi.controllers.dto;

import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class ShortlyDTO {
    @URL
    private String originalURL;
}
