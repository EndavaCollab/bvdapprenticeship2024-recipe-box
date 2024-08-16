package com.endava.recipebox.controller;

import com.endava.recipebox.model.MealType;
import com.endava.recipebox.response.CustomRecipeMapper;
import com.endava.recipebox.service.RecipeService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;



@RestController
@RequestMapping(path = "/recipe_box", produces = "application/json")
public class RecipeController {

    public final RecipeService recipeService;
    private final CustomRecipeMapper customRecipeMapperMapper = Mappers.getMapper(CustomRecipeMapper.class);

    @Autowired
    RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/publicRecipes")
    public ResponseEntity<?> getAllPublicRecipes() throws IOException {
        return ResponseEntity.ok(customRecipeMapperMapper.map(recipeService.getAllPublicRecipes()));
    }

    @GetMapping("/publicRecipes/{name}")
    public ResponseEntity<?> getAllPublicRecipesByName(@PathVariable(name = "recipeName") String recipeName) {
        if(recipeName == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(String.format("The recipe name entered is null"));
        return ResponseEntity.ok(customRecipeMapperMapper.map(recipeService.getAllPublicRecipesByName(recipeName)));
    }

    @GetMapping("/publicRecipes/{mealType}")
    public ResponseEntity<?> getAllPublicRecipesByType(@PathVariable(name = "mealType") MealType mealType) {
        if(mealType == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(String.format("The recipe type entered is null"));
        return ResponseEntity.ok(customRecipeMapperMapper.map(recipeService.getAllPublicRecipesByType(mealType)));

    }

}
