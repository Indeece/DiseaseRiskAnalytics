package ru.indeece.heartdiseaseapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RiskResponse {
    @JsonProperty("prediction") // маппим JSON "prediction" -> поле diseaseRisk
    private float diseaseRisk;
}