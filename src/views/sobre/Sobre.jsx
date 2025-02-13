import React, { useState } from "react";
import { Container, Divider, Header, Icon, Card, Image, Button, Modal, Input, Message } from "semantic-ui-react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import MenuSistema from "../../MenuSistema";

initMercadoPago('APP_USR-867da015-08ec-48bc-966e-59ddc4bdedea');

export default function Sobre() {
  const [openModal, setOpenModal] = useState(false);
  const [valor, setValor] = useState("0,00");
  const [pagamentoSucesso, setPagamentoSucesso] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  
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
      imagem: "https://i.ibb.co/7xSMy2M6/lucas.jpg",
    },
  ];
  
  const formatarMoeda = (valor) => {
    let valorNumerico = valor.replace(/[^0-9]/g, "");
    valorNumerico = (parseInt(valorNumerico, 10) / 100).toFixed(2).replace(".", ",");
    return `R$ ${valorNumerico}`;
  };

  const handleChangeValor = (e) => {
    setValor(formatarMoeda(e.target.value));
  };

  const handlePagamento = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/criar-preferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valor: parseFloat(valor.replace("R$ ", "").replace(",", ".")) }),
      });
      const data = await response.json();
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error("Erro ao criar a preferência de pagamento", error);
    }
  };

  return (
    <div>
      <MenuSistema tela={"sobre"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="center">
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
          
          <Button color="orange" size="large" style={{ marginTop: "2rem" }} onClick={() => setOpenModal(true)}>
            <Icon name="heart" /> Contribua com nosso projeto
          </Button>

          <Modal size="small" open={openModal} onClose={() => setOpenModal(false)}>
            <Header icon>
              <Icon name='dollar sign' /> Apoie nosso Projeto
            </Header>
            <Modal.Content>
              <p>Digite o valor da sua contribuição:</p>
              <Input type="text" value={valor} onChange={handleChangeValor} fluid />
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={handlePagamento}>
                <Icon name='credit card' /> Gerar Link de Pagamento
              </Button>
              {preferenceId && (
                <Wallet
                  initialization={{ preferenceId, redirectMode: 'blank' }}
                  customization={{ texts: { valueProp: 'smart_option' } }}
                />
              )}
              <Button color='red' onClick={() => setOpenModal(false)}>
                <Icon name='remove' /> Cancelar
              </Button>
            </Modal.Actions>
          </Modal>

          {pagamentoSucesso && (
            <Message positive>
              <Message.Header>Pagamento realizado com sucesso!</Message.Header>
              <p>Obrigado por sua contribuição ao projeto.</p>
            </Message>
          )}
        </Container>
      </div>
    </div>
  );
}
