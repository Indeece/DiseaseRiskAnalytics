package org.svetso.osteoporosisapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OsteoporosisRiskResponse {
    @JsonProperty("prediction")
    private float diseaseRisk;
}
