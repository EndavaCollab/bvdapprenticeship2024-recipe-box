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
    List<RecipeDTO> getAllPublicRecipesByName(String recipeName, MealType mealType);
    List<RecipeDTO> getAllPublicRecipesByType(MealType mealType);
    List<RecipeDTO> getAllPrivateRecipesByUserId(Long userId, MealType mealType);
    List<RecipeDTO> getAllPrivateRecipesByUserIdAndName(Long userId, String recipeName, MealType mealType);
    Recipe getRecipeById(Long recipeId);
    RecipeDetailsDTO getRecipeDTOById(Long recipeId);
    RecipeDetailsDTO getDetailedRecipeById(Long recipeId, Long userId);
    String createRecipe(RecipeAddRequestDTO recipeAddRequestDTO, Long userId);
    String updateRecipe(RecipeEditRequestDTO recipeAddRequestDTO, Long userId);
    String deleteRecipe(Long recipeId, Long userId);
}
