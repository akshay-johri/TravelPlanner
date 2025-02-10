package com.AI.TravelPlanner.TripProcessing;

import com.AI.TravelPlanner.GeminiAPI.GeminiService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.Map;

@RestController
@RequestMapping("/api/trip")
public class TripController {

    private final GeminiService geminiService;

    @Autowired
    public TripController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateTripPlan(@RequestBody TripRequest tripRequest) {
        // Call the GeminiService to get the raw travel plan response as a JsonNode
        JsonNode travelPlan = geminiService.generateTravelPlan(tripRequest);

        try {
            // Check if the response contains the "candidates" field
            if (travelPlan != null && travelPlan.has("candidates")) {
                // Create the response structure and return it as JSON
                return ResponseEntity.ok(travelPlan.toString());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("No valid 'candidates' in the response.");
            }

        } catch (Exception e) {
            // Handle errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing Gemini API response: " + e.getMessage());
        }
    }
}
