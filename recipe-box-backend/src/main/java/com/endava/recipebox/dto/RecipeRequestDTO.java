package com.endava.recipebox.dto;

import com.endava.recipebox.model.Difficulty;
import com.endava.recipebox.model.MealType;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.util.List;

@Getter
@Setter
public class RecipeRequestDTO {
    private String name;
    private String description;
    private String imageUrl;
    private List<UserIngredientRequestDTO> ingredients;
    private int preparationTime;
    private Difficulty difficulty;
    private int servings;
    private boolean isPublic;
    private MealType mealType;
}
