package com.kirilanastasoff.TheMovieDB.backend.controller;

import com.kirilanastasoff.TheMovieDB.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.MediaType;

import com.kirilanastasoff.TheMovieDB.backend.payload.request.LoginRequest;
import com.kirilanastasoff.TheMovieDB.backend.payload.request.SignupRequest;
import com.kirilanastasoff.TheMovieDB.backend.payload.response.MessageResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
		authService.register(request);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PostMapping(value = "/login", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		return ResponseEntity.ok(authService.authenticate(loginRequest));
	}


}
