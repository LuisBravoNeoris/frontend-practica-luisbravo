package com.Udemy.Practicas.LuisBravo.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Udemy.Practicas.LuisBravo.models.User;
import com.Udemy.Practicas.LuisBravo.models.UserRole;
import com.Udemy.Practicas.LuisBravo.repositories.RoleRepository;
import com.Udemy.Practicas.LuisBravo.repositories.UserRepository;
import com.Udemy.Practicas.LuisBravo.services.UserServices;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserServices {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public UserServiceImpl() {
    }

    public User saveUser(User user, Set<UserRole> userRoles) throws Exception {
        User userLocal = this.userRepository.findByUsername(user.getUsername());
        if (userLocal != null) {

            userLocal.setProfile(user.getProfile());
            userLocal.setName(user.getName());
            userLocal.setLastname(user.getLastname());
            userLocal.setEmail(user.getEmail());
            userLocal.setPhone(user.getPhone());
            

            if(user.getPassword() != null){
                userLocal.setPassword(user.getPassword());
            }

            return userLocal = (User) this.userRepository.save(userLocal);

        } else {
            for (UserRole userRole : userRoles) {
                this.roleRepository.save(userRole.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            userLocal = this.userRepository.save(user);
            return userLocal;
        }
    }

    public List<User> getAllUser() {
        return this.userRepository.findAll();
    }

    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

}
