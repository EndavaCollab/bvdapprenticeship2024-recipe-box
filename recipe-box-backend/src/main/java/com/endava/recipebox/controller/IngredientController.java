package com.endava.recipebox.controller;


import com.endava.recipebox.dto.IngredientUpdateDTO;
import com.endava.recipebox.dto.IngredientsAllRequestDTO;
import com.endava.recipebox.dto.UserIngredientDTO;
import com.endava.recipebox.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/ingredients", produces = "application/json")
public class IngredientController {

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }


    @GetMapping("/")
    public ResponseEntity<List<IngredientsAllRequestDTO>> getAllIngredients() {
        return ResponseEntity.ok(ingredientService.getAllIngredients());
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserIngredientDTO>> getUsersIngredients(@RequestParam Long userId) {
        return ResponseEntity.ok(ingredientService.getUserIngredients(userId));
    }

    @PatchMapping("/user/update")
    public ResponseEntity<String> updateUserIngredient(@RequestParam Long userId, @RequestBody IngredientUpdateDTO ingredient) {
        return ResponseEntity.ok(ingredientService.updateUserIngredient(userId, ingredient));
    }
}
