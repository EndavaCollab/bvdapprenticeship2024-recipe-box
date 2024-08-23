package com.endava.recipebox.repository;

import com.endava.recipebox.model.UserIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserIngredientRepository extends JpaRepository<UserIngredient, Long> {
}
