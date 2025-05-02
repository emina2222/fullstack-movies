package com.kirilanastasoff.TheMovieDB.backend.services;

import com.kirilanastasoff.TheMovieDB.backend.exception.BadRequestException;
import com.kirilanastasoff.TheMovieDB.backend.jwt.JwtUtils;
import com.kirilanastasoff.TheMovieDB.backend.model.ERole;
import com.kirilanastasoff.TheMovieDB.backend.model.Role;
import com.kirilanastasoff.TheMovieDB.backend.model.User;
import com.kirilanastasoff.TheMovieDB.backend.payload.request.LoginRequest;
import com.kirilanastasoff.TheMovieDB.backend.payload.request.SignupRequest;
import com.kirilanastasoff.TheMovieDB.backend.payload.response.JwtResponse;
import com.kirilanastasoff.TheMovieDB.backend.repository.RoleRepository;
import com.kirilanastasoff.TheMovieDB.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;

    public void register(SignupRequest request){
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Error: Email is already taken!");
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                encoder.encode(request.getPassword())
        );

        Set<Role> roles = getRoles(request.getRole());

        user.setRoles(roles);
        userRepository.save(user);
    }

    private Set<Role> getRoles(Set<String> rolesFromRequest) {
        Set<Role> roles = new HashSet<>();

        if (rolesFromRequest == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
            roles.add(userRole);
        } else {
            rolesFromRequest.forEach(role -> {
                switch (role) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Admin Role not found."));
                        roles.add(adminRole);
                    }
                    case "mod" -> {
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Mod Role not found."));
                        roles.add(modRole);
                    }
                    case "user" -> {
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: User Role not found."));
                        roles.add(userRole);
                    }
                }
            });
        }

        return roles;
    }

    public JwtResponse authenticate(LoginRequest loginRequest){
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles);
    }
}
