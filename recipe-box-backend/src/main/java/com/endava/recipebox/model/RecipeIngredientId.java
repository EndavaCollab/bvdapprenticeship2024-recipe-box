package com.endava.recipebox.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Embeddable
public class RecipeIngredientId implements Serializable {
    @Column(name = "recipe_id")
    private Long recipeId;

    @Column(name = "ingredient_id")
    private Long ingredientId;
}
