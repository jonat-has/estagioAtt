import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../views/util/Util";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
 
  console.log(role)
  useEffect(() => {
    // Verifica se o usuário está logado
    if (!user) {
      notifyError("Você precisa estar logado para acessar esta página.");
      navigate("/");
      return;
    }

    // Verifica se a role é permitida
    if (allowedRoles && !allowedRoles.includes(role)) {
      notifyError("Você não tem permissão para acessar esta página.");
      navigate("/");
      return;
    }
  }, [user, role, allowedRoles, navigate]);

  // Se passou nas verificações, renderiza os filhos
  return user && allowedRoles.includes(role) ? children : null;
};

export default ProtectedRoute;
