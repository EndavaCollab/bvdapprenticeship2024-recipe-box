import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/recipe_box_logo_light.svg";
import { ReactComponent as ProfileLogo } from "../../assets/images/Group_1672.svg";
import { UserType } from "../../enums/User";
import { storedUserType } from "../../Utils/User";
import Dropdown from "../Dropdown/Dropdown";

const Header: React.FC = () => {
    const userType = storedUserType();

    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="left-items">
                        <Logo className="logo-image" />
                        {userType !== UserType.GUEST && (
                            <>
                                <li>
                                    {userType === UserType.CHEF && (
                                        <ul className="left">
                                            <Dropdown
                                                buttonText="Recipes"
                                                content={
                                                    <>
                                                        <Link
                                                            to="/recipes/list"
                                                            className="dropdown-item"
                                                        >
                                                            Public recipes
                                                        </Link>
                                                        <Link
                                                            to="/recipes/myRecipes"
                                                            className="dropdown-item"
                                                        >
                                                            My recipes
                                                        </Link>
                                                        <Link
                                                            to="/recipes/ingredients"
                                                            className="dropdown-item"
                                                        >
                                                            Recipes with my
                                                            ingredients
                                                        </Link>
                                                    </>
                                                }
                                            />
                                        </ul>
                                    )}
                                    {userType === UserType.ADMIN && (
                                        <Link
                                            to="/recipes/list"
                                            className="nav-item"
                                        >
                                            Recipes
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    <Link
                                        to="/ingredients/list"
                                        className="nav-item"
                                    >
                                        Ingredients
                                    </Link>
                                </li>
                                {userType === UserType.CHEF && (
                                    <li>
                                        <Link
                                            to="/meal-plans"
                                            className="nav-item"
                                        >
                                            Meal Plans
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                    </div>
                    <div className="right-items">
                        {userType === UserType.GUEST ? (
                            <li className="right">
                                <Link to="/userlogin" className="button">
                                    LOGIN
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="right">
                                    <Link
                                        to="/recipes/addrecipe"
                                        className="button"
                                    >
                                        ADD NEW RECIPE
                                    </Link>
                                </li>
                                <ProfileLogo className="profile-logo-image" />
                            </>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
