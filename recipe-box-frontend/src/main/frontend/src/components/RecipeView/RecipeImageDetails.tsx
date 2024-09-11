import React from 'react';
import "./RecipeImageDetails.css";
import { ReactComponent as Clock } from '../../assets/icons/clock.svg';
import { ReactComponent as Battery } from '../../assets/icons/battery-three-quarters.svg';
import { ReactComponent as PizzaSlice } from '../../assets/icons/pizza-slice.svg';
import { ReactComponent as Tachometer } from '../../assets/icons/tachometer-alt.svg';

interface RecipeImageDetailsProps {
    imageUrl: string;
    time: number;
    difficulty: string;
    servings: number;
    calories: number;
}

const RecipeImageDetails: React.FC<RecipeImageDetailsProps> = ({ imageUrl, time, difficulty, servings, calories }) => {
    return (
        <div className="recipe-image-details">
            <img className="recipe-image" src={imageUrl} alt="Recipe" />
            <div className="recipe-meta">
                <div className="meta-item">
                    <Clock className="icon"/>
                    <span style={{fontSize: '1rem'}}>{time} Min</span>
                </div>
                <div className="meta-item">
                    <Tachometer className="icon"/>
                    <span style={{fontSize: '1rem'}}>{difficulty}</span>
                </div>
                <div className="meta-item">
                    <PizzaSlice className="icon"/>
                    <span style={{fontSize: '1rem'}}>{servings} Servings</span>
                </div>
                <div className="meta-item">
                    <Battery className="icon"/>
                    <span style={{fontSize: '1rem'}}>{calories} Kcal/serving</span>
                </div>
            </div>
        </div>
    );
}

export default RecipeImageDetails;
