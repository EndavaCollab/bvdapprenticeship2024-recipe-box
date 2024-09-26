import React, { useState, ChangeEvent } from "react";
import "./IngredientListItem.css";
import { ReactComponent as Delete } from "../../assets/icons/delete-filled.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";

interface Ingredient {
    id: number;
    name: string;
    category: string;
    unit: string;
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
    quantity: number;
}

interface IngredientItemProps {
    ingredient: Ingredient;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient }) => {
    const [addPopupToggled, setAddPopupToggled] = useState(false);
    const [popupIngredientQuantity, setPopupIngredientQuantity] =
        useState<Number>(0);

    const { name, category, unit, kcal, carbs, fat, protein, quantity } =
        ingredient;

    const getQuantityClass = (quantity: number) => {
        if (quantity < 10) return "low";
        if (quantity < 100) return "medium";
        return "high";
    };

    return (
        <>
            <tr>
                <td>#{ingredient.id}</td>
                <td>{name}</td>
                <td>{category}</td>
                <td>{unit}</td>
                <td>{kcal}</td>
                <td>{carbs}</td>
                <td>{fat}</td>
                <td>{protein}</td>
                <td>
                    <span
                        className={`ingredient-quantity ${getQuantityClass(
                            quantity
                        )}`}
                    >
                        <span className="circle"></span>
                        <span className="ingredient-quantity-text">
                            {quantity}
                        </span>
                    </span>
                </td>
                <td>
                    <div className="button-container">
                        <button className="ingredient-button">
                            <div
                                className="button-content"
                                onClick={() => setAddPopupToggled(true)}
                            >
                                <Edit className="svg-button" />
                                Edit
                            </div>
                        </button>
                        <button className="ingredient-button">
                            <div className="button-content">
                                <Delete className="svg-button" />
                                Delete
                            </div>
                        </button>
                    </div>
                </td>
            </tr>

            {addPopupToggled && (
                <div className="add-ingredient-popup-overlay">
                    <div className="add-ingredient-popup">
                        <CloseButton
                            className="close-button"
                            onClick={() => {
                                setAddPopupToggled(false);
                                setPopupIngredientQuantity(0);
                            }}
                        />
                        <div className="add-ingredient-popup-title">
                            Type the quantity that you want to add for
                            ingredient {ingredient.id} ({ingredient.unit})
                        </div>
                        <input
                            value={
                                popupIngredientQuantity
                                    ? Number(popupIngredientQuantity)
                                    : ""
                            }
                            type="text"
                            className="add-ingredient-popup-input"
                            placeholder="Add quantity"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPopupIngredientQuantity(
                                    Number(e.target.value)
                                )
                            }
                        ></input>
                        <div className="add-ingredient-popup-buttons">
                            <button
                                className="add-ingredient-popup-add-btn"
                                disabled={!popupIngredientQuantity}
                                onClick={() => {
                                    setAddPopupToggled(false);
                                    setPopupIngredientQuantity(0);
                                }}
                            >
                                ADD
                            </button>
                            <button
                                className="add-ingredient-popup-cancel-btn"
                                onClick={() => {
                                    setAddPopupToggled(false);
                                    setPopupIngredientQuantity(0);
                                }}
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IngredientItem;
