package com.endava.recipebox.service;

import com.endava.recipebox.dto.UserDTO;
import com.endava.recipebox.model.User;

public interface UserService {
    UserDTO findOrSaveUser(String username);
    public User getUserById(Long userId);
}
