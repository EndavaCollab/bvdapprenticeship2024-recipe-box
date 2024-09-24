package com.endava.recipebox.dto;

import com.endava.recipebox.model.Difficulty;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.RecipeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDetailsDTO {

    private Long id;
    private Long ownerId;
    private String name;
    private String description;
    private String imageUrl;
    private int servings;
    private int kcalServing;
    private Difficulty difficulty;
    private int preparationTime;
    private MealType mealType;
    private List<RecipeIngredientDTO> recipeIngredients;
    private RecipeStatus recipeStatus;
}
