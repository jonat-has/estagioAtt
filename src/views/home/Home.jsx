import React from "react";
import { Container, Grid, Image } from 'semantic-ui-react';
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

                                Bem vindo ao sistema <strong>Estágio IFPE</strong> ! <br />
                                Este sistema foi desenvolvido na disciplina de Tópicos Avançados em Engenharia de Software II. <br /> <br />
                                Para acessar o código da <strong>API</strong> do sistema, acesse: <a href='https://github.com/eniobatalha/estagios-api-ejl' target='_blank' rel="noreferrer"> https://github.com/eniobatalha/estagios-api-ejl' </a> <br /> <br />
                                Para acessar o código do <strong>Módulo WEB</strong>, acesse: <a href='https://github.com/eniobatalha/estagios-web-ejl' target='_blank' rel="noreferrer"> https://github.com/eniobatalha/estagios-web-ejl </a>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}
