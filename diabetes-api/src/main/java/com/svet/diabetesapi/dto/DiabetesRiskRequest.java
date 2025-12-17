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
    @JsonProperty("Pregnancies")
    private int pregnancies;

    @JsonProperty("Glucose")
    private float glucose;

    @JsonProperty("BloodPressure")
    private int bloodPressure;

    @JsonProperty("Insulin")
    private float insulin;

    @JsonProperty("BMI")
    private float bmi;

    @JsonProperty("Age")
    private int age;
}
