import { useState, ChangeEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddRecipe.css";

export default function AddRecipe() {
    return (
        <>
            <Header />
            <div className="add-recipe-fields">
                <div className="left-column">
                    <LeftColumn />
                </div>
                <div className="right-column">
                    <RightColumn />
                </div>
            </div>
            <Footer />
        </>
    );
}

function LeftColumn() {
    const [ingredients, setIngredients] = useState<string[]>([""]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    return (
        <>
            <div>Recipe Name</div>
            <input
                type="text"
                placeholder="Recipe name"
                className="recipe-name-input-box"
            />
            <div>Preparation time</div>
            <div className="preparation-time-container">
                <select>
                    <option value="" disabled selected hidden>
                        HH
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <select>
                    <option value="" disabled selected hidden>
                        MM
                    </option>
                    <option value="0">15</option>
                    <option value="1">30</option>
                    <option value="2">45</option>
                </select>
            </div>
            <div>Difficulty</div>
            <select className="select-dropdown">
                <option value="" disabled selected hidden>
                    Select difficulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <div>Category</div>
            <select className="select-dropdown">
                <option value="" disabled selected hidden>
                    Select category
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
            </select>

            <div>Servings</div>
            <select className="select-dropdown">
                <option value="" disabled selected hidden>
                    Select no. of servings
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
            </select>

            <div>Ingredient name</div>
            {ingredients.map((ingredient, index) => (
                <select
                    key={index}
                    className="ingredient-select"
                    value={ingredient}
                    onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                    }
                >
                    <option value="" disabled selected hidden>
                        Select ingredient
                    </option>
                    <option value="flour">Flour</option>
                    <option value="sugar">Sugar</option>
                    <option value="butter">Butter</option>
                    <option value="eggs">Eggs</option>
                </select>
            ))}

            <button
                className="add-ingredient-button"
                onClick={handleAddIngredient}
            >
                + ADD INGREDIENT
            </button>
            <button className="save-recipe-button">SAVE RECIPE</button>
        </>
    );
}

function RightColumn() {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="right-column">
            <div>Recipe Image</div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-input"
                style={{ display: "none" }}
            />
            <label htmlFor="file-input" className="custom-file-upload">
                + ADD IMAGE{" "}
            </label>
            {image && (
                <div className="image-preview">
                    <img src={image} alt="Recipe" />
                </div>
            )}

            <div>Description</div>
            <textarea
                className="description-input"
                placeholder="Enter recipe description"
            />

            <div>Ingredient Quantity</div>
            <select className="select-dropdown">
                <option value="" disabled selected hidden>
                    Select quantity
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
    );
}
