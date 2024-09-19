package com.endava.recipebox.service;

import com.endava.recipebox.dto.IngredientsAllRequestDTO;

import java.util.List;

public interface IngredientService {
    List<IngredientsAllRequestDTO> getAllIngredients();
}
