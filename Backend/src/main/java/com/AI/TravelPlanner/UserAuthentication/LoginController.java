package com.AI.TravelPlanner.UserAuthentication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	@Autowired
	AuthenticationService authenticationService;
	 @PostMapping("/login")
	    public ResponseEntity<String> login(@RequestBody Users user) {
	        boolean isAuthenticated = authenticationService.authenticate(user.getEmail(), user.getPassword());
	        
	        if (isAuthenticated) {
	            return ResponseEntity.ok("Login successful");
	        } else {
	            return ResponseEntity.status(401).body("Invalid email or password try again!");
	        }
	    }
	 
	 @PostMapping("/register")
	    public ResponseEntity<String> register(@RequestBody Users user) {
	        String result = authenticationService.registerUser(user.getEmail(), user.getPassword());
	        
	        if (result.equals("email already exists")) {
	            return ResponseEntity.status(400).body(result);  
	        }
	        
	        return ResponseEntity.ok(result);  
	    }
	 @GetMapping("/all")
	 public List<Users> returnUser(){
		 return authenticationService.returnAllusers();
		 
	 }
	 
}
