import React from "react";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../views/util/Util";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  if (!user) {
    // Usuário não está logado
    notifyError("Você precisa estar logado para acessar esta página.");
    navigate("/");
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role do usuário não está autorizada
    notifyError(" permissão para acessar esta página.");
    navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
