package ru.indeece.heartdiseaseapi.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;
import ru.indeece.heartdiseaseapi.services.ModelService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ModelController {
    private final ModelService modelService;

    @GetMapping("/heart-disease-risk")
    public ResponseEntity<RiskResponse> getHeartDiseaseRisk(@RequestBody RiskRequest riskRequest) {
        // TODO complete method after model creation
        modelService.analyzeRisk(riskRequest);
        return ResponseEntity.ok(new RiskResponse());
    }
}
