package com.endava.recipebox.service;

import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.dto.RecipeDTO;

import java.util.List;

public interface RecipeService {
    List<RecipeDTO> getAllPublicRecipes();
    List<RecipeDTO> getAllPublicRecipesByName(String recipeName);
    List<RecipeDTO> getAllPublicRecipesByType(MealType mealType);
    String createRecipe(RecipeAddRequestDTO recipeAddRequestDTO, Long userId);
}
