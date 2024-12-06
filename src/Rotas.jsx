import React from 'react';
import { Route, Routes } from "react-router-dom";

import Home from './views/home/Home';
import FormEstudantes from './views/estudante/FormEstudantes.jsx';
import ListEstudantes from './views/estudante/ListEstudantes.jsx';
import ListOrientadores from './views/orientador/ListOrientadores.jsx';
import FormOrientadores from './views/orientador/FormOrientadores.jsx';
import FormAgentes from './views/agente/FormAgentes.jsx';
import ListAgentes from './views/agente/ListAgentes.jsx';
import FormEmpresas from './views/empresa/FormEmpresas.jsx';
import ListEmpresas from './views/empresa/ListEmpresas.jsx';
import ListEstagios from './views/estagio/ListEstagio.jsx';
import FormEstagios from './views/estagio/FormEstagio.jsx';
import Sobre from './views/sobre/Sobre.jsx';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-estudantes" element={ <FormEstudantes/> } />
                <Route path="list-estudantes" element={ <ListEstudantes/> } />
                <Route path="form-orientadores" element={ <FormOrientadores/> } />
                <Route path="list-orientadores" element={ <ListOrientadores/> } />
                <Route path="form-empresas" element={ <FormEmpresas/> } />
                <Route path="list-empresas" element={ <ListEmpresas/> } />
                <Route path="form-agentes" element={ <FormAgentes/> } />
                <Route path="list-agentes" element={ <ListAgentes/> } />
                <Route path="form-estagios" element={ <FormEstagios/> } />
                <Route path="list-estagios" element={ <ListEstagios/> } />
                <Route path="sobre" element={ <Sobre/> } />
            </Routes>
        </>
    )
}

export default Rotas;
