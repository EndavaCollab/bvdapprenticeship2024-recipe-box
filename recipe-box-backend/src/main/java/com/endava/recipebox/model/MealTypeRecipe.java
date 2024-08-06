package com.endava.recipebox.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "MEALTYPE_RECIPE")
public class MealTypeRecipe {

    @EmbeddedId
    private MealTypeRecipeId id;

    @ManyToOne
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @ManyToOne
    @MapsId("mealTypeId")
    @JoinColumn(name = "mealtype_id", nullable = false)
    private MealType mealType;


}
