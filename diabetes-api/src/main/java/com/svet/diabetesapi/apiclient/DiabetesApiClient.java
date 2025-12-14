package com.svet.diabetesapi.apiclient;

import com.svet.diabetesapi.configs.FeignConfig;
import com.svet.diabetesapi.dto.DiabetesRiskRequest;
import com.svet.diabetesapi.dto.DiabetesRiskResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "diabets-api",
        url = "http://localhost:70",
        configuration = FeignConfig.class
)
public interface DiabetesApiClient {
    @PostMapping(value = "predict", consumes = "application/json")
    DiabetesRiskResponse getAnalyzedRisk(@RequestBody DiabetesRiskRequest request);
}
