package com.Udemy.Practicas.LuisBravo.services;

import java.util.List;
import java.util.Set;

import com.Udemy.Practicas.LuisBravo.models.User;
import com.Udemy.Practicas.LuisBravo.models.UserRole;

public interface UserServices {

    User saveUser(User user, Set<UserRole> UserRoles) throws Exception;

    List<User> getAllUser();

    User getUser(String username);

    void deleteUser(Long userId);

}
