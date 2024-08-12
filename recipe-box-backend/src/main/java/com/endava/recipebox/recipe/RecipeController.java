package com.endava.recipebox.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/recipe_box", produces = "application/json")
public class RecipeController {

    public final RecipeService recipeService;

    @Autowired
    RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/publicRecipes")
    public ResponseEntity<List<Recipe>> getAllPublicRecipes() {
        return ResponseEntity.ok(recipeService.getAllPublicRecipes());
    }

    @GetMapping("/publicRecipes/{name}")
    public ResponseEntity<List<Recipe>> getAllPublicRecipesByName(@PathVariable(name = "recipeName") String name) {
        return ResponseEntity.ok(recipeService.findRecipeByName(name));
    }

    @GetMapping("/publicRecipes/{mealType}")
    public ResponseEntity<List<Recipe>> getAllPublicRecipesByType(@PathVariable(name = "mealType") String mealType) {
        return ResponseEntity.ok(recipeService.findRecipeByType(mealType));

    }

}
