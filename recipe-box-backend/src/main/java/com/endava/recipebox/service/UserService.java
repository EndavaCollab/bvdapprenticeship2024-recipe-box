package com.endava.recipebox.service;

import com.endava.recipebox.dto.UserDTO;
import com.endava.recipebox.exception.BadRequestException;
import com.endava.recipebox.model.User;

import java.util.Optional;

public interface UserService {
    UserDTO findOrSaveUser(String username);
    public User getUserById(Long userId);
}
