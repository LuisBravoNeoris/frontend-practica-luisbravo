package com.Udemy.Practicas.LuisBravo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Udemy.Practicas.LuisBravo.models.Role;
import com.Udemy.Practicas.LuisBravo.models.User;
import com.Udemy.Practicas.LuisBravo.models.UserRole;
import com.Udemy.Practicas.LuisBravo.services.UserServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping({"/users"})
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserServices userServices;

    public UserController() {
    }

    @PostMapping({"/"})
    public User saveUser(@RequestBody User user) throws Exception {
        user.setProfile("default.png");
        
        Set<UserRole> userRoles = new HashSet();

        Role role = new Role();
        role.setRoleId(2L);
        role.setName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoles.add(userRole);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(user);

            System.out.println("ESTE ES EL ROL EN EL JSON: " + jsonString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return this.userServices.saveUser(user, userRoles);
    }

    @PutMapping({"/"})
    public User updateUser(@RequestBody User user) throws Exception {
        user.setProfile("default.png");
        Set<UserRole> userRoles = new HashSet();

        Role role = new Role();
        System.out.println("ESTE ES EL ROL EN EL JSON: " + user.getUserRoles());
        role.setRoleId(2L);
        role.setName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoles.add(userRole);
        return this.userServices.saveUser(user, userRoles);
    }

    @GetMapping({"/"})
    public List<User> getAllUser() {
        return this.userServices.getAllUser();
    }

    @GetMapping({"/{username}"})
    public User getUser(@PathVariable("username") String username) {
        return this.userServices.getUser(username);
    }

    @DeleteMapping({"/delete/{userId}"})
    public void deleteUser(@PathVariable("userId") Long userId) {
        this.userServices.deleteUser(userId);
    }
}