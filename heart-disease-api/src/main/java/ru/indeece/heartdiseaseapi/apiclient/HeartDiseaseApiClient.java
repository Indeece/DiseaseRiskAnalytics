package ru.indeece.heartdiseaseapi.apiclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;

@FeignClient(name = "heartdiseaseapi", url = "${model.url}") // change port after creating server
public interface HeartDiseaseApiClient {

    @GetMapping
    RiskResponse getAnalyzedRisk(@RequestParam String apikey,
                                 @RequestParam String rll);

}