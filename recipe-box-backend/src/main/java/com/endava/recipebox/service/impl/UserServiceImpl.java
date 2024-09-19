package com.endava.recipebox.service.impl;

import com.endava.recipebox.dto.UserDTO;
import com.endava.recipebox.mapper.UserMapper;
import com.endava.recipebox.model.Role;
import com.endava.recipebox.model.User;
import com.endava.recipebox.repository.UserRepository;
import com.endava.recipebox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO findOrSaveUser(String username) {
        User user = findUserByUsername(username);
        if (user == null) {
            user = User.builder()
                    .username(username)
                    .role(Role.Chef)
                    .build();

            user = userRepository.save(user);
        }

        return userMapper.mapUser(user);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
