import { ChangeEvent } from "react";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import "./UpdateIngredientQuantityPopUp.css";
import { backendUrl } from "../../App";
import { useRevalidator } from "react-router-dom";
interface UpdateIngredientQuantityPopUpProps {
    setValue: React.Dispatch<React.SetStateAction<number>>;
    value: number;
    setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ingredient: { id: number; unit: string; quantity: number; name: string };
}

export function UpdateIngredientQuantityPopup({
    value,
    setValue,
    setPopUpOpen,
    ingredient,
}: UpdateIngredientQuantityPopUpProps) {
    function closePopup() {
        setPopUpOpen(false);
        setValue(0);
    }
    const userId = sessionStorage.getItem("userId");
    const revalidator = useRevalidator();
    const callback = () => revalidator.revalidate();

    const updateIngredient = async () => {
        const response = await fetch(
            `${backendUrl}/ingredients/user/update?userId=${userId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ingredientId: ingredient.id,
                    quantity: value,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update ingredient");
        }

        callback();
        return;
    };
    return (
        <div className="add-ingredient-popup-overlay">
            <div className="add-ingredient-popup">
                <CloseButton
                    className="close-button"
                    onClick={() => {
                        closePopup();
                    }}
                />
                <div className="add-ingredient-popup-title">
                    Type the quantity that you want to update for{" "}
                    {ingredient.name} ({ingredient.unit})
                </div>
                <input
                    value={value}
                    type="number"
                    min="0"
                    className="add-ingredient-popup-input"
                    placeholder="Add quantity"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setValue(Number(e.target.value))
                    }
                />
                <div className="add-ingredient-popup-buttons">
                    <button
                        className="add-ingredient-popup-add-btn"
                        disabled={!value}
                        onClick={() => {
                            updateIngredient();
                            closePopup();
                        }}
                    >
                        UPDATE
                    </button>
                    <button
                        className="add-ingredient-popup-cancel-btn"
                        onClick={() => {
                            closePopup();
                        }}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}
