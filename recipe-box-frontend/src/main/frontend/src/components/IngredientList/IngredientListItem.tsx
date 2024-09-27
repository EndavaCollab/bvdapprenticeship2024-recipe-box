import React, { useState } from "react";
import "./IngredientListItem.css";
import { ReactComponent as Delete } from "../../assets/icons/delete-filled.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { UpdateIngredientQuantityPopup } from "./UpdateIngredientQuantityPopUp";

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
    const [addPopUpToggled, setAddPopUpToggled] = useState(false);
    const [popUpIngredientQuantity, setPopUpIngredientQuantity] =
        useState<number>(0); // Use the primitive type `number`

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
                                onClick={() => setAddPopUpToggled(true)}
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

            {addPopUpToggled && (
                <UpdateIngredientQuantityPopup
                    setPopUpIngredientQuantity={setPopUpIngredientQuantity}
                    popUpIngredientQuantity={popUpIngredientQuantity}
                    setAddPopUpToggled={setAddPopUpToggled}
                    ingredient={ingredient}
                />
            )}
        </>
    );
};

export default IngredientItem;
