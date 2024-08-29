package com.endava.recipebox.service;

import com.endava.recipebox.dto.RecipeDetailsDTO;
import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.dto.RecipeEditRequestDTO;

import java.util.List;

public interface RecipeService {
    List<RecipeDTO> getAllPublicRecipes();
    List<RecipeDTO> getAllPublicRecipesByName(String recipeName);
    List<RecipeDTO> getAllPublicRecipesByType(MealType mealType);
    Recipe getRecipeById(Long recipeId);
    RecipeDTO getRecipeDTOById(Long recipeId);
    RecipeDetailsDTO getDetailedRecipeById(Long recipeId, Long userId);
    String createRecipe(RecipeAddRequestDTO recipeAddRequestDTO, Long userId);
    String updateRecipe(RecipeEditRequestDTO recipeAddRequestDTO, Long userId);
}
