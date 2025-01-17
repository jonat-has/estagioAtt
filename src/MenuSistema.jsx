import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
    const [role, setRole] = useState(""); // Estado para armazenar a role do usuário

    useEffect(() => {
        // Recupera o usuário e a role do localStorage
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");
        
        if (storedUser && storedRole) {
            setUser(JSON.parse(storedUser)); // Carrega o usuário
            setRole(storedRole); // Carrega a role (V ou E)
        }
    }, []);

    const handleLogout = () => {
        // Remove os dados do localStorage e atualiza o estado
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setUser(null);
        setRole("");
    };

    const isEditor = role === "E";

    return (
        <Menu inverted>
            {/* Páginas sempre visíveis */}
            <Menu.Item
                name="home"
                active={props.tela === "home"}
                as={Link}
                to="/"
            />
            {["list-estudantes", "list-orientadores", "list-agentes", "list-empresas", "list-estagios"].map((path) => (
                <Menu.Item
                    key={path}
                    name={path}
                    active={props.tela === path}
                    as={Link}
                    to={`/${path}`}
                />
            ))}

            {/* Páginas exclusivas para editores */}
            {isEditor && (
                <>
                    <Menu.Item
                        name="form-estudantes"
                        active={props.tela === "form-estudantes"}
                        as={Link}
                        to="/form-estudantes"
                    />
                    <Menu.Item
                        name="form-orientadores"
                        active={props.tela === "form-orientadores"}
                        as={Link}
                        to="/form-orientadores"
                    />
                    <Menu.Item
                        name="form-agentes"
                        active={props.tela === "form-agentes"}
                        as={Link}
                        to="/form-agentes"
                    />
                    <Menu.Item
                        name="form-empresas"
                        active={props.tela === "form-empresas"}
                        as={Link}
                        to="/form-empresas"
                    />
                    <Menu.Item
                        name="form-estagios"
                        active={props.tela === "form-estagios"}
                        as={Link}
                        to="/form-estagios"
                    />
                </>
            )}

            {/* Página sobre (sempre visível) */}
            <Menu.Item
                name="sobre"
                active={props.tela === "sobre"}
                as={Link}
                to="/sobre"
            />

            {/* Indicador de login e botão de desconectar */}
            <Menu.Menu position="right">
                {user ? (
                    <>
                        <Menu.Item>
                            Olá {user.name} - Perfil {role === "V" ? "Visualizador" : "Editor"}
                        </Menu.Item>
                        <Menu.Item
                            name="logout"
                            onClick={handleLogout}
                        >
                            Desconectar
                        </Menu.Item>
                    </>
                ) : null}
            </Menu.Menu>
        </Menu>
    );
}
