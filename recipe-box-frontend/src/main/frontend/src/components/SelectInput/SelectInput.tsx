import React, { ChangeEvent } from "react";

interface SelectInputProps {
    value: string | number;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string | number; label: string }[];
    placeholder?: string;
    hasError?: boolean;
    className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    value,
    onChange,
    options,
    placeholder,
    hasError = false,
    className = "",
}) => {
    return (
        <select
            style={{ margin: "0px" }}
            value={value}
            onChange={onChange}
            className={`${
                value ? "ingredient-selected" : "ingredient-select"
            } ${hasError ? "incomplete-field" : ""} ${className}`}
        >
            {placeholder && (
                <>
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>

                    <option value="0" disabled hidden>
                        {placeholder}
                    </option>
                </>
            )}
            {options.map((option, index) => (
                <option
                    key={index}
                    style={{ color: "#000" }}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
