import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useState} from "react";
import Categories from "../RecipesList/Categories";
import "./RecipeView.css";
import RecipeViewGrid from "./RecipeViewGrid";


export default function RecipeView() {
    const [mealType, setMealtype] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="recipe-view-container">
            <Header/>
            <main>
                <Categories
                    onChangeMealType={setMealtype}
                    onChangeSearchQuery={setSearchQuery}
                />
                <RecipeViewGrid />
            </main>
            <Footer/>
        </div>
    )
}
