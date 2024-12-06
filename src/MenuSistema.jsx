import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {

    return (
        <>
            <Menu inverted>

                <Menu.Item
                    name='home'
                    active={props.tela === 'home'}
                    as={Link}
                    to='/'
                />

                <Menu.Item
                    name='estudantes'
                    active={props.tela === 'estudantes'}
                    as={Link}
                    to='/list-estudantes'
                />

                <Menu.Item
                    name='orientadores'
                    active={props.tela === 'orientadores'}
                    as={Link}
                    to='/list-orientadores'
                />

                <Menu.Item
                    name='agentes'
                    active={props.tela === 'agentes'}
                    as={Link}
                    to='/list-agentes'
                />

                <Menu.Item
                    name='empresas'
                    active={props.tela === 'empresas'}
                    as={Link}
                    to='/list-empresas'
                />

                <Menu.Item
                    name='estagios'
                    active={props.tela === 'estagios'}
                    as={Link}
                    to='/list-estagios'
                />

                <Menu.Item
                    name='sobre'
                    active={props.tela === 'sobre'}
                    as={Link}
                    to='/sobre'
                />


            </Menu>
        </>
    )
}
