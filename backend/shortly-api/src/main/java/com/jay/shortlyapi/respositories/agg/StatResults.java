package com.jay.shortlyapi.respositories.agg;

import lombok.AllArgsConstructor;
import lombok.Data;

public class StatResults {
    @AllArgsConstructor
    @Data
    public static class CountryCount {
        private String country;
        private long count;
    }

    @AllArgsConstructor
    @Data
    public static class BrowserCount{
        private String browser;
        private long count;
    }

    @AllArgsConstructor
    @Data
    public static class DeviceCount{
        private String device;
        private long count;
    }

}
