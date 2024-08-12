package com.endava.recipebox.service;

import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public static boolean isPublic(Recipe recipe) {
        return recipe.getEncryption() == "public";
    }

    public List<Recipe> getAllPublicRecipes() {
        List<Recipe> recipes = List.copyOf(recipeRepository.findAll());
        if(recipes.isEmpty())
            throw new IllegalStateException();
        return recipes.stream()
                .filter(RecipeService::isPublic)

                .collect(Collectors.toList());
    }

    public List<Recipe> getAllPublicRecipesByName(String recipeName) {
        List<Recipe> recipes = recipeRepository.findAll();
        if(recipes.isEmpty())
            throw new IllegalStateException();
        else if (recipeName == null || recipeName.isEmpty())
            throw new NoSuchElementException();
        return recipes.stream()
                .filter(r -> Objects.equals(r.getName(), recipeName))

                .collect(Collectors.toList());
    }

    public List<Recipe> getAllPublicRecipesByType(MealType mealType) {
        List<Recipe> recipes = recipeRepository.findAll();
        if(recipes.isEmpty())
            throw new IllegalStateException();
        else if (mealType == null || mealType.isEmpty())
            throw new NoSuchElementException();
        return recipes.stream()
                .filter(r -> Objects.equals((r.getMealType(), mealType)))

                .collect(Collectors.toList());
    }

}
