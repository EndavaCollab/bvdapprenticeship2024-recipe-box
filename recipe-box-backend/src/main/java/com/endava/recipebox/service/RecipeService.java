package com.endava.recipebox.service;

import com.endava.recipebox.dto.RecipeRequestDTO;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.model.Recipe;

import java.util.List;

public interface RecipeService {
    List<RecipeDTO> getAllPublicRecipes();
    List<RecipeDTO> getAllPublicRecipesByName(String recipeName);
    List<RecipeDTO> getAllPublicRecipesByType(MealType mealType);
    Recipe createRecipe(RecipeRequestDTO recipeRequestDTO, Long userId);
}
