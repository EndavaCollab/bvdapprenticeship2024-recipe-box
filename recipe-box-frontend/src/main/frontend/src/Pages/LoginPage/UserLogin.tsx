import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/images/recipe_box_logo_dark.svg";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import "./UserLogin.css";
import { backendUrl } from "../../App";

export default function UserLogin() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ username: false, password: false });
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        const username = usernameRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";

        const newErrors = {
            username: !username,
            password: !password,
        };

        setErrors(newErrors);

        const hasError = newErrors.username || newErrors.password;

        if (hasError) {
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: username,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            sessionStorage.setItem("userToken", data.token);
            sessionStorage.setItem("username", username);
            navigate("/recipes/list");
        } catch (error) {
            alert("An error occurred during login.");
        }
    };

    return (
        <div className="login-card">
            <CloseButton
                className="close-button"
                onClick={() => navigate("/recipes/list")}
            />
            <Logo className="login-logo" />
            <div
                className={`input-group ${errors.username ? "error" : ""}`}
                style={{ position: "relative" }}
            >
                <div
                    className={errors.username ? "error-text" : ""}
                    style={{ marginBottom: "5px" }}
                >
                    Username
                </div>
                <input
                    type="text"
                    ref={usernameRef}
                    className={`input-with-icon ${
                        errors.username ? "input-error" : ""
                    }`}
                />
                {errors.username && (
                    <div className="validation-message">
                        You must enter your username
                    </div>
                )}
            </div>

            <div
                className={`input-group ${errors.password ? "error" : ""}`}
                style={{ position: "relative" }}
            >
                <div
                    className={errors.password ? "error-text" : ""}
                    style={{ marginBottom: "5px" }}
                >
                    Password
                </div>
                <input
                    type="password"
                    ref={passwordRef}
                    className={`input-with-icon ${
                        errors.password ? "input-error" : ""
                    }`}
                />
                {errors.password && (
                    <div className="validation-message">
                        You must enter your password
                    </div>
                )}
            </div>

            <button className="login-button" onClick={handleLogin}>
                LOGIN
            </button>
            <button className="signup-button">
                Don't have an account <strong>SIGN UP</strong>
            </button>
        </div>
    );
}
