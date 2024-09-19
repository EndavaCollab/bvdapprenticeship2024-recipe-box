package com.endava.recipebox.service.impl;

import com.endava.recipebox.dto.IngredientsAllRequestDTO;
import com.endava.recipebox.mapper.IngredientMapper;
import com.endava.recipebox.repository.IngredientRepository;
import com.endava.recipebox.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;

    @Autowired
    public IngredientServiceImpl(IngredientRepository ingredientRepository, IngredientMapper ingredientMapper) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientMapper = ingredientMapper;
    }

    @Override
    public List<IngredientsAllRequestDTO> getAllIngredients() {
        return ingredientMapper.toIngredientsAllRequestDTOList(ingredientRepository.findAll());
    }
}
