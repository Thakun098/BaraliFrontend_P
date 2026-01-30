import axiosInstance from "../axiosConfig";

const login = (email, password) => {
    return axiosInstance
    .post("/api/auth/signin", { email, password})
    .then(response => {
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    });
}

const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user? JSON.parse(user) : null;
}

const logout = () => {
    localStorage.removeItem("user");
}

const AuthService = {
    login,
    logout,
    getCurrentUser
}

export default AuthService;