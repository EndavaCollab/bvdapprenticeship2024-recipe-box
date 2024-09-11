package com.endava.recipebox.controller;

import com.endava.recipebox.exception.BadRequestException;
import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.dto.RecipeEditRequestDTO;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

    @GetMapping("/{recipeId}")
    public ResponseEntity<Object> getRecipeById(@PathVariable Long recipeId, @RequestParam(required = false)Long userId) {
        if (recipeId == null)
        {
            throw new BadRequestException("Recipe ID is null.");
        }

        if (userId == null) {
            return ResponseEntity.ok(recipeService.getRecipeDTOById(recipeId));
        }
        else {
            return ResponseEntity.ok(recipeService.getDetailedRecipeById(recipeId, userId));
        }
    }

    @PostMapping
    public ResponseEntity<String> createRecipe(@Validated @RequestBody RecipeAddRequestDTO recipeAddRequestDTO,@RequestParam Long userId) {
        return ResponseEntity.ok(recipeService.createRecipe(recipeAddRequestDTO, userId));
    }

    @PutMapping
    public ResponseEntity<String> editRecipe(@Validated @RequestBody RecipeEditRequestDTO recipeEditRequestDTO, @RequestParam Long userId){
        return ResponseEntity.ok(recipeService.updateRecipe(recipeEditRequestDTO,userId));
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long recipeId, @RequestParam Long userId) {
        return ResponseEntity.ok(recipeService.deleteRecipe(recipeId, userId));
    }

}
