package org.svetso.osteoporosisapi.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.svetso.osteoporosisapi.dto.OsteoporosisRiskRequest;
import org.svetso.osteoporosisapi.services.ModelService;

@RestController
@RequestMapping("/api/osteoporosis")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @PostMapping("/risk")
    public Double getOsteoporosisRisk(@RequestBody OsteoporosisRiskRequest request) {
        return modelService.analyzeRisk(request);
    }
}
