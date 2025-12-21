package org.svetso.osteoporosisapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.ALWAYS)
public class OsteoporosisRiskRequest {
    @JsonProperty("Age")
    private int age;

    @JsonProperty("Gender") // whether patient is male or female (0 or 1)
    private int gender;

    @JsonProperty("HormonalChanges") // whether patient is at their postmenopausal period (0 - normal or 1 - postmenopausal)
    private int hormonalChange;

    @JsonProperty("FamilyHistory") //whether someone in patient's family had osteoporosis (0 - no or 1 - yes)
    private int familyHistory;

    @JsonProperty("BodyWeight") //whether patient's weight is underweight (0 - no or 1 - yes)
    private int bodyWeight;

    @JsonProperty("CalciumIntake") //whether patient takes enough calcium (0 - yes or 1 - no)
    private int calciumIntake;

    @JsonProperty("VitaminDIntake") //whether patient takes enough vitamin D (0 - yes or 1 - no)
    private int vitaminDIntake;

    @JsonProperty("PhysicalActivity") //whether patient leads an active lifestyle  (0 - active or 1 - sedentary)
    private int physicalActivity;

    @JsonProperty("Smoking") //whether patient is a current smoker (0 or 1)
    private int smoking;

    @JsonProperty("AlcoholConsumption") //whether patient drinks alcohol from time to time (0 - no or 1 - yes)
    private int alcoholConsumption;

    @JsonProperty("MedicalConditions") //whether patient has Hyperthyroidism - 1, Rheumatoid Arthritis - 2, nothing - 0
    private int medicalConditions;

    @JsonProperty("Medications") //whether patient takes Corticosteroids (0 - no, 1 - yes)
    private int medications;

    @JsonProperty("PriorFractures")
    private int priorFractures;
}
