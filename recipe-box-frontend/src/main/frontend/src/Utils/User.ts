import { UserType } from "../enums/User";

export const storedUserId = () => {
    const storedUserId = sessionStorage.getItem("userId");
    const userId = storedUserId !== null ? parseInt(storedUserId, 10) : undefined;
    return userId;
}

export const storedUserType = () => {
    const storedRole = sessionStorage.getItem("role");
    const userType = storedRole ? (storedRole as UserType) : UserType.GUEST;
    return userType;
}