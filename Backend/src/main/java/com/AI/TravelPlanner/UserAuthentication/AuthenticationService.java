package com.AI.TravelPlanner.UserAuthentication;

import java.util.List;

import org.hibernate.annotations.SecondaryRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	@Autowired
	UserRepository userRepository;
	public boolean authenticate(String email, String password) {
		Users user=userRepository.findByEmail(email);
		return user!=null && user.getPassword().equals(password);
		
	}
	public String registerUser(String email, String password) {
		if(userRepository.findByEmail(email)!=null) {
			return "email already exists";
		}
		Users user=new Users();
		user.setEmail(email);
		user.setPassword(password);
		userRepository.save(user);
		return "User Registration successfull Login Now!";
	}
	public List<Users> returnAllusers(){
		return userRepository.findAll();
		
	}
	

}
