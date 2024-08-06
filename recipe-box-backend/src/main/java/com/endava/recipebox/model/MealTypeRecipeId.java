package com.endava.recipebox.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Embeddable
public class MealTypeRecipeId implements Serializable {

    @Column(name = "mealtype_id")
    private Long mealTypeId;

    @Column(name = "recipeId")
    private Long recipeId;
}
