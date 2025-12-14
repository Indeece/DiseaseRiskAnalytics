package com.svet.diabetesapi.controllers;

import com.svet.diabetesapi.dto.DiabetesRiskRequest;
import com.svet.diabetesapi.services.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/diabetes")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @PostMapping("/risk")
    public Double getDiabetesRisk(@RequestBody DiabetesRiskRequest request){
        return modelService.analyzeRisk(request);
    }
}
