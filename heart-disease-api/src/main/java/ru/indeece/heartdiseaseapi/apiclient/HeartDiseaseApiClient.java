package ru.indeece.heartdiseaseapi.apiclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ru.indeece.heartdiseaseapi.configs.FeignConfig;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;

@FeignClient(
        name = "heart-disease-api",
        url = "http://localhost:80",
        configuration = FeignConfig.class
)
public interface HeartDiseaseApiClient {
    @PostMapping(value = "/predict", consumes = "application/json")
    RiskResponse getAnalyzedRisk(@RequestBody RiskRequest request);
}