package com.endava.recipebox.service.impl;


import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.model.RecipeStatus;
import com.endava.recipebox.repository.RecipeRepository;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.mapper.RecipeMapper;
import com.endava.recipebox.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
    }

    public static boolean isPublic(Recipe recipe) {
        return recipe.getRecipeStatus() == RecipeStatus.PUBLIC;
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipes() {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .collect(Collectors.toList()));
    }

    @Override
    public Optional<Recipe> getRecipeById(Long recipeId) {
        return recipeRepository.findById(recipeId);
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByName(String recipeName) {
        return  recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> r.getName().equals(recipeName))
                .collect(Collectors.toList()));
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByType(MealType mealType) {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> r.getMealType() == mealType)
                .collect(Collectors.toList()));
    }
}
