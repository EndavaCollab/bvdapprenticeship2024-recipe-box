import { ReactComponent as Check } from "../../assets/icons/check.svg";
import "./Checkbox.css";

type CheckboxProps = {
    isAvailable: boolean;
    ingredientName: string;
    unit: string;
    quantity: number;

};

const Checkbox: React.FC<CheckboxProps> = ({
    isAvailable,
    ingredientName,
    quantity,
    unit
}) => {
    return (
        <div className="checkbox">
            {isAvailable ? (
                <Check
                    className="check-icon"
                    style={{ border: "2px solid grey" }}
                />
            ) : (
                <div className="unavailable-ingredients-box"></div>
            )}
            <div className={`checkbox-items ${isAvailable ? "" : "checkbox-unavailable-items" }`}>
                <span>{ingredientName}</span>
                <span>{quantity} {unit}</span>
            </div>
        </div>
    );
};

export default Checkbox;
