import React from "react";
import { Container, Grid, Image, Button } from 'semantic-ui-react';
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import MenuSistema from "../../MenuSistema";

export default function Home() {

    return (
        <div>
            <MenuSistema tela={'home'} />

            <div style={{ marginTop: '5%' }}>
                <Container>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Image src='/logo-IFPE.png' size='large' />
                            </Grid.Column>
                            <Grid.Column>
                                Bem vindo ao sistema <strong>Estágio IFPE</strong>! <br />
                                Este sistema foi desenvolvido na disciplina de Tópicos Avançados em Engenharia de Software II. <br /> <br />
                                Para acessar o código da <strong>API</strong> do sistema, acesse: <a href='https://github.com/eniobatalha/estagios-api-ejl' target='_blank' rel="noreferrer"> https://github.com/eniobatalha/estagios-api-ejl </a> <br /> <br />
                                Para acessar o código do <strong>Módulo WEB</strong>, acesse: <a href='https://github.com/eniobatalha/estagios-web-ejl' target='_blank' rel="noreferrer"> https://github.com/eniobatalha/estagios-web-ejl </a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>

            {/* Buttons Section */}
            <div style={{ marginTop: '5%', textAlign: 'center' }}>
                <Button
                    color="green"
                    style={{ backgroundColor: '#68912E', color: '#fff', marginRight: '10px' }}
                >
                    <FcGoogle style={{ marginRight: '8px', backgroundColor: '#fff', borderRadius: '33%' }} />
                    Logar como Visualizador
                </Button>
                <Button
                    color="red"
                    style={{ backgroundColor: '#EE1C25', color: '#fff' }}
                >
                    <FcGoogle style={{ marginRight: '8px', backgroundColor: '#fff', borderRadius: '33%' }} />
                    Logar como Editor
                </Button>
            </div>
        </div>
    );
}
