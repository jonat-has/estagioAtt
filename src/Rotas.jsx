import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./views/home/Home";
import FormEstudantes from "./views/estudante/FormEstudantes.jsx";
import ListEstudantes from "./views/estudante/ListEstudantes.jsx";
import ListOrientadores from "./views/orientador/ListOrientadores.jsx";
import FormOrientadores from "./views/orientador/FormOrientadores.jsx";
import FormAgentes from "./views/agente/FormAgentes.jsx";
import ListAgentes from "./views/agente/ListAgentes.jsx";
import FormEmpresas from "./views/empresa/FormEmpresas.jsx";
import ListEmpresas from "./views/empresa/ListEmpresas.jsx";
import ListEstagios from "./views/estagio/ListEstagio.jsx";
import FormEstagios from "./views/estagio/FormEstagio.jsx";
import Sobre from "./views/sobre/Sobre.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { PagamentoSucesso, PagamentoErro, PagamentoPendente } from "./views/pagamento/PaginasPagamento.jsx"; 

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Páginas de listagem (Visualizador e Editor) */}
        <Route
          path="list-estudantes"
          element={
            <ProtectedRoute allowedRoles={["V", "E"]}>
              <ListEstudantes />
            </ProtectedRoute>
          }
        />
        <Route
          path="list-orientadores"
          element={
            <ProtectedRoute allowedRoles={["V", "E"]}>
              <ListOrientadores />
            </ProtectedRoute>
          }
        />
        <Route
          path="list-agentes"
          element={
            <ProtectedRoute allowedRoles={["V", "E"]}>
              <ListAgentes />
            </ProtectedRoute>
          }
        />
        <Route
          path="list-empresas"
          element={
            <ProtectedRoute allowedRoles={["V", "E"]}>
              <ListEmpresas />
            </ProtectedRoute>
          }
        />
        <Route
          path="list-estagios"
          element={
            <ProtectedRoute allowedRoles={["V", "E"]}>
              <ListEstagios />
            </ProtectedRoute>
          }
        />

        {/* Páginas de formulário (Somente Editor) */}
        <Route
          path="form-estudantes"
          element={
            <ProtectedRoute allowedRoles={["E"]}>
              <FormEstudantes />
            </ProtectedRoute>
          }
        />
        <Route
          path="form-orientadores"
          element={
            <ProtectedRoute allowedRoles={["E"]}>
              <FormOrientadores />
            </ProtectedRoute>
          }
        />
        <Route
          path="form-agentes"
          element={
            <ProtectedRoute allowedRoles={["E"]}>
              <FormAgentes />
            </ProtectedRoute>
          }
        />
        <Route
          path="form-empresas"
          element={
            <ProtectedRoute allowedRoles={["E"]}>
              <FormEmpresas />
            </ProtectedRoute>
          }
        />
        <Route
          path="form-estagios"
          element={
            <ProtectedRoute allowedRoles={["EP"]}>
              <FormEstagios />
            </ProtectedRoute>
          }
        />

        {/* Página Sobre (Acesso Livre) */}
        <Route path="sobre" element={<Sobre />} />

        {/* Páginas de Pagamento */}
        <Route path="sucesso" element={<PagamentoSucesso />} />
        <Route path="erro" element={<PagamentoErro />} />
        <Route path="pending" element={<PagamentoPendente />} />
      </Routes>
    </>
  );
}

export default Rotas;
