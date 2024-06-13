package com.Udemy.Practicas.LuisBravo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import com.Udemy.Practicas.LuisBravo.models.JwtRequest;
import com.Udemy.Practicas.LuisBravo.models.JwtResponse;
import com.Udemy.Practicas.LuisBravo.models.User;
import com.Udemy.Practicas.LuisBravo.security.JwtUtils;
import com.Udemy.Practicas.LuisBravo.services.implementations.UserDetailsServiceImpl;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsServices;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try{
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        }catch (Exception exception) {
            exception.printStackTrace();
            throw new Exception("USUARIO NO ENCONTRADO");
        }

        User user = (User) this.userDetailsServices.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch (DisabledException disabledException){
            throw new Exception("USUARIO DESABILITADO " + disabledException.getMessage());
        }catch (BadCredentialsException badCredentialsException){
            throw new Exception("CREDENCIALES INVALIDAS " + badCredentialsException.getMessage());
        }
    }

    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        return (User) this.userDetailsServices.loadUserByUsername(principal.getName());
    }

}
