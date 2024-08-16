package com.endava.recipebox.response;

import com.endava.recipebox.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomRecipe  {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    @JsonIgnore
    private int servings;
    @JsonIgnore
    private int kcalServing;
    @JsonIgnore
    private User user;
    @JsonIgnore
    private Difficulty difficulty;
    @JsonIgnore
    private Duration preparationTime;
    @JsonIgnore
    private MealType mealType;
    @JsonIgnore
    private List<RecipeIngredient> recipeIngredients;
    @JsonIgnore
    private RecipeStatus recipeStatus;


}
