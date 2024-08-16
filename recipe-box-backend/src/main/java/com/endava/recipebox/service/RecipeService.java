package com.endava.recipebox.service;


import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.model.RecipeStatus;
import com.endava.recipebox.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
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
        return recipe.getRecipeStatus() == RecipeStatus.PUBLIC;
    }

    public List<Recipe> getAllPublicRecipes() {
        List<Recipe> recipes = List.copyOf(recipeRepository.findAll()).stream()
                .filter(RecipeService::isPublic)
                .collect(Collectors.toList());
        return recipes;
    }

    public List<Recipe> getAllPublicRecipesByName(String recipeName) {
        List<Recipe> recipes = recipeRepository.findAll().stream()
                .filter(RecipeService::isPublic)
                .filter(r -> Objects.equals(r.getName(), recipeName))
                .collect(Collectors.toList());
        return  recipes;
    }

    public List<Recipe> getAllPublicRecipesByType(MealType mealType) {
        List<Recipe> recipes = recipeRepository.findAll().stream()
                .filter(RecipeService::isPublic)
                .filter(r -> r.getMealType() == mealType)
                .collect(Collectors.toList());
        return recipes;
    }
    
}
