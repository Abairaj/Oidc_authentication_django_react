import { useNavigate } from "react-router-dom";
import api from "./api";

export function useLogout() {
    const navigate = useNavigate();

    const logout = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        try {
            await api.post("/auth/logout/", { refresh: refreshToken });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            // Clear tokens and PKCE
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("pkce_code_verifier");

            // Redirect to login page
            navigate("/");
        }
    };

    return logout;
}
