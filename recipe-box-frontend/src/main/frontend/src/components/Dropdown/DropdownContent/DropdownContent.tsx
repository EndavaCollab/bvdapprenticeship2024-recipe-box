import React from "react";
import "./DropdownContent.css";

type DropdownContentProps = {
    children?: React.ReactNode;
    open: boolean;
    onClick(): void;
};

const DropdownContent: React.FC<DropdownContentProps> = ({
    children,
    open,
    onClick,
}) => {
    return (
        <div
            className={`dropdown-content ${open ? "content-open" : ""}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default DropdownContent;
