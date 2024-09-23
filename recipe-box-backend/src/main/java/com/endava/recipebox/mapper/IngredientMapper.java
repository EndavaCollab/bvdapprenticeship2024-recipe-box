package com.endava.recipebox.mapper;

import com.endava.recipebox.dto.IngredientsAllRequestDTO;
import com.endava.recipebox.dto.UserIngredientDTO;
import com.endava.recipebox.model.Ingredient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    @Mapping(source = "id", target = "ingredientId")
    @Mapping(source = "name", target = "ingredientName")
    IngredientsAllRequestDTO toIngredientsAllRequestDTO(Ingredient ingredient);

    List<IngredientsAllRequestDTO> toIngredientsAllRequestDTOList(List<Ingredient> ingredients);

    UserIngredientDTO toUserIngredientDTO(Ingredient userIngredient);
}
