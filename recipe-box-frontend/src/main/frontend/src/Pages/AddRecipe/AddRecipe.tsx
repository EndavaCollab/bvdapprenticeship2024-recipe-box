import React, { useState, useMemo, ChangeEvent, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/close copy.svg";
import SelectInput from "../../components/SelectInput/SelectInput";
import { useNavigate } from "react-router-dom";

import "./AddRecipe.css";

import {
    quantityOptions,
    preparationHoursValues,
    preparationMinutesValues,
    difficultyValues,
    categoryValues,
    servingsValues,
} from "./utils";

export interface RecipeAddRequest {
    name: string;
    description: string;
    imageUrl: string | undefined;
    mealType: string;
    ingredients: IngredientRequest[];
    cookingTime: number;
    difficulty: string;
    servings: number;
}

export interface IngredientRequest {
    ingredientID: number;
    ingredientName: string;
    quantity: number;
    unit: string;
}

export interface ImageFile {
    fileName: string;
    fileData: string;
}

export default function AddRecipe() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const defaultIngredient = {
        ingredientID: 0,
        unit: "grams",
        ingredientName: "",
        quantity: 0,
    };

    //Left column
    const [recipeName, setRecipeName] = useState<string>("");
    const [preparationHours, setPreparationHours] = useState<number>(0);
    const [preparationMinutes, setPreparationMinutes] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [servings, setServings] = useState<number>(0);
    const [availableIngredients, setAvailableIngredients] = useState<
        { id: number; name: string; unit: string }[]
    >([]);

    //Right column
    const [ingredients, setIngredients] = useState<IngredientRequest[]>([
        { ...defaultIngredient },
    ]);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<ImageFile | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch("/ingredients");
                if (!response.ok) {
                    throw new Error("Error fetching ingredients");
                }
                const data = await response.json();
                const options = data.map((ingredient: any) => ({
                    id: ingredient.ingredientId,
                    name: ingredient.ingredientName,
                    unit: ingredient.unit,
                }));
                setAvailableIngredients(options);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchIngredients();
    }, []);

    const totalPreparationTime = preparationHours * 60 + preparationMinutes;

    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            {
                ...defaultIngredient,
                ingredientID: ingredients.length,
            },
        ]);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const selectedIngredient = availableIngredients.find(
            (ingredient) => ingredient.name === value
        );

        const newIngredients = [...ingredients];
        if (selectedIngredient) {
            newIngredients[index] = {
                ...newIngredients[index],
                ingredientName: selectedIngredient.name,
                ingredientID: selectedIngredient.id,
                unit: selectedIngredient.unit,
            };
        }
        setIngredients(newIngredients);
    };

    const handleIngredientQuantityChange = (index: number, value: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], quantity: value };
        setIngredients(newIngredients);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({
                    fileName: file.name,
                    fileData: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const submitIsDisabled = useMemo(
        () =>
            !recipeName ||
            !totalPreparationTime ||
            !difficulty ||
            !category ||
            !servings ||
            ingredients.some(
                (ingredient) =>
                    !ingredient.ingredientName || !ingredient.quantity
            ) ||
            !image,
        [
            recipeName,
            totalPreparationTime,
            difficulty,
            category,
            servings,
            ingredients,
            image,
        ]
    );

    const handleSaveRecipe = async () => {
        // const imageUrl = image ? await uploadImage(image.fileData) : '';   // de decomentat daca o sa putem trimite o imagine
        const imageUrl = image?.fileName;

        const recipeData: RecipeAddRequest = {
            name: recipeName,
            description,
            difficulty,
            mealType: category,
            servings,
            imageUrl,
            ingredients,
            cookingTime: totalPreparationTime,
        };

        try {
            const response = await fetch(`/recipes?userId=${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error("Error in submitting recipe");
            }

            const data = await response.json();
            console.log("Recipe successfully added:", data);
            alert("Recipe successfully added.");
            navigate("/recipes/list");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred! The recipe has not been added.");
            // navigate("/recipes/list"); //TESTING
        }
    };

    return (
        <>
            <Header />
            <div className="add-recipe-container">
                <div className="add-recipe-fields">
                    <div className="left-column">
                        <div>Recipe Name*</div>
                        <input
                            type="text"
                            placeholder="Recipe name"
                            className="recipe-name-input-box"
                            value={recipeName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setRecipeName(e.target.value)
                            }
                        />

                        <div>Preparation time*</div>
                        <div className="preparation-time-container">
                            <SelectInput
                                value={preparationHours}
                                onChange={(e) =>
                                    setPreparationHours(Number(e.target.value))
                                }
                                options={preparationHoursValues}
                                placeholder="HH"
                            />

                            <SelectInput
                                value={preparationMinutes}
                                onChange={(e) =>
                                    setPreparationMinutes(
                                        Number(e.target.value)
                                    )
                                }
                                options={preparationMinutesValues}
                                placeholder="MM"
                            />
                        </div>

                        <div>Difficulty*</div>
                        <SelectInput
                            value={difficulty}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setDifficulty(e.target.value)
                            }
                            options={difficultyValues}
                            placeholder="Choose difficulty"
                        />

                        <div>Category*</div>

                        <SelectInput
                            className="recipe-name-input-box"
                            value={category}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setCategory(e.target.value)
                            }
                            options={categoryValues}
                            placeholder="Select category"
                        />

                        <div>Servings*</div>

                        <SelectInput
                            value={servings}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setServings(Number(e.target.value))
                            }
                            options={servingsValues}
                            placeholder="Select servings"
                        />

                        <div>Ingredient name*</div>

                        {ingredients.map((ingredient, index) => (
                            <div style={{ margin: "0 0 10px 0" }}>
                                <SelectInput
                                    key={index}
                                    value={ingredient.ingredientName}
                                    onChange={(e) =>
                                        handleIngredientChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    options={availableIngredients.map(
                                        (ingredient) => ({
                                            value: ingredient.name,
                                            label: ingredient.name,
                                        })
                                    )}
                                    placeholder="Select ingredient"
                                    className="recipe-name-input-box"
                                />
                            </div>
                        ))}

                        <button
                            className="add-ingredient-button"
                            onClick={handleAddIngredient}
                        >
                            + ADD INGREDIENT
                        </button>

                        <button
                            disabled={submitIsDisabled}
                            className="save-recipe-button"
                            onClick={handleSaveRecipe}
                        >
                            SAVE RECIPE
                        </button>
                    </div>

                    <div className="right-column">
                        <div>Recipe Image*</div>

                        {!image && (
                            <div
                                className="add-image-button-dashed-border"
                                style={{ margin: 0 }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="file-input"
                                    style={{ display: "none" }}
                                />
                                <label
                                    htmlFor="file-input"
                                    className="custom-file-upload"
                                >
                                    + ADD IMAGE
                                </label>
                            </div>
                        )}
                        {image && (
                            <div
                                className="added-image-dashed-border"
                                style={{ margin: 0 }}
                            >
                                <div
                                    className="image-file-name"
                                    style={{
                                        margin: "15px 10px",
                                    }}
                                >
                                    <CheckIcon className="check-icon" />
                                    {image.fileName}
                                    <RemoveIcon
                                        className="remove-icon"
                                        onClick={() => setImage(null)}
                                    />
                                </div>
                            </div>
                        )}

                        <div>Description</div>
                        <textarea
                            className="description-input"
                            value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setDescription(e.target.value)
                            }
                        />

                        <div style={{ marginBottom: 6 }}>
                            Ingredient Quantity*
                        </div>

                        {ingredients.map((ingredient, index) => (
                            <div style={{ margin: "0 0 10px 0" }}>
                                <SelectInput
                                    key={index}
                                    value={ingredient.quantity}
                                    onChange={(e) =>
                                        handleIngredientQuantityChange(
                                            index,
                                            Number(e.target.value)
                                        )
                                    }
                                    options={quantityOptions.map((option) => ({
                                        value: option.value,
                                        label: `${option.label} ${ingredient.unit}`,
                                    }))}
                                    placeholder="Select ingredient quantity"
                                    className="recipe-name-input-box"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
