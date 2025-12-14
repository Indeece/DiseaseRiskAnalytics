package com.svet.diabetesapi.services;

import com.svet.diabetesapi.apiclient.DiabetesApiClient;
import com.svet.diabetesapi.dto.DiabetesRiskRequest;
import com.svet.diabetesapi.dto.DiabetesRiskResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final DiabetesApiClient diabetesApiClient;

    public double analyzeRisk(DiabetesRiskRequest request){
        DiabetesRiskResponse response = diabetesApiClient.getAnalyzedRisk(request);
        double risk = response.getDiabetesRisk();
        return Math.round(risk*100.0)/100.0;
    }
}
