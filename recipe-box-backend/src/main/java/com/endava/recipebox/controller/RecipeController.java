package com.endava.recipebox.controller;


import com.endava.recipebox.model.MealType;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.model.RecipeStatus;
import com.endava.recipebox.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping(path = "/recipes", produces = "application/json")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/")
    public ResponseEntity<List<RecipeDTO>> getAllPublicRecipes(@RequestParam(required = false)MealType mealType) {
        if (mealType!=null)
            return ResponseEntity.ok(recipeService.getAllPublicRecipesByType(mealType));
        return ResponseEntity.ok(recipeService.getAllPublicRecipes());
    }

    @GetMapping("/search")
    public ResponseEntity<List<RecipeDTO>> getAllPublicRecipesByName(@RequestParam String recipeName) {
        return ResponseEntity.ok(recipeService.getAllPublicRecipesByName(recipeName));
    }

    @GetMapping("/details")
    public ResponseEntity<?> getRecipeById(@RequestParam Long recipeId, @RequestParam Long userId) {
        if (recipeId == null || userId == null)
        {
            return ResponseEntity.badRequest().body("Recipe id or user id is null.");
        }

        Optional<Recipe> recipeOptional = recipeService.getRecipeById(recipeId);

        if (recipeOptional.isEmpty())
        {
            return ResponseEntity.badRequest().body("Recipe id is incorrect.");
        }

        Recipe recipe = recipeOptional.get();
        if (recipe.getRecipeStatus().equals(RecipeStatus.PRIVATE) && !Objects.equals(recipe.getUser().getId(), userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to access this recipe.");
        }

        return ResponseEntity.ok(recipe);
    }



}
