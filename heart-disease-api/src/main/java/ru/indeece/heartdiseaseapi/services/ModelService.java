package ru.indeece.heartdiseaseapi.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.indeece.heartdiseaseapi.apiclient.HeartDiseaseApiClient;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;
import ru.indeece.heartdiseaseapi.properties.ModelProperties;


@Service
@RequiredArgsConstructor
public class ModelService {

    private final ModelProperties modelProperties;
    private final HeartDiseaseApiClient apiClient;


    public double analyzeRisk(RiskRequest riskRequest) {
        RiskResponse response = apiClient.getAnalyzedRisk(riskRequest);
        double risk = response.getDiseaseRisk();
        return Math.round(risk);
    }
}