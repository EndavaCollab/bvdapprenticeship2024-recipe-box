package com.endava.recipebox.service.impl;


import com.endava.recipebox.dto.*;
import com.endava.recipebox.exception.BadRequestException;
import com.endava.recipebox.exception.UnauthorizedActionException;
import com.endava.recipebox.mapper.RecipeMapper;
import com.endava.recipebox.model.*;
import com.endava.recipebox.repository.IngredientRepository;
import com.endava.recipebox.repository.RecipeIngredientRepository;
import com.endava.recipebox.repository.RecipeRepository;
import com.endava.recipebox.repository.UserRepository;
import com.endava.recipebox.service.RecipeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeMapper recipeMapper;


    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper, UserRepository userRepository,
                             RecipeIngredientRepository recipeIngredientRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
        this.userRepository = userRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public static boolean isPublic(Recipe recipe) {
        return recipe.getRecipeStatus() == RecipeStatus.PUBLIC;
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipes() {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .toList());
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByName(String recipeName) {
        return  recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> r.getName().equals(recipeName))
                .toList());
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByType(MealType mealType) {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> r.getMealType() == mealType)
                .toList());
    }

    @Override
    @Transactional
    public String createRecipe(RecipeAddRequestDTO recipeAddRequestDTO, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (user.getRole() != Role.Admin )
            throw new UnauthorizedActionException("Only admins can create recipes");

        Recipe recipe = recipeMapper.toEntity(recipeAddRequestDTO);

        recipe.setUser(user);

        Recipe savedRecipe = recipeRepository.save(recipe);

        List<RecipeIngredient> recipeIngredients = recipeAddRequestDTO.getIngredients().stream()
                .map(ingredientDTO -> {
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(savedRecipe);

                    Ingredient ingredient = ingredientRepository.findById(ingredientDTO.getIngredientId())
                            .orElseThrow(() -> new EntityNotFoundException("No ingredient found in the DB."));

                    recipeIngredient.setId(new RecipeIngredientId(recipe.getId(), ingredient.getId()));
                    recipeIngredient.setIngredient(ingredient);
                    recipeIngredient.setQuantity(ingredientDTO.getQuantity());
                    recipeIngredient.setUnit(ingredient.getUnit());
                    return recipeIngredient;
                })
                .toList();

        recipeIngredientRepository.saveAll(recipeIngredients);

        return "Recipe added successfully";
    }

    @Override
    public Recipe getRecipeById(Long recipeId) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
        if (recipeOptional.isEmpty()) {
            throw new BadRequestException("Recipe with ID " + recipeId + " not found.");
        }
        return recipeOptional.get();
    }

    @Override
    public RecipeDTO getRecipeDTOById(Long recipeId) {
        Recipe recipe = getRecipeById(recipeId);
        if (!isPublic(recipe)) {
            throw new UnauthorizedActionException("You do not have access to this private recipe.");
        }
        return recipeMapper.mapRecipe(recipe);
    }

    @Override
    public RecipeDetailsDTO getDetailedRecipeById(Long recipeId, Long userId) {
        Recipe recipe = getRecipeById(recipeId);
        if (!isPublic(recipe) && !recipe.getUser().getId().equals(userId)) {
            throw new UnauthorizedActionException("You do not have access to this private recipe.");
        }
        RecipeDetailsDTO recipeDetailsDTO = recipeMapper.mapDetailedRecipe(recipe);
        recipeDetailsDTO.setRecipeIngredients(recipe.getRecipeIngredients().stream()
                .map(recipeIngredient -> RecipeIngredientDTO.builder()
                        .ingredientId(recipeIngredient.getIngredient().getId())
                        .name(recipeIngredient.getIngredient().getName())
                        .quantity(recipeIngredient.getQuantity())
                        .unit(recipeIngredient.getUnit()).build())
                .toList());

        return recipeDetailsDTO;
    }

    @Override
    @Transactional
    public String updateRecipe(RecipeEditRequestDTO recipeAddRequestDTO, Long userId){
        Recipe recipe = recipeRepository.findById(recipeAddRequestDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        boolean isAdmin = user.getRole().equals(Role.Admin);
        boolean isOwner = recipe.getUser().getId().equals(userId);

        if (isAdmin || isOwner) {
            Recipe updateRecipe = recipeMapper.toEntity(recipeAddRequestDTO);

            recipe.setName(updateRecipe.getName());
            recipe.setDescription(updateRecipe.getDescription());
            recipe.setImageUrl(updateRecipe.getImageUrl());
            recipe.setMealType(updateRecipe.getMealType());
            recipe.setRecipeIngredients(updateRecipe.getRecipeIngredients());
            recipe.setPreparationTime(updateRecipe.getPreparationTime());
            recipe.setDifficulty(updateRecipe.getDifficulty());
            recipe.setRecipeStatus(updateRecipe.getRecipeStatus());
            recipe.setServings(updateRecipe.getServings());

            recipeRepository.save(recipe);
        }
        else
        {
            throw new UnauthorizedActionException("You do not have permission to edit this recipe");
        }

        return "Recipe update successfully!";
    }
}
