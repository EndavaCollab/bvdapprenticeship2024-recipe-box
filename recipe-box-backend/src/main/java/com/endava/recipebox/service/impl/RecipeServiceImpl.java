package com.endava.recipebox.service.impl;


import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.exceptions.UnauthorizedActionException;
import com.endava.recipebox.model.*;
import com.endava.recipebox.repository.*;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.mapper.RecipeMapper;
import com.endava.recipebox.service.RecipeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;

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

                    recipeIngredient.setIngredient(ingredient);
                    recipeIngredient.setQuantity(ingredientDTO.getQuantity());
                    recipeIngredient.setUnit(ingredient.getUnit());
                    return recipeIngredient;
                })
                .toList();

        recipeIngredientRepository.saveAll(recipeIngredients);

        return "Recipe added successfully";
    }
}
