package com.endava.recipebox.service;

import com.endava.recipebox.dto.IngredientsAllRequestDTO;
import com.endava.recipebox.dto.UserIngredientDTO;
import com.endava.recipebox.model.Ingredient;
import com.endava.recipebox.model.User;
import com.endava.recipebox.model.UserIngredient;

import java.util.List;

public interface IngredientService {
    Ingredient getIngredientById(Long ingredientId);
    List<IngredientsAllRequestDTO> getAllIngredients();
    List<UserIngredientDTO> toUserIngredientsDTO(List<UserIngredient> userIngredients);
    List<UserIngredientDTO> getUserIngredients(Long userId);
}
