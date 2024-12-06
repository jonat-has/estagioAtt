import React from "react";
import { Container, Divider, Header, Icon, Card, Image } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function Sobre() {
  const desenvolvedores = [
    {
      nome: "Enio Batalha",
      funcao: "Fullstack Developer",
      github: "https://github.com/eniobatalha",
      imagem: "https://avatars.githubusercontent.com/u/42007530?v=4",
    },
    {
      nome: "Jonathas Gabriel",
      funcao: "Fullstack Developer",
      github: "https://github.com/jonat-has",
      imagem: "https://avatars.githubusercontent.com/u/116895496?v=4",
    },
    {
      nome: "Lucas Emanuel",
      funcao: "Fullstack Developer",
      github: "https://github.com/Queriasup",
      imagem: "https://i.ibb.co/mX2Q3n4/lucas.png",
    },
  ];

  return (
    <div>
      <MenuSistema tela={"sobre"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="center"> {/* Centraliza todo o conteúdo */}
          <Header as="h2">
            <Icon name="users" />
            <Header.Content>Sobre o Time de Desenvolvimento</Header.Content>
          </Header>

          <Divider />

          <div style={{ marginTop: "4%", display: "flex", justifyContent: "center" }}>
            <Card.Group itemsPerRow={3} style={{ justifyContent: "center" }}>
              {desenvolvedores.map((dev, index) => (
                <Card key={index}>
                  <Image src={dev.imagem} wrapped ui={false}/>
                  <Card.Content>
                    <Card.Header>{dev.nome}</Card.Header>
                    <Card.Meta>{dev.funcao}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <a href={dev.github} target="_blank" rel="noopener noreferrer">
                      <Icon name="github" />
                      Github
                    </a>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        </Container>
      </div>
    </div>
  );
}
