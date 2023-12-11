package com.jay.shortlyapi.services;

import com.jay.shortlyapi.controllers.dto.AuthResponse;
import com.jay.shortlyapi.controllers.dto.LoginDTO;
import com.jay.shortlyapi.controllers.dto.RegisterDTO;
import com.jay.shortlyapi.entities.User;
import com.jay.shortlyapi.respositories.UserRepository;
import com.jay.shortlyapi.util.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
   private final UserRepository userRepository;
   private final PasswordEncoder passwordEncoder;
   private final JwtService jwtService;
   private final AuthenticationManager authenticationManager;

   public void registerUser(RegisterDTO registerDTO) throws Exception{
       Optional<User> userExists = userRepository.findByEmail(registerDTO.getEmail());
       if(userExists.isPresent()){
           throw new Exception("Provided email already exists");
       }

       User user = User
               .builder()
               .firstName(registerDTO.getFirstName())
               .lastName(registerDTO.getLastName())
               .email(registerDTO.getEmail())
               .role(Role.ROLE_USER)
               .password(passwordEncoder.encode(registerDTO.getPassword()))
               .build();

       userRepository.save(user);

   }

   public AuthResponse loginUser(LoginDTO loginDTO) throws Exception {
       authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
       User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(
               () -> new UsernameNotFoundException("User not found")
       );
       String token = jwtService.generateToken(user.getUsername());
       return AuthResponse
               .builder()
               .firstName(user.getFirstName())
               .lastName(user.getLastName())
               .jwtToken(token)
               .build();
   }

}
