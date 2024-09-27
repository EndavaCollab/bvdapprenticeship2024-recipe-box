import { ChangeEvent } from "react";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import "./UpdateIngredientQuantityPopUp.css";

interface UpdateIngredientQuantityPopUpProps {
    setValue: React.Dispatch<React.SetStateAction<number>>;
    value: number;
    setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ingredient: { id: number; unit: string; quantity: number; name: string };
    onUpdate: Function;
}

export function UpdateIngredientQuantityPopup({
    value,
    setValue,
    setPopUpOpen,
    ingredient,
    onUpdate,
}: UpdateIngredientQuantityPopUpProps) {
    const closePopup = () => {
        setPopUpOpen(false);
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
                            onUpdate();
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
