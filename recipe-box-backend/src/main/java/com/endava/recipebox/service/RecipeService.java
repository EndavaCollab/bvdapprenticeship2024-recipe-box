package com.endava.recipebox.service;


import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.model.RecipeStatus;
import com.endava.recipebox.repository.RecipeRepository;
import com.endava.recipebox.response.CustomRecipe;
import com.endava.recipebox.response.CustomRecipeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CustomRecipeMapper customRecipeMapper;


    @Autowired
    public RecipeService(RecipeRepository recipeRepository, CustomRecipeMapper customRecipeMapper) {
        this.recipeRepository = recipeRepository;
        this.customRecipeMapper = customRecipeMapper;
    }

    public static boolean isPublic(Recipe recipe) {
        return recipe.getRecipeStatus() == RecipeStatus.PUBLIC;
    }

    public List<CustomRecipe> getAllPublicRecipes() {
        return customRecipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeService::isPublic)
                .collect(Collectors.toList()));
    }

    public List<CustomRecipe> getAllPublicRecipesByName(String recipeName) {
        return  customRecipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeService::isPublic)
                .filter(r -> r.getName().equals(recipeName))
                .collect(Collectors.toList()));
    }
    
}
