package com.endava.recipebox.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientsAllRequestDTO {

    private Long ingredientId;
    private String ingredientName;
    private String unit;
}
