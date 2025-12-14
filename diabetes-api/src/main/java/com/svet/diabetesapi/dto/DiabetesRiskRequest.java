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
    @JsonProperty("male")
    private int male;

    @JsonProperty("age")
    private int age;

    @JsonProperty("diaBP")
    private float diaBP;
}
