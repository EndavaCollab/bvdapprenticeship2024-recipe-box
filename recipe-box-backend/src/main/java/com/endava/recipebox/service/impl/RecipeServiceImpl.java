package com.endava.recipebox.service.impl;


import com.endava.recipebox.dto.RecipeRequestDTO;
import com.endava.recipebox.model.*;
import com.endava.recipebox.repository.*;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.mapper.RecipeMapper;
import com.endava.recipebox.service.RecipeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final UserIngredientRepository userIngredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeMapper recipeMapper;


    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper, UserRepository userRepository,
                             RecipeIngredientRepository recipeIngredientRepository, UserIngredientRepository userIngredientRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
        this.userRepository = userRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.userIngredientRepository = userIngredientRepository;
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
    public Recipe createRecipe(RecipeRequestDTO recipeRequestDTO, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() != Role.Admin )
            throw new RuntimeException("Only admins can create recipes");

        Recipe recipe = recipeMapper.toEntity(recipeRequestDTO);

        recipe.setUser(user);

        Recipe savedRecipe = recipeRepository.save(recipe);

        List<RecipeIngredient> recipeIngredients = recipeRequestDTO.getIngredients().stream()
                .map(ingredientDTO -> {
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setRecipe(savedRecipe);

                    UserIngredient ingredient = userIngredientRepository.findById(ingredientDTO.getIngredientId())
                            .orElseThrow(() -> new RuntimeException("Ingredient not found"));

                    recipeIngredient.setIngredient(ingredient.getIngredient());
                    recipeIngredient.setQuantity(ingredientDTO.getQuantity());
                    recipeIngredient.setUnit(ingredientDTO.getUnit());
                    ingredient.setQuantity(ingredient.getQuantity()-ingredientDTO.getQuantity());
                    return recipeIngredient;
                })
                .toList();

        recipeIngredientRepository.saveAll(recipeIngredients);

        return savedRecipe;
    }
}
