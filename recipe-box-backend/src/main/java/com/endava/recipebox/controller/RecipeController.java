package com.endava.recipebox.controller;


import com.endava.recipebox.dto.RecipeRequestDTO;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


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

    @PostMapping("/create")
    public ResponseEntity<Recipe> createRecipe(@RequestBody RecipeRequestDTO recipeRequestDTO, @RequestParam Long userId) {
        if (recipeRequestDTO != null && userId != null) {
            Recipe createdRecipe = recipeService.createRecipe(recipeRequestDTO, userId);
            return ResponseEntity.ok(createdRecipe);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


}
