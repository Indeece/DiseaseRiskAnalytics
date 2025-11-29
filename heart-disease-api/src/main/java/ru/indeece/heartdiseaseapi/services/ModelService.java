package ru.indeece.heartdiseaseapi.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.indeece.heartdiseaseapi.apiclient.HeartDiseaseApiClient;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;


@Service
@RequiredArgsConstructor
public class ModelService {

    private final HeartDiseaseApiClient apiClient;


    public double analyzeRisk(RiskRequest riskRequest) {
        RiskResponse response = apiClient.getAnalyzedRisk(riskRequest);
        double risk = response.getDiseaseRisk();
        return Math.round(risk * 100.0) / 100.0;
    }
}