import { ChangeEvent } from "react";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import "./UpdateIngredientQuantityPopUp.css";
interface UpdateIngredientQuantityPopUpProps {
    setPopUpIngredientQuantity: React.Dispatch<React.SetStateAction<number>>;
    popUpIngredientQuantity: number;
    setAddPopUpToggled: React.Dispatch<React.SetStateAction<boolean>>;
    ingredient: { id: number; unit: string };
}

export function UpdateIngredientQuantityPopup({
    setPopUpIngredientQuantity,
    popUpIngredientQuantity,
    setAddPopUpToggled,
    ingredient,
}: UpdateIngredientQuantityPopUpProps) {
    return (
        <div className="add-ingredient-popup-overlay">
            <div className="add-ingredient-popup">
                <CloseButton
                    className="close-button"
                    onClick={() => {
                        setAddPopUpToggled(false);
                        setPopUpIngredientQuantity(0);
                    }}
                />
                <div className="add-ingredient-popup-title">
                    Type the quantity that you want to update for ingredient{" "}
                    {ingredient.id} ({ingredient.unit})
                </div>
                <input
                    value={
                        popUpIngredientQuantity
                            ? Number(popUpIngredientQuantity)
                            : ""
                    }
                    type="text"
                    className="add-ingredient-popup-input"
                    placeholder="Add quantity"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPopUpIngredientQuantity(Number(e.target.value))
                    }
                />
                <div className="add-ingredient-popup-buttons">
                    <button
                        className="add-ingredient-popup-add-btn"
                        disabled={!popUpIngredientQuantity}
                        onClick={() => {
                            setAddPopUpToggled(false);
                            setPopUpIngredientQuantity(0);
                        }}
                    >
                        ADD
                    </button>
                    <button
                        className="add-ingredient-popup-cancel-btn"
                        onClick={() => {
                            setAddPopUpToggled(false);
                            setPopUpIngredientQuantity(0);
                        }}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}
