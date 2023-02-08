import { Navigate } from "react-router-dom";
import authService from "../../services/auth.service";
// import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = (props:any) => {
  //const { user } = useAuth();
  if (!authService.isAuth()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return props.children;
};