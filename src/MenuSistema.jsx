import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { getAuth, signOut } from "firebase/auth";

export default function MenuSistema(props) {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
    const [role, setRole] = useState(""); // Estado para armazenar a role do usuário

    const auth = getAuth();
    const navigate = useNavigate();

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
        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
                localStorage.removeItem("role");
                setUser(null);
                setRole("");
                navigate(`/`);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Erro ao desconectar:", error);
            });
    };

    const visualizadorPages = [
        { name: "Estudantes", path: "list-estudantes" },
        { name: "Orientadores", path: "list-orientadores" },
        { name: "Agentes", path: "list-agentes" },
        { name: "Empresas", path: "list-empresas" },
        { name: "Estágios", path: "list-estagios" },
    ];

    return (
        <Menu inverted>
            {/* Página inicial */}
            <Menu.Item
                name="Home"
                active={props.tela === "home"}
                as={Link}
                to="/"
            />

            {/* Páginas de visualização */}
            {visualizadorPages.map((page) => (
                <Menu.Item
                    key={page.path}
                    name={page.name}
                    active={props.tela === page.path}
                    as={Link}
                    to={`/${page.path}`}
                />
            ))}

            {/* Página sobre */}
            <Menu.Item
                name="Sobre"
                active={props.tela === "sobre"}
                as={Link}
                to="/sobre"
            />

            {/* Indicador de login e botão de desconectar */}
            <Menu.Menu position="right">
                {user ? (
                    <>
                        <Menu.Item>
                            Olá {user.displayName} - Perfil {role === "V" ? "Visualizador" : "Editor"}
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
