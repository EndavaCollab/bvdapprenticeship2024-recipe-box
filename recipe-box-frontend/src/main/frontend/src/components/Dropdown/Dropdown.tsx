import React, { useEffect, useRef, useState } from 'react';
import DropdownButton from './DropdownButton/DropdownButton';
import DropdownContent from './DropdownContent/DropdownContent';
import "./Dropdown.css";

type DropdownProps = {
    buttonText: string;
    content?: React.ReactNode;
  };

const Dropdown: React.FC<DropdownProps> = ({buttonText,content}) => {

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutsideDropdown =(e:any)=> {
        if(open && !dropdownRef.current?.contains(e.target as Node)){
            setOpen(false);
        }
    }
    window.addEventListener("click",handleClickOutsideDropdown);

    return (
           <div className="dropdown" ref={dropdownRef}>
              <DropdownButton onClick={() => setOpen(!open)} open={open}>
                  {buttonText}
              </DropdownButton>
              <DropdownContent open={open}>
                  {content}
              </DropdownContent>
           </div>
           );
    };

export default Dropdown;
