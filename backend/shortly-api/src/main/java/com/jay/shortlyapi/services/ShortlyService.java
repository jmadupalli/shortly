package com.jay.shortlyapi.services;

import com.jay.shortlyapi.controllers.dto.ShortlyDTO;
import com.jay.shortlyapi.controllers.dto.StatsResponse;
import com.jay.shortlyapi.entities.Shortly;
import com.jay.shortlyapi.entities.Stats;
import com.jay.shortlyapi.entities.User;
import com.jay.shortlyapi.respositories.ShortlyRepository;
import com.jay.shortlyapi.respositories.StatsRepository;
import com.jay.shortlyapi.respositories.UserRepository;
import com.jay.shortlyapi.respositories.agg.IBrowserCount;
import com.jay.shortlyapi.respositories.agg.ICountryCount;
import com.jay.shortlyapi.respositories.agg.IDeviceCount;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua_parser.Client;
import ua_parser.Parser;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShortlyService {
    private final ShortlyRepository shortlyRepository;
    private final UserRepository userRepository;
    private final StatsRepository statsRepository;

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

    public String getOriginalURL(String shortCode, Map<String, String> headers) throws Exception{
        Optional<Shortly> shortURL = shortlyRepository.findByShortCode(shortCode);
        if(shortURL.isEmpty())
            throw new Exception("Short URL not found");
        addStatsRecord(headers, shortURL.get());
        return shortURL.get().getOriginalURL();
    }

    public List<Shortly> getUserShortly() throws Exception {
        User user = getUserFromContext();
        return shortlyRepository.findByUserIdOrderByCreated(user.getId());
    }

    public void addStatsRecord(Map<String, String> req, Shortly shortly) {
        String ipAddress = req.get("cf-connecting-ip");
        String todayDate = LocalDate.now().toString();
        if(statsRepository.existsByShortlyAndIpAddressAndVisitDate(shortly, ipAddress, todayDate))
            return;
        String country = req.get("cf-ipcountry");
        String userAgent = req.get("user-agent");
        System.out.println(req);
        Client c = new Parser().parse(userAgent);

        Stats record = Stats.builder()
                .browser(c.userAgent.family)
                .os(c.os.family)
                .device(c.device.family)
                .ipAddress(ipAddress)
                .country(country != null? country : "Other")
                .shortly(shortly)
                .build();

        statsRepository.save(record);
    }

    public StatsResponse getShortlyStats(String shortCode) throws Exception {
        User user = getUserFromContext();
        Shortly shortly = shortlyRepository.findByUserIdAndShortCode(user.getId(), shortCode)
                .orElseThrow(() -> new Exception("Invalid operation"));
        List<ICountryCount> countryCounts = statsRepository.countShortlyByCountry(shortCode);
        List<IBrowserCount> browserCounts = statsRepository.countShortlyByBrowser(shortCode);
        List<IDeviceCount> deviceCounts = statsRepository.countShortlyByDeviceANDOs(shortCode);
        return new StatsResponse(countryCounts, browserCounts, deviceCounts);
    }

    private User getUserFromContext() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow( () -> new Exception("User not logged in!"));
    }


}
