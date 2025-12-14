package ru.indeece.heartdiseaseapi.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.services.ModelService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ModelController {

    private final ModelService modelService;

    @PostMapping("/risk")
    public Double getHeartDiseaseRisk(@RequestBody RiskRequest request) {
        return modelService.analyzeRisk(request);
    }
}