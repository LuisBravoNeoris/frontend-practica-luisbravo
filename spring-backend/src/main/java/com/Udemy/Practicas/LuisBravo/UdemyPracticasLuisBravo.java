package com.Udemy.Practicas.LuisBravo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.Udemy.Practicas.LuisBravo.models.Role;
import com.Udemy.Practicas.LuisBravo.models.User;
import com.Udemy.Practicas.LuisBravo.models.UserRole;
import com.Udemy.Practicas.LuisBravo.services.UserServices;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class UdemyPracticasLuisBravo implements CommandLineRunner {

	@Autowired
	private UserServices userServices;

	public static void main(String[] args) {
		SpringApplication.run(UdemyPracticasLuisBravo.class, args);
	}


	@Override
	public void run(String... args) throws Exception {

		if(this.userServices.getUser("admin") == null){
			try {
				User user = new User();
				user.setName("Admin");
				user.setLastname("System");
				user.setUsername("admin");
				user.setPassword("admin");
				user.setEmail("admin@admin.com");
				user.setPhone("6677889900");
				user.setProfile("default.png");

				Role role = new Role();
				role.setRoleId(1L);
				role.setName("ADMIN");

				Set<UserRole> userRoles = new HashSet<>();
				UserRole userRole = new UserRole();
				userRole.setRole(role);
				userRole.setUser(user);
				userRoles.add(userRole);

				User savedUser = userServices.saveUser(user, userRoles);
				System.out.println(savedUser.getUsername());
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
			System.out.println("Creando usuario administrador");
		}
		System.out.println("Usuario administrador ya existe");
	}

}
