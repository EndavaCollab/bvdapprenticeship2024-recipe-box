package com.endava.recipebox.controller;


import com.endava.recipebox.model.MealType;
import com.endava.recipebox.response.RecipeDTO;
import com.endava.recipebox.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
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


}
