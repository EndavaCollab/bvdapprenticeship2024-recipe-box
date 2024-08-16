package com.endava.recipebox.service;

import com.endava.recipebox.model.User;

public interface UserService {
    User findOrSaveUser(String username);
}
