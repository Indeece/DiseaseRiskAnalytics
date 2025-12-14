package ru.indeece.heartdiseaseapi.apiclient;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import ru.indeece.heartdiseaseapi.dto.RiskRequest;
import ru.indeece.heartdiseaseapi.dto.RiskResponse;
import ru.indeece.heartdiseaseapi.services.ModelService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

class HeartDiseaseApiClientTest {

    private HeartDiseaseApiClient apiClient;
    private ModelService modelService;

    @BeforeEach
    void setUp() {
        apiClient = Mockito.mock(HeartDiseaseApiClient.class);
        modelService = new ModelService(apiClient);
    }

    @Test
    void analyzeRisk_shouldReturnMockedValue() {
        RiskResponse mockedResponse = new RiskResponse();
        mockedResponse.setDiseaseRisk(42.0f);
        Mockito.when(apiClient.getAnalyzedRisk(any(RiskRequest.class)))
                .thenReturn(mockedResponse);
        RiskRequest request = new RiskRequest(
                1, 55, 1, 10f, 0f, 0, 1, 0, 200f, 120f, 80f, 25f, 70f, 85f
        );
        double risk = modelService.analyzeRisk(request);
        assertEquals(42.0, risk);
    }
}
