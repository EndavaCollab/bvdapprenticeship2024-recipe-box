package com.endava.recipebox.service.impl;


import com.endava.recipebox.dto.*;
import com.endava.recipebox.exception.BadRequestException;
import com.endava.recipebox.exception.UnauthorizedActionException;
import com.endava.recipebox.mapper.RecipeMapper;
import com.endava.recipebox.model.*;
import com.endava.recipebox.repository.RecipeIngredientRepository;
import com.endava.recipebox.repository.RecipeRepository;
import com.endava.recipebox.service.IngredientService;
import com.endava.recipebox.service.RecipeService;
import com.endava.recipebox.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserService userService;
    private final IngredientService ingredientService;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeMapper recipeMapper;


    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper, UserService userService,
                             RecipeIngredientRepository recipeIngredientRepository, IngredientService ingredientService) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
        this.userService = userService;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.ingredientService = ingredientService;
    }

    public static boolean isPublic(Recipe recipe) {
        return recipe.getRecipeStatus() == RecipeStatus.PUBLIC;
    }

    public static boolean isPrivate(Recipe recipe) {
        return recipe.getRecipeStatus() == RecipeStatus.PRIVATE;
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipes() {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .toList());
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByName(String recipeName, MealType mealType) {
        return  recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> mealType == null ?  r.getName().toLowerCase().contains(recipeName.toLowerCase()) :
                                                r.getName().toLowerCase().contains(recipeName.toLowerCase()) && r.getMealType() == mealType)
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
    public List<RecipeDTO> getAllPrivateRecipesByUserId(Long userId, MealType mealType) {
        Logger log = LoggerFactory.getLogger(RecipeServiceImpl.class);

        List<Recipe> recipes = recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPrivate)
                .filter(r -> Objects.equals(r.getUser().getId(), userId))
                .toList();

        if (recipes.isEmpty()) {
            log.info("No private recipes found for userId: {}", userId);
        }

        if (mealType != null) {
            recipes = recipes.stream()
                    .filter(recipe -> recipe.getMealType() == mealType)
                    .toList();
        }

        return recipeMapper.map(recipes);
    }

    @Override
    public List<RecipeDTO> getAllPrivateRecipesByUserIdAndName(Long userId, String recipeName, MealType mealType) {
        return getAllPrivateRecipesByUserId(userId, mealType).stream()
                .filter(r -> r.getName().toLowerCase().contains(recipeName.toLowerCase()))
                .toList();
    }

    @Override
    @Transactional
    public String createRecipe(RecipeAddRequestDTO recipeAddRequestDTO, Long userId) {

        User user = userService.getUserById(userId);
        Recipe recipe = recipeMapper.toAddEntity(recipeAddRequestDTO);
        if (user.getRole() != Role.Admin && isPublic(recipe))
            throw new UnauthorizedActionException("Only admins can create public recipes");

        recipe.setUser(user);

        Recipe savedRecipe = recipeRepository.save(recipe);
       

        List<RecipeIngredient> recipeIngredients = recipeAddRequestDTO.getIngredients().stream()
                .map(ingredientDTO -> {
                    System.out.println(ingredientDTO.getIngredientId());
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(savedRecipe);

                    Ingredient ingredient = ingredientService.getIngredientById(ingredientDTO.getIngredientId());

                    recipeIngredient.setId(new RecipeIngredientId(recipe.getId(), ingredient.getId()));
                    recipeIngredient.setIngredient(ingredient);
                    recipeIngredient.setQuantity(ingredientDTO.getQuantity());
                    recipeIngredient.setUnit(ingredient.getUnit());
                    return recipeIngredient;
                })
                .toList();
        int totalCalories = recipeIngredients.stream()
                        .mapToInt(recipeIngredient -> {
                            int ingredientCaloriesPerUnit = recipeIngredient.getIngredient().getKcal();
                            int ingredientQuantity = recipeIngredient.getQuantity();
                            return ingredientCaloriesPerUnit * ingredientQuantity;
                        })
                        .sum();

        savedRecipe.setKcalServing(totalCalories);
        savedRecipe.setRecipeIngredients(recipeIngredients);
        savedRecipe.setPreparationTime(Integer.parseInt(recipeAddRequestDTO.getCookingTime()));
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
    public RecipeDetailsDTO getRecipeDTOById(Long recipeId) {
        Recipe recipe = getRecipeById(recipeId);
        if (!isPublic(recipe)) {
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
    public RecipeDetailsDTO getDetailedRecipeById(Long recipeId, Long userId) {
        Recipe recipe = getRecipeById(recipeId);
        if (!isPublic(recipe) && !recipe.getUser().getId().equals(userId)) {
            throw new UnauthorizedActionException("You do not have access to this private recipe.");
        }
        RecipeDetailsDTO recipeDetailsDTO = recipeMapper.mapDetailedRecipe(recipe);
        recipeDetailsDTO.setOwnerId(recipe.getUser().getId());
        recipeDetailsDTO.setRecipeIngredients(recipe.getRecipeIngredients().stream()
                .map(recipeIngredient -> RecipeIngredientDTO.builder()
                        .ingredientId(recipeIngredient.getIngredient().getId())
                        .name(recipeIngredient.getIngredient().getName())
                        .quantity(recipeIngredient.getQuantity())
                        .unit(recipeIngredient.getUnit())
                        .build())
                .toList());

        return recipeDetailsDTO;
    }

    @Override
    @Transactional
    public String updateRecipe(RecipeEditRequestDTO recipeAddRequestDTO, Long userId){
        Recipe recipe = recipeRepository.findById(recipeAddRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("Recipe not found."));

        User user = userService.getUserById(userId);

        boolean isAdmin = user.getRole().equals(Role.Admin);
        boolean isOwner = recipe.getUser().getId().equals(userId);

        if (isAdmin || isOwner) {
            Recipe updateRecipe = recipeMapper.toEditEntity(recipeAddRequestDTO);

            recipe.setName(updateRecipe.getName());
            recipe.setDescription(updateRecipe.getDescription());
            recipe.setImageUrl(updateRecipe.getImageUrl());
            recipe.setFileName(updateRecipe.getFileName());
            recipe.setMealType(updateRecipe.getMealType());
            recipe.setPreparationTime(Integer.parseInt(recipeAddRequestDTO.getCookingTime()));
            recipe.setDifficulty(updateRecipe.getDifficulty());
            recipe.setRecipeStatus(updateRecipe.getRecipeStatus());
            recipe.setServings(updateRecipe.getServings());

            List<RecipeIngredient> updatedIngredients = recipeAddRequestDTO.getIngredients().stream()
                    .map(ingredientDTO -> {
                        Ingredient ingredient = ingredientService.getIngredientById(ingredientDTO.getIngredientId());
                        RecipeIngredient recipeIngredient = new RecipeIngredient();
                        recipeIngredient.setRecipe(recipe);
                        recipeIngredient.setIngredient(ingredient);
                        recipeIngredient.setQuantity(ingredientDTO.getQuantity());
                        recipeIngredient.setUnit(ingredientDTO.getUnit());

                        RecipeIngredient existingIngredient = recipe.getRecipeIngredients().stream()
                                .filter(ri -> ri.getIngredient().getId().equals(ingredientDTO.getIngredientId()))
                                .findFirst()
                                .orElse(null);

                        if (existingIngredient != null) {
                            // Dacă ingredientul există, actualizează cantitatea și unitatea
                            existingIngredient.setQuantity(ingredientDTO.getQuantity());
                            existingIngredient.setUnit(ingredientDTO.getUnit());
                            return existingIngredient;
                        } else {
                            recipeIngredient.setId(new RecipeIngredientId(recipe.getId(), ingredient.getId()));
                            recipeIngredientRepository.save(recipeIngredient);
                            return recipeIngredient;
                        }
                    })
                    .toList();

                    recipe.setRecipeIngredients(new ArrayList<>(updatedIngredients));
            recipeRepository.save(recipe);
        }
        else
        {
            throw new UnauthorizedActionException("You do not have permission to edit this recipe");
        }

        return "Recipe update successfully!";
    }

    @Override
    public String deleteRecipe(Long recipeId, Long userId) {
        Recipe recipe = getRecipeById(recipeId);
        User user = userService.getUserById(userId);

        Role userRole = user.getRole();
        if (userRole.equals(Role.Admin) && !isPublic(recipe) || userRole.equals(Role.Chef) && !recipe.getUser().getId().equals(userId))
        {
            throw new UnauthorizedActionException("You do not have permission to delete this recipe");
        }

        recipe.getRecipeIngredients().forEach(recipeIngredientRepository::delete);
        recipeRepository.delete(recipe);
        return "The recipe has been successfully deleted";
    }
}
