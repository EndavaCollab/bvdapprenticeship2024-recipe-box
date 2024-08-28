package com.endava.recipebox.dto;

import com.endava.recipebox.model.Difficulty;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.RecipeIngredient;
import com.endava.recipebox.model.RecipeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.Duration;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDetailsDTO extends RecipeDTO{

    private int servings;
    private int kcalServing;
    private Difficulty difficulty;
    private int preparationTime;
    private MealType mealType;
    private List<RecipeIngredient> recipeIngredients;
    private RecipeStatus recipeStatus;
}
