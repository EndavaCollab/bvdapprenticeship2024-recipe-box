import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/recipe_box_logo_light.svg';
import { ReactComponent as ProfileLogo } from '../../assets/images/Group_1672.svg';
import { UserType } from '../../enums/User';
import { storedUserType } from '../../Utils/User';
import Dropdown from '../Dropdown/Dropdown';

const Header: React.FC = () => {
    const userType = storedUserType();
    const navigate = useNavigate();

    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="left-items">
                        <li className="logo">
                            <Logo className="logo-image" />
                        </li>
                        {userType !== UserType.GUEST && (
                            <>
                                <li >
                                {userType === UserType.CHEF && (
                                    <>
                                    <ul className='left'>
                                    <Dropdown buttonText="Recipes" content={
                                        <>
                                            <button className="dropdown-item" onClick={() => navigate("/recipes/list")}>Public recipes</button>
                                            <button className="dropdown-item" onClick={() => navigate("/recipes/myRecipes")}>My recipes</button>
                                            <button className="dropdown-item" onClick={() => navigate("/recipes/ingredients")}>Recipes with my ingredients</button>
                                        </>
                                    }/>
                                    </ul>
                                </>
                                )}

                                {userType === UserType.ADMIN && (
                                    <button className='nav-item' onClick={() => navigate("/recipes/list")}>Recipes</button>
                                )}
                                </li>
                                <li><button className="nav-item" onClick={() => navigate("/ingredients")}>Ingredients</button></li>
                                
                                {userType === UserType.CHEF && (
                                    <li><button className="nav-item" onClick={() => navigate("/meal-plans")}>Meal Plans</button></li>
                                )}
                            </>
                        )}
                    </div>
                    <div className="right-items">
                        {userType === UserType.GUEST &&
                        <li className="right">
                            <button className="button" onClick={() => navigate("/userlogin")}>LOGIN</button>
                        </li>
                        }
                        {userType !== UserType.GUEST &&
                        <>
                        <li className="right">
                            <button className="button" onClick={() => navigate("/addrecipe")}>ADD NEW RECIPE</button>
                        </li>
                        <li className='logo'>
                             <ProfileLogo className='profile-logo-image' /> 
                        </li>
                        </>
                        }
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
