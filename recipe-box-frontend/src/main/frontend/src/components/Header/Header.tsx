import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/recipe_box_logo_light.svg';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="left-items">
                        <li className="logo">
                            <Logo className="logo-image" />
                        </li>
                    </div>
                    <div className="right-items">
                        <li className="right">
                            <Link to="/addnewrecipe" className="button">LOGIN</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
