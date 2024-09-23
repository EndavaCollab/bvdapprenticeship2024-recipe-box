package com.endava.recipebox.dto;

import com.endava.recipebox.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserIngredientDTO {
    private Long id;
    private String name;
    private Category category;
    private String unit;
    private int kcal;
    private int carbs;
    private int fat;
    private int protein;
    private int quantity;
}
