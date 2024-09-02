import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./RecipesList.css";
import RecipesGrid from "./RecipesGrid";
import Categories from "./Categories";
import { useState } from "react";

export default function RecipesList() {
    const [mealType, setMealtype] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="recipes-list">
            <Header />
            <main>
                <Categories
                    onChangeMealType={setMealtype}
                    onChangeSearchQuery={setSearchQuery}
                />

                <RecipesGrid mealType={mealType} searchQuery={searchQuery} />
            </main>
            <Footer />
        </div>
    );
}
