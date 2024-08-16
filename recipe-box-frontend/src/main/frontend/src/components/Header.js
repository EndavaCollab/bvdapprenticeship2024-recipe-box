import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/recipe_box_logo_light.svg';
import { ReactComponent as Group1672 } from '../assets/images/Group_1672.svg';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false); //meniu dropdown

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Inversăm starea pentru a deschide/închide meniul dropdown
    };

    return (
        <header className="header">
            <nav>
                <ul>
                    {/* Elemente din stânga */}
                    <div className="left-items">
                        <li className="logo">
                            <Logo className="logo-image" />
                        </li>
                        <li className="dropdown">
                            <a href="#" onClick={toggleDropdown}>
                                Recipes <span className={`arrow ${dropdownOpen ? 'open' : ''} arrow`}>⌵</span>
                            </a>
                        </li>
                        <li><a href="/ingredients">Ingredients</a></li>
                        <li><a href="/mealplans">Meal Plans</a></li>
                    </div>
                    {/* Elemente din dreapta */}
                    <div className="right-container">
                        <li className="right">
                            <Link to="/addnewrecipe" className="button">ADD NEW RECIPE</Link>
                            <Group1672 className="additional-image" />
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
