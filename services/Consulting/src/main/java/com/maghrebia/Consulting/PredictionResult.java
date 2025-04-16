package com.maghrebia.Consulting;

import lombok.Data;

@Data
public class PredictionResult {
    private int engagement;
    private double probability;
    private String interpretation;
    private String status;
}