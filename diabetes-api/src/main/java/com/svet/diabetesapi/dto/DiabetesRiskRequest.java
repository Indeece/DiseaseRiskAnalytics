package com.svet.diabetesapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
public class DiabetesRiskRequest {
    @JsonProperty("pregnancies")
    private int pregnancies;

    @JsonProperty("glucose")
    private float glucose;

    @JsonProperty("bloodPressure")
    private int bloodPressure;

    @JsonProperty("insulin")
    private float insulin;

    @JsonProperty("bmi")
    private float bmi;

    @JsonProperty("age")
    private int age;
}
