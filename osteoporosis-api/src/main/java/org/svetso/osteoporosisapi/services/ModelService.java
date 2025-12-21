package org.svetso.osteoporosisapi.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.svetso.osteoporosisapi.apiclient.OsteoporosisApiClient;
import org.svetso.osteoporosisapi.dto.OsteoporosisRiskRequest;
import org.svetso.osteoporosisapi.dto.OsteoporosisRiskResponse;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final OsteoporosisApiClient apiClient;

    public double analyzeRisk(OsteoporosisRiskRequest osteoporosisRiskRequest) {
        OsteoporosisRiskResponse osteoporosisRiskResponse = apiClient.getAnalyzedRisk(osteoporosisRiskRequest);
        double risk = osteoporosisRiskResponse.getDiseaseRisk();
        return Math.round(risk * 100) / 100;
    }
}
