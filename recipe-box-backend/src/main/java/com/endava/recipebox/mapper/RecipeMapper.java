package com.endava.recipebox.mapper;

import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.dto.RecipeEditRequestDTO;
import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.dto.RecipeDTO;
import com.endava.recipebox.dto.RecipeDetailsDTO;
import com.endava.recipebox.model.Recipe;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

    List<RecipeDTO> map(List<Recipe> recipe);
    RecipeDTO mapRecipe(Recipe recipe);
    RecipeDetailsDTO mapDetailedRecipe(Recipe recipe);
    Recipe toEntity(RecipeAddRequestDTO dto);
    Recipe toEntity(RecipeEditRequestDTO dto);
}
