package com.endava.recipebox.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientUpdateDTO {
    private Long ingredientId;
    private int quantity;
}
