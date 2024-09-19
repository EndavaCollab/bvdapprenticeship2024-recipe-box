package com.endava.recipebox.service;

import com.endava.recipebox.dto.UserDTO;

public interface UserService {
    UserDTO findOrSaveUser(String username);
}
