package com.svet.diabetesapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DiabetesRiskResponse {
    @JsonProperty("prediction")
    private float diabetesRisk;
}

