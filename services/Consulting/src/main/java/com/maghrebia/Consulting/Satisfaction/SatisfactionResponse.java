package com.maghrebia.Consulting.Satisfaction;

public class SatisfactionResponse {
    private double prediction;

    public SatisfactionResponse(double prediction) {
        this.prediction = prediction;
    }

    public double getPrediction() {
        return prediction;
    }

    public void setPrediction(double prediction) {
        this.prediction = prediction;
    }
}
