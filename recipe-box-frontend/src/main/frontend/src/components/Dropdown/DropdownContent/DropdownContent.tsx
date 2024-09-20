import React from 'react';
import "./DropdownContent.css";

type DropdownContentProps = {
  children?: React.ReactNode;
  open: boolean;
};

const DropdownContent: React.FC<DropdownContentProps> = ({children, open}) => {
    return <div className={`dropdown-content ${open ? "content-open" : "" }`}>
              {children}
           </div>;
    };

export default DropdownContent;
