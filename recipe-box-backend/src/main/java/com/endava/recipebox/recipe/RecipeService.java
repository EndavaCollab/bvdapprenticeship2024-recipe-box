package com.endava.recipebox.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public boolean isPublic(Recipe recipe) {
        return recipe.getEncryption() == "public";
    }

    public List<Recipe> getAllPublicRecipes() {
        return recipeRepository.stream()
                .filter(RecipeService::isPublic)
                .map(r -> r.getId()+" "+r.getName()+" "+r.getDescription()+" "+r.getImage())
                .collect(Collectors.toList());
    }

    public List<Recipe> getAllPublicRecipesByName(String recipeName) {
        return recipeRepository.stream()
                .filter(r -> r.getName() == recipeName)
                .map(r -> r.getId()+" "+r.getName()+" "+r.getDescription()+" "+r.getImage())
                .collect(Collectors.toList());
    }

    public List<Recipe> getAllPublicRecipesByType(String mealType) {
        return recipeRepository.stream()
                .filter(r -> r.getType() == mealType)
                .map(r -> r.getId()+" "+r.getName()+" "+r.getDescription()+" "+r.getImage())
                .collect(Collectors.toList());
    }










}
