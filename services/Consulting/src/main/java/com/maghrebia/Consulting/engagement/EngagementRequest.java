package com.maghrebia.Consulting.engagement;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EngagementRequest {

    @JsonProperty("text")
    private String text;

    @JsonProperty("frequence_utilisation")
    private Integer frequenceUtilisation;

    @JsonProperty("type_service")
    private String typeService;

    @JsonProperty("age")
    private Integer age;

    @JsonProperty("satisfaction")
    private Integer satisfaction;

    // Constructeurs, getters et setters
    public EngagementRequest(String text, Integer frequenceUtilisation, String typeService, Integer age, Integer satisfaction) {
        this.text = text;
        this.frequenceUtilisation = frequenceUtilisation;
        this.typeService = typeService;
        this.age = age;
        this.satisfaction = satisfaction;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getFrequenceUtilisation() {
        return frequenceUtilisation;
    }

    public void setFrequenceUtilisation(Integer frequenceUtilisation) {
        this.frequenceUtilisation = frequenceUtilisation;
    }

    public String getTypeService() {
        return typeService;
    }

    public void setTypeService(String typeService) {
        this.typeService = typeService;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getSatisfaction() {
        return satisfaction;
    }

    public void setSatisfaction(Integer satisfaction) {
        this.satisfaction = satisfaction;
    }
}
