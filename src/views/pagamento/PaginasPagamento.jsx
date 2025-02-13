import React from "react";
import { Container, Header, Icon, Message, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export function PagamentoSucesso() {
  const navigate = useNavigate();
  return (
    <Container textAlign="center" style={{ marginTop: "5%" }}>
      <Message positive>
        <Header as="h2">
          <Icon name="check circle" color="green" /> Pagamento Realizado com Sucesso!
        </Header>
        <p>Obrigado pela sua contribuição. Seu apoio é fundamental para o projeto!</p>
        <Button color="blue" onClick={() => navigate("/")}>Voltar para o Início</Button>
      </Message>
    </Container>
  );
}

export function PagamentoErro() {
  const navigate = useNavigate();
  return (
    <Container textAlign="center" style={{ marginTop: "5%" }}>
      <Message negative>
        <Header as="h2">
          <Icon name="times circle" color="red" /> Erro no Pagamento
        </Header>
        <p>Houve um problema ao processar o pagamento. Tente novamente mais tarde.</p>
        <Button color="blue" onClick={() => navigate("/")}>Voltar para o Início</Button>
      </Message>
    </Container>
  );
}

export function PagamentoPendente() {
  const navigate = useNavigate();
  return (
    <Container textAlign="center" style={{ marginTop: "5%" }}>
      <Message warning>
        <Header as="h2">
          <Icon name="hourglass half" color="yellow" /> Pagamento Pendente
        </Header>
        <p>Seu pagamento ainda está sendo processado. Assim que for confirmado, você será notificado.</p>
        <Button color="blue" onClick={() => navigate("/")}>Voltar para o Início</Button>
      </Message>
    </Container>
  );
}

export default { PagamentoSucesso, PagamentoErro, PagamentoPendente };
