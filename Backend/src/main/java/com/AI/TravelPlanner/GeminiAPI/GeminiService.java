package com.AI.TravelPlanner.GeminiAPI;

import com.AI.TravelPlanner.TripProcessing.TripRequest;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.url}")
    private String geminiUrl;

    @Value("${gemini.api.key}")
    private String geminiAPIKey;

    private final WebClient webClient;

    public GeminiService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public JsonNode generateTravelPlan(TripRequest tripRequest) {
        // 1) creating a request
        String prompt = buildPrompt(tripRequest);
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        // 2) make the call to the Gemini API and retrieve the response as a JsonNode
        return webClient.post()
                .uri(geminiUrl + geminiAPIKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(JsonNode.class)  // Get the response as a JsonNode
                .block();  // Block to wait for the response (this can be handled more asynchronously if needed)
    }

    // Example: Build a prompt to send to the Gemini API
    private String buildPrompt(TripRequest tripRequest) {
    	return String.format(
                "Generate 3 detailed travel plans based on the following preferences:\n\n" +
                "- Starting Place: %s\n" +
                "- Number of People: %d\n" +
                "- Duration: %d days\n" +
                "- Start Date: %s\n" +
                "- Budget: ₹%d\n" +
                "- Travel Style: '%s'\n\n" +
                "For each travel plan, include:\n" +
                "1. A brief description of the destination city.\n" +
                "2. Duration of the trip.\n" +
                "3. Key highlights of the trip (places of interest).\n" +
                "4. A day-by-day itinerary, including transportation and activities.\n" +
                "5. A budget breakdown for:\n" +
                "    - Transportation (train/flight/bus)\n" +
                "    - Accommodation\n" +
                "    - Food\n" +
                "    - Local transport and entry fees\n" +
                "    - Total estimated cost\n\n" +
                "Ensure the plans fit within the specified budget and cater to the user’s interests in history, culture, and nature. \n\n" +
                "Output the plans in JSON format with a structure that includes the following:\n" +
                "- name: Name of the trip\n" +
                "- duration: Duration of the trip (e.g., \"5 Days\")\n" +
                "- highlights: A list of key attractions or activities.\n" +
                "- description: A brief overview of the destination and what makes it ideal for the trip.\n" +
                "- itinerary: A list of activities for each day of the trip.\n" +
                "- budget_breakdown: Estimated costs for transportation, accommodation, food, and entry fees.\n\n" +
                "Provide three distinct destinations with varied themes like history, nature, and culture. " +
                "Below is the sample response structure we need. Do not include any additional text, explanations, or warnings outside the specified JSON format.\n\n" +
                "[\n" +
                "  {\n" +
                "    \"name\": \"Destination Name\",\n" +
                "    \"duration\": \"Trip Duration (e.g., 5 Days)\",\n" +
                "    \"highlights\": [\"List of trip highlights\"],\n" +
                "    \"description\": \"Brief description of the trip and destination.\",\n" +
                "    \"itinerary\": [\n" +
                "      {\n" +
                "        \"day\": 1,\n" +
                "        \"activities\": [\"List of activities for Day 1\"]\n" +
                "      },\n" +
                "      {\n" +
                "        \"day\": 2,\n" +
                "        \"activities\": [\"List of activities for Day 2\"]\n" +
                "      },\n" +
                "      {\n" +
                "        \"day\": 3,\n" +
                "        \"activities\": [\"List of activities for Day 3\"]\n" +
                "      },\n" +
                "      {\n" +
                "        \"day\": 4,\n" +
                "        \"activities\": [\"List of activities for Day 4\"]\n" +
                "      },\n" +
                "      {\n" +
                "        \"day\": 5,\n" +
                "        \"activities\": [\"List of activities for Day 5\"]\n" +
                "      }\n" +
                "    ],\n" +
                "    \"budget_breakdown\": {\n" +
                "      \"transportation\": \"Estimated cost for transportation\",\n" +
                "      \"accommodation\": \"Estimated cost for accommodation\",\n" +
                "      \"food\": \"Estimated cost for food\",\n" +
                "      \"local_transport_and_entry_fees\": \"Estimated cost for local transport and entry fees\",\n" +
                "      \"total_estimated_cost\": \"Total estimated cost of the trip\"\n" +
                "    }\n" +
                "  }\n" +
                "]\n",
                tripRequest.getPlace(),
                tripRequest.getPersons(),
                tripRequest.getDays(),
                tripRequest.getStartDate(),
                tripRequest.getBudget(),
                tripRequest.getTravelStyle()
            );
    }
        }