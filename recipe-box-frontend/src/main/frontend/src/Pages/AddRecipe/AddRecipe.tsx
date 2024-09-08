import { useState, ChangeEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddRecipe.css";

interface LeftColumnProps {
    ingredients: string[];
    recipeName: string;
    preparationHours: number;
    preparationMinutes: number;
    difficulty: string;
    category: string;
    servings: number;
    onAddIngredients: () => void;
    onIngredientChange: (index: number, value: string) => void;
    onRecipeNameChange: (value: string) => void;
    onPreparationTimeChange: (hours: number, minutes: number) => void;
    onDifficultyChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onServingsChange: (value: number) => void;
}

interface RightColumnProps {
    ingredientsQuantities: number[];
    description: string;
    image: string | null;
    onIngredientQuantityChange: (index: number, value: number) => void;
    onDescriptionChange: (value: string) => void;
    onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AddRecipe() {
    // Right column state
    const [ingredientsQuantities, setIngredientQuantities] = useState<number[]>(
        [0]
    );
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);

    const handleIngredientQuantityChange = (index: number, value: number) => {
        const newIngredientQuantity = [...ingredientsQuantities];
        newIngredientQuantity[index] = value;
        setIngredientQuantities(newIngredientQuantity);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };

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

    // Left column state
    const [ingredients, setIngredients] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState<string>("");
    const [preparationHours, setPreparationHours] = useState<number>(0);
    const [preparationMinutes, setPreparationMinutes] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [servings, setServings] = useState<number>(0);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
        setIngredientQuantities([...ingredientsQuantities, 0]);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleRecipeNameChange = (value: string) => {
        setRecipeName(value);
    };

    const handlePreparationTimeChange = (hours: number, minutes: number) => {
        setPreparationHours(hours);
        setPreparationMinutes(minutes);
    };

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };

    const handleServingsChange = (value: number) => {
        setServings(value);
    };

    return (
        <>
            <Header />
            <div className="add-recipe-container">
                <div className="add-recipe-fields">
                    <div className="left-column">
                        <LeftColumn
                            onAddIngredients={handleAddIngredient}
                            onIngredientChange={handleIngredientChange}
                            ingredients={ingredients}
                            recipeName={recipeName}
                            preparationHours={preparationHours}
                            preparationMinutes={preparationMinutes}
                            difficulty={difficulty}
                            category={category}
                            servings={servings}
                            onRecipeNameChange={handleRecipeNameChange}
                            onPreparationTimeChange={
                                handlePreparationTimeChange
                            }
                            onDifficultyChange={handleDifficultyChange}
                            onCategoryChange={handleCategoryChange}
                            onServingsChange={handleServingsChange}
                        />
                    </div>
                    <div className="right-column">
                        <RightColumn
                            onIngredientQuantityChange={
                                handleIngredientQuantityChange
                            }
                            ingredientsQuantities={ingredientsQuantities}
                            description={description}
                            onDescriptionChange={handleDescriptionChange}
                            image={image}
                            onImageChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function LeftColumn({
    ingredients,
    recipeName,
    preparationHours,
    preparationMinutes,
    difficulty,
    category,
    servings,
    onAddIngredients,
    onIngredientChange,
    onRecipeNameChange,
    onPreparationTimeChange,
    onDifficultyChange,
    onCategoryChange,
    onServingsChange,
}: LeftColumnProps) {
    return (
        <>
            <div>Recipe Name</div>
            <input
                type="text"
                placeholder="Recipe name"
                className="recipe-name-input-box"
                value={recipeName}
                onChange={(e) => onRecipeNameChange(e.target.value)}
            />
            <div>Preparation time</div>
            <div className="preparation-time-container">
                <select
                    value={preparationHours}
                    onChange={(e) =>
                        onPreparationTimeChange(
                            Number(e.target.value),
                            preparationMinutes
                        )
                    }
                >
                    <option value="" disabled hidden>
                        HH
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <select
                    value={preparationMinutes}
                    onChange={(e) =>
                        onPreparationTimeChange(
                            preparationHours,
                            Number(e.target.value)
                        )
                    }
                >
                    <option value="" disabled hidden>
                        MM
                    </option>
                    <option value="0">15</option>
                    <option value="1">30</option>
                    <option value="2">45</option>
                </select>
            </div>
            <div>Difficulty</div>
            <select
                className="select-dropdown"
                value={difficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
            >
                <option value="" disabled hidden>
                    Select difficulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <div>Category</div>
            <select
                className="select-dropdown"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="" disabled hidden>
                    Select category
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
            </select>

            <div>Servings</div>
            <select
                className="select-dropdown"
                value={servings}
                onChange={(e) => onServingsChange(Number(e.target.value))}
            >
                <option value="" disabled hidden>
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
                    className={
                        ingredient === ""
                            ? "ingredient-select"
                            : "ingredient-selected"
                    }
                    value={ingredient}
                    onChange={(e) => onIngredientChange(index, e.target.value)}
                >
                    <option value="" disabled hidden>
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
                onClick={onAddIngredients}
            >
                + ADD INGREDIENT
            </button>
            <button className="save-recipe-button">SAVE RECIPE</button>
        </>
    );
}

function RightColumn({
    ingredientsQuantities,
    description,
    image,
    onIngredientQuantityChange,
    onDescriptionChange,
    onImageChange,
}: RightColumnProps) {
    return (
        <div className="right-column">
            <div>Recipe Image</div>
            {!image && (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        id="file-input"
                        style={{ display: "none" }}
                    />
                    <label htmlFor="file-input" className="custom-file-upload">
                        + ADD IMAGE
                    </label>
                </>
            )}
            {image && (
                <div className="image-preview">
                    <img src={image} alt="Recipe" />
                </div>
            )}

            <div>Description</div>
            <textarea
                className="description-input"
                placeholder="Enter recipe description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
            />

            <div>Ingredient Quantity</div>
            {ingredientsQuantities.map((quantity, index) => (
                <select
                    key={index}
                    className={
                        quantity === 0
                            ? "ingredient-select"
                            : "ingredient-selected"
                    }
                    value={quantity}
                    onChange={(e) =>
                        onIngredientQuantityChange(
                            index,
                            Number(e.target.value)
                        )
                    }
                >
                    <option value="0" disabled hidden>
                        Select quantity
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                </select>
            ))}
        </div>
    );
}
