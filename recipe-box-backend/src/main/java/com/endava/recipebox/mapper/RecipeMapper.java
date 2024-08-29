package com.endava.recipebox.mapper;

import com.endava.recipebox.model.Recipe;
import com.endava.recipebox.dto.RecipeDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

    List<RecipeDTO> map(List<Recipe> recipe);
}
