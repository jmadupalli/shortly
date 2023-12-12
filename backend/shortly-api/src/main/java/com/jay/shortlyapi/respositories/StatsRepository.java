package com.jay.shortlyapi.respositories;

import com.jay.shortlyapi.entities.Shortly;
import com.jay.shortlyapi.entities.Stats;
import com.jay.shortlyapi.respositories.agg.IBrowserCount;
import com.jay.shortlyapi.respositories.agg.ICountryCount;
import com.jay.shortlyapi.respositories.agg.IDeviceCount;
import com.jay.shortlyapi.respositories.agg.StatResults.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatsRepository extends JpaRepository<Stats, Integer> {
    boolean existsByShortlyAndIpAddressAndVisitDate(Shortly shortly, String ipAddress, String visitDate);

    @Query("SELECT c.country as country, count(c.country) as total " +
            "FROM Stats AS c WHERE c.shortly.shortCode= :shortCode group by c.country order by total desc")
    List<ICountryCount> countShortlyByCountry(@Param("shortCode") String shortCode);

    @Query("SELECT c.browser as browser, count(c.browser) as total " +
            "FROM Stats AS c WHERE c.shortly.shortCode= :shortCode group by c.browser order by total desc")
    List<IBrowserCount> countShortlyByBrowser(@Param("shortCode") String shortCode);

    @Query("SELECT c.device as device, c.os as os, count(c) as total " +
            "FROM Stats AS c WHERE c.shortly.shortCode= :shortCode group by c.device, c.os order by total desc")
    List<IDeviceCount> countShortlyByDeviceANDOs(@Param("shortCode") String shortCode);


}
