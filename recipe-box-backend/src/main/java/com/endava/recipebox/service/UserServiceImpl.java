package com.endava.recipebox.service;

import com.endava.recipebox.model.Role;
import com.endava.recipebox.model.User;
import com.endava.recipebox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User findOrSaveUser(String username) {
        User user = findUserByUsername(username);
        if (user == null) {
            user = User.builder()
                    .username(username)
                    .role(Role.Chef)
                    .build();

            user = userRepository.save(user);
        }
        return user;
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
