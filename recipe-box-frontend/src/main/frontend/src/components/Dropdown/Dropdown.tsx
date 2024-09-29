import React, { useEffect, useRef, useState } from "react";
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownContent from "./DropdownContent/DropdownContent";

type DropdownProps = {
    buttonText: string;
    content?: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ buttonText, content }) => {
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutsideDropdown = (e: any) => {
            if (open && !dropdownRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutsideDropdown);
        return () =>
            window.removeEventListener("click", handleClickOutsideDropdown);
    }, [dropdownRef, open]);

    return (
        <div style={{ position: "relative" }} ref={dropdownRef}>
            <DropdownButton onClick={() => setOpen(!open)} open={open}>
                {buttonText}
            </DropdownButton>
            {open === true && (
                <DropdownContent open={open} onClick={() => setOpen(false)}>
                    {content}
                </DropdownContent>
            )}
        </div>
    );
};

export default Dropdown;
