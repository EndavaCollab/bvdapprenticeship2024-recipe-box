package com.endava.recipebox.response;

import com.endava.recipebox.model.Recipe;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface RecipeMapper {

    List<RecipeDTO> map(List<Recipe> recipe);
}
