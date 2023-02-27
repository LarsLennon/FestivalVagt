import { Navigate } from "react-router-dom";
import authService from "../../services/auth.service";
// import { useAuth } from "../hooks/useAuth";


export const ProtectedRoute = (props:any) => {
  if (!authService.isAuth()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return props.children;
};

export const ProtectedAdminRoute = (props:any) => {
  if (!authService.isAuth()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  if (!authService.isAdmin()) {
    // user is not authenticated
    return <Navigate to="/unauthorized" />;
  }
  return props.children;
};

export const ProtectedManagerRoute = (props:any) => {
  if (!authService.isAuth()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  if (!authService.isManager()) {
    // user is not authenticated
    return <Navigate to="/unauthorized" />;
  }
  return props.children;
};