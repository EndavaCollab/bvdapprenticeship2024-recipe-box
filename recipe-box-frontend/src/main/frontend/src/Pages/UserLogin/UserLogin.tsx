import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ReactComponent as Logo } from "../../assets/images/recipe_box_logo_dark.svg";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import "./UserLogin.css";
import { backendUrl } from "../../App";

export default function UserLogin() {
    axios.defaults.baseURL = backendUrl;

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        username: boolean;
        password: boolean;
    }>({ username: false, password: false });
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
            const response = await axios.post("users/login", username, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            navigate("/recipeslist");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data || error.message);
                alert("An error occurred during login.");
            }
        }
    };

    return (
        <div className="login-card">
            <CloseButton
                className="close-button"
                onClick={() => navigate("/recipeslist")}
            />
            <Logo className="login-logo" />
            <div className={`input-group ${errors.username ? "error" : ""}`}>
                <div className={errors.username ? "error-text" : ""}>
                    Username
                </div>
                <input
                    type="text"
                    ref={usernameRef}
                    className={`input-with-icon ${
                        errors.username ? "input-error" : ""
                    }`}
                />
                <div className="validation-message">
                    You must enter your username
                </div>
            </div>
            <div className={`input-group ${errors.password ? "error" : ""}`}>
                <div className={errors.password ? "error-text" : ""}>
                    Password
                </div>
                <input
                    type="password"
                    ref={passwordRef}
                    className={`input-with-icon ${
                        errors.password ? "input-error" : ""
                    }`}
                />
                <div className="validation-message">
                    You must enter your password
                </div>
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
