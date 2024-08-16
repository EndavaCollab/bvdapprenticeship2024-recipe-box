package com.endava.recipebox.response;

import com.endava.recipebox.model.Recipe;

import java.util.ArrayList;
import java.util.List;

public class CustomRecipeMapperImpl implements CustomRecipeMapper {

    @Override
    public List<CustomRecipe> map(List<Recipe> recipes) {
        if (recipes == null) {
            return null;
        }

        List<CustomRecipe> customRecipes = new ArrayList<CustomRecipe>(recipes.size());
        for (Recipe recipe : recipes) {
            customRecipes.add(recipeToCustomRecipe(recipe));
        }

        return customRecipes;
    }

    protected CustomRecipe recipeToCustomRecipe(Recipe recipe) {
        if (recipe == null) {
            return null;
        }

        CustomRecipe customRecipe = new CustomRecipe();

        customRecipe.setId(recipe.getId());
        customRecipe.setName(recipe.getName());
        customRecipe.setDescription(recipe.getDescription());
        customRecipe.setImageUrl(recipe.getImageUrl());

        return customRecipe;
    }
}
