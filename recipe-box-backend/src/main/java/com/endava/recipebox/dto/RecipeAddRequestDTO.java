package com.endava.recipebox.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Range;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipeAddRequestDTO {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    private String imageURL;

    @NotNull(message = "Type cannot be null")
    @NotBlank(message = "Type cannot be blank")
    @Pattern(
            regexp = "breakfast|lunch|dinner|dessert|snack",
            flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "Type must be one of the following: breakfast, lunch, dinner, dessert, snack"
    )
    private String mealType;

    @NotNull(message = "Ingredients cannot be null")
    @Size(min = 1, message = "There must be at least one ingredient")
    @Valid
    private List<UserIngredientRequestDTO> ingredients;

    @NotNull(message = "Cooking time cannot be null")
    @NotBlank(message = "Cooking time cannot be blank")
    private String cookingTime;

    @NotNull(message = "Difficulty cannot be null")
    @NotBlank(message = "Difficulty cannot be blank")
    @Pattern(
            regexp = "easy|medium|advanced",
            flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "Difficulty must be one of the following: easy, medium, advanced"
    )
    private String difficulty;

    @NotNull(message = "Recipe status cannot be null")
    @NotBlank(message = "Recipe status cannot be blank")
    @Pattern(
            regexp = "public|private",
            flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "Recipe status must be one of the following: public, private"
    )
    private String recipeStatus;

    @NotNull(message = "Servings cannot be null")
    @Range(min = 1, max = 4, message = "Servings must be between 1 and 4")
    private Integer servings;
}
