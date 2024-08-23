package com.endava.recipebox.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
}
