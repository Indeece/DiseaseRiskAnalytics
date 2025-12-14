package ru.indeece.heartdiseaseapi.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import ru.indeece.heartdiseaseapi.apiclient.HeartDiseaseApiClient;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;
import ru.indeece.heartdiseaseapi.properties.ModelProperties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

class ModelServiceTest {

    private HeartDiseaseApiClient apiClient;
    private ModelProperties modelProperties;
    private ModelService modelService;

    @BeforeEach
    void setUp() {
        apiClient = Mockito.mock(HeartDiseaseApiClient.class);
        modelProperties = Mockito.mock(ModelProperties.class);
        modelService = new ModelService(modelProperties, apiClient);
    }

    @Test
    void analyzeRisk_shouldReturnRoundedMockedValue() {
        RiskRequest request = new RiskRequest(
                1, 55, 1, 10f, 0f, 0, 1, 0, 200f, 120f, 80f, 25f, 70f, 85f
        );
        RiskResponse mockedResponse = new RiskResponse();
        mockedResponse.setDiseaseRisk(42.7f); // будет округлено до 43
        Mockito.when(apiClient.getAnalyzedRisk(any(RiskRequest.class)))
                .thenReturn(mockedResponse);

        double risk = modelService.analyzeRisk(request);
        assertEquals(43.0, risk);
    }
}