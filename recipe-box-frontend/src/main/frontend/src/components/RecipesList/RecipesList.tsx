import "./RecipesList.css";
import RecipesGrid from "./RecipesGrid";
import Categories from "./Categories";
import React, {useState} from "react";

export default function RecipesList() {
    const [mealType, setMealtype] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="recipes-list">
            <Categories
                onChangeMealType={setMealtype}
                onChangeSearchQuery={setSearchQuery}
            />
            <RecipesGrid mealType={mealType} searchQuery={searchQuery} />
        </div>
    );
}
