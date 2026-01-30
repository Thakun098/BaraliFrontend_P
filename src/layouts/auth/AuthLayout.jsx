import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    const { isUser, logOut } = useAuth();

    return (
        <ProtectedRoute roles={["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <Navbar isUser={isUser} logOut={logOut} />
            <Outlet />
            <Footer />
        </ProtectedRoute>
    )
}
export default AuthLayout