package com.endava.recipebox.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientRequestDTO {
    private Long ingredientId;
    private String ingredientName;
    private int quantity;
    private String unit;
}
