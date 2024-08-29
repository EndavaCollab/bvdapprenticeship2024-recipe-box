package com.endava.recipebox.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Embeddable
@EqualsAndHashCode
public class RecipeIngredientId implements Serializable {
    @Column(name = "recipe_id")
    private Long recipeId;

    @Column(name = "ingredient_id")
    private Long ingredientId;

    public RecipeIngredientId() {}

    public RecipeIngredientId(Long recipeId, Long ingredientId) {
        this.recipeId = recipeId;
        this.ingredientId = ingredientId;
    }
}
