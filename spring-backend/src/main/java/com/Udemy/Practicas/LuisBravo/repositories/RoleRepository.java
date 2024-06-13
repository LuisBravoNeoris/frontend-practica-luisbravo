package com.Udemy.Practicas.LuisBravo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Udemy.Practicas.LuisBravo.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
