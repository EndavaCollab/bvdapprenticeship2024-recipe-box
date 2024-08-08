package com.endava.recipebox.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    @GetMapping("/publicRecipes")
    public List<Recipe> getAllPublicRecipes() {
        return ;
    }

    @GetMapping("/publicRecipes/{recipeName}")
    public Recipe findByName(@PathVariable String recipeName) {
        return recipe
    }

    @GetMapping("/publicRecipes/{recipeType}")
    public Recipe findByType(@PathVariable String recipeType) {
        return recipe
    }

}
