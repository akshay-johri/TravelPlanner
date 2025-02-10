package com.AI.TravelPlanner.TripProcessing;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.time.LocalDate;

public class TripRequest {
    
    @NotNull(message = "Place cannot be null")
    private String place;

    @Min(value = 1, message = "Days must be at least 1")
    private int days;

    @Min(value = 1, message = "Budget must be at least 1")
    private int budget;

    @Min(value = 1, message = "There must be at least 1 person")
    private int persons;

    @FutureOrPresent(message = "Start date must be today or in the future")
    private LocalDate startDate;

    @NotNull(message = "Travel style cannot be null")
    private String travelStyle;

    // Default constructor for JSON binding
    public TripRequest() {
        super();
    }

    // Constructor with all fields
    public TripRequest(String place, int days, int budget, int persons, 
            LocalDate startDate, String travelStyle) {
        this.place = place;
        this.days = days;
        this.budget = budget;
        this.persons = persons;
        this.startDate = startDate;
        this.travelStyle = travelStyle;
    }

    // Getters and Setters

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public int getPersons() {
        return persons;
    }

    public void setPersons(int persons) {
        this.persons = persons;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getTravelStyle() {
        return travelStyle;
    }

    public void setTravelStyle(String travelStyle) {
        this.travelStyle = travelStyle;
    }

    @Override
    public String toString() {
        return "TripRequest [place=" + place + ", days=" + days + ", budget=" + budget + ", persons=" + persons
                + ", startDate=" + startDate + ", travelStyle=" + travelStyle + "]";
    }
}
