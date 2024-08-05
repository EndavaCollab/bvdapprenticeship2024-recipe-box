package com.endava.recipebox.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class CategoryIngredientId implements Serializable {

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "ingredient_id")
    private Long ingredientId;
}
