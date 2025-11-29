package ru.indeece.heartdiseaseapi.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.services.ModelService;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ModelControllerTest {

    private ModelService modelService;
    private ModelController modelController;

    @BeforeEach
    void setUp() {
        modelService = Mockito.mock(ModelService.class);
        modelController = new ModelController(modelService);
    }

    @Test
    void getHeartDiseaseRisk_shouldReturnMockedValue() {
        RiskRequest request = new RiskRequest(
                1, 55, 1, 10f, 0f, 0, 1, 0, 200f, 120f, 80f, 25f, 70f, 85f
        );

        Mockito.when(modelService.analyzeRisk(request)).thenReturn(42.0);
        Double risk = modelController.getHeartDiseaseRisk(request);
        assertEquals(42.0, risk);
    }
}