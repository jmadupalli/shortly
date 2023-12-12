package com.jay.shortlyapi.controllers.dto;

import com.jay.shortlyapi.respositories.agg.IBrowserCount;
import com.jay.shortlyapi.respositories.agg.ICountryCount;
import com.jay.shortlyapi.respositories.agg.IDeviceCount;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class StatsResponse {
    private List<ICountryCount> country;
    private List<IBrowserCount> browser;
    private List<IDeviceCount> deviceAndOs;
}
