package com.endava.recipebox.service;

import com.endava.recipebox.model.MealType;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.model.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeService {
    List<RecipeDTO> getAllPublicRecipes();
    Optional<Recipe> getRecipeById(Long recipeId);
    List<RecipeDTO> getAllPublicRecipesByName(String recipeName);
    List<RecipeDTO> getAllPublicRecipesByType(MealType mealType);
}
