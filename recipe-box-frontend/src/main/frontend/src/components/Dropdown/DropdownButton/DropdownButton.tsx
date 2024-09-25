import React from 'react';
import { ReactComponent as ChevronDown } from '../../../assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../assets/icons/chevron-up.svg';
import "./DropdownButton.css";

type DropdownButtonProps = {
    children?: React.ReactNode;
    open: boolean;
    onClick(): void;
  };

const DropdownButton: React.FC<DropdownButtonProps> = ({children, open, onClick}) => {
    return (
           <div onClick={onClick} className={`dropdown-btn ${open ? "button-open" : ""}`}>
             {children}
             <span className="toggle-icon">
                 {open ? <ChevronUp fill={'white'}/> : <ChevronDown fill={'white'}/>}
             </span>
           </div>
        );
    };

export default DropdownButton;
