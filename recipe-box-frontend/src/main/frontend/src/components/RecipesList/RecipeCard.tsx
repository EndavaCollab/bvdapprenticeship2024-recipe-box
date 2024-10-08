import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

interface RecipeCardProps {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    style?: React.CSSProperties;
}

export default function RecipeCard({
    id,
    title,
    description,
    imageUrl,
    style,
}: RecipeCardProps) {
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const image = imageRef.current;
        if (!image) return;

        const rect = image.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateY = (mouseX / width) * 10 - 5;
        const rotateX = (mouseY / height) * -10 + 5;

        image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const image = imageRef.current;
        if (!image) return;

        image.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <div className="recipe-card" style={style}>
            <img
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                src={imageUrl}
                alt={title}
                className="recipe-card-image"
                ref={imageRef}
            />
            <div className="recipe-card-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <Link to={`/recipes/view/${id}`} className="view-recipe-button">
                VIEW RECIPE
            </Link>
        </div>
    );
}
