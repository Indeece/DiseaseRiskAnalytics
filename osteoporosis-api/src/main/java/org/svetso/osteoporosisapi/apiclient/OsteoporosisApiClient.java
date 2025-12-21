package org.svetso.osteoporosisapi.apiclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.svetso.osteoporosisapi.configs.FeignConfig;
import org.svetso.osteoporosisapi.dto.OsteoporosisRiskRequest;
import org.svetso.osteoporosisapi.dto.OsteoporosisRiskResponse;

@FeignClient(
        name = "osteoporosis-api",
        url = "http://os_server:80",
        configuration = FeignConfig.class
)
public interface OsteoporosisApiClient {
    @PostMapping(value = "/predictOS", consumes = "application/json")
    OsteoporosisRiskResponse getAnalyzedRisk(@RequestBody OsteoporosisRiskRequest request);
}
