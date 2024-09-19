package com.endava.recipebox.mapper;

import com.endava.recipebox.dto.UserDTO;
import com.endava.recipebox.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO mapUser(User recipe);
}
