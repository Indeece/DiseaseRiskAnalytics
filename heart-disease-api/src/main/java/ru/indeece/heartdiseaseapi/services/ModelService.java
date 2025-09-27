package ru.indeece.heartdiseaseapi.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.indeece.heartdiseaseapi.apiclient.HeartDiseaseApiClient;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;
import ru.indeece.heartdiseaseapi.properties.ModelProperties;
import ru.indeece.heartdiseaseapi.repository.AnalyzedRiskRepository;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final ModelProperties modelProperties;
    private final HeartDiseaseApiClient apiClient;
    private final AnalyzedRiskRepository analyzedRiskRepository;

    // TODO complete method after model creation
    public void analyzeRisk(RiskRequest riskRequest) {
        String rll = ""; // create RLL from params
        String apikey = modelProperties.getApikey();

        RiskResponse response = apiClient.getAnalyzedRisk(apikey, rll);
        analyzedRiskRepository.save(response); // save response to DB
    }
}
