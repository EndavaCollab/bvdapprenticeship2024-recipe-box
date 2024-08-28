package com.endava.recipebox.service.impl;


import com.endava.recipebox.dto.RecipeDetailsDTO;
import com.endava.recipebox.exception.BadRequestException;
import com.endava.recipebox.exception.UnauthorizedActionException;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.model.RecipeStatus;
import com.endava.recipebox.repository.RecipeRepository;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.mapper.RecipeMapper;
import com.endava.recipebox.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
    }

    public static boolean isPublic(Recipe recipe) {
        return recipe.getRecipeStatus() == RecipeStatus.PUBLIC;
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipes() {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .collect(Collectors.toList()));
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByName(String recipeName) {
        return  recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> r.getName().equals(recipeName))
                .collect(Collectors.toList()));
    }

    @Override
    public List<RecipeDTO> getAllPublicRecipesByType(MealType mealType) {
        return recipeMapper.map(recipeRepository.findAll().stream()
                .filter(RecipeServiceImpl::isPublic)
                .filter(r -> r.getMealType() == mealType)
                .collect(Collectors.toList()));
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
        if (recipe.getRecipeStatus() == RecipeStatus.PRIVATE) {
            throw new UnauthorizedActionException("You do not have access to this private recipe.");
        }
        return recipeMapper.mapRecipe(recipe);
    }

    @Override
    public RecipeDetailsDTO getDetailedRecipeById(Long recipeId, Long userId) {
        Recipe recipe = getRecipeById(recipeId);
        if (recipe.getRecipeStatus() == RecipeStatus.PRIVATE && !recipe.getUser().getId().equals(userId)) {
            throw new UnauthorizedActionException("You do not have access to this private recipe.");
        }
        return recipeMapper.mapDetailedRecipe(recipe);
    }
}
