package com.maghrebia.Consulting.consult;


public class ConsultationPredictionResponse {
    private double predicted_duration;
    private String units;
    private String status;

    // Getters & Setters
    public double getPredicted_duration() {
        return predicted_duration;
    }

    public void setPredicted_duration(double predicted_duration) {
        this.predicted_duration = predicted_duration;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
