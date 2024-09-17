package com.endava.recipebox.dto;

import com.endava.recipebox.model.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {

    private Long id;
    private String username;
    private Role role;
    private String bio;
}
