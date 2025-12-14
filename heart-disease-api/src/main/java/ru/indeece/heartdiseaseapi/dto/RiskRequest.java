package ru.indeece.heartdiseaseapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS) // всегда сериализовать поля
public class RiskRequest {
    @JsonProperty("male")
    private int male;

    @JsonProperty("age")
    private int age;

    @JsonProperty("currentSmoker")
    private int currentSmoker;

    @JsonProperty("cigsPerDay")
    private float cigsPerDay;

    @JsonProperty("BPMeds")
    private float bpMeds;

    @JsonProperty("prevalentStroke")
    private int prevalentStroke;

    @JsonProperty("prevalentHyp")
    private int prevalentHyp;

    @JsonProperty("diabetes")
    private int diabetes;

    @JsonProperty("totChol")
    private float totChol;

    @JsonProperty("sysBP")
    private float sysBP;

    @JsonProperty("diaBP")
    private float diaBP;

    @JsonProperty("BMI")
    private float bmi;

    @JsonProperty("heartRate")
    private float heartRate;

    @JsonProperty("glucose")
    private float glucose;
}