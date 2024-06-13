package com.Udemy.Practicas.LuisBravo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Udemy.Practicas.LuisBravo.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

}
