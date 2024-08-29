package com.endava.recipebox.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RecipeIngredientDTO {
    private Long ingredientId;
    private int quantity;
    private String unit;
    private String name;
}
