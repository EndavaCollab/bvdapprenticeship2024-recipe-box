package com.endava.recipebox.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserIngredientRequestDTO {
    private Long ingredientId;
    private int quantity;
    private String unit;
}
