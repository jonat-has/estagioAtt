
import { React, useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/Util";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function FormAgentes() {
  const { state } = useLocation();

  const createAgente = useMutation(api.agente.create);
  const updateAgente = useMutation(api.agente.update);

  const [idAgente, setIdAgente] = useState(null);

  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (state !== null) {
      setIdAgente(state._id);
      setNome(state.nome);
      setContato(state.contato);
    }
  }, [state]);


  async function salvar() {
    if (idAgente !== null) {
      // Alteração:
      await updateAgente({
        id: idAgente,
        nome: nome,
        contato: contato

      }).then((response) => {
        notifySuccess("agente alterado com sucesso.");
        navigate(`/list-agentes`);
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao alterar o agente.");
        }
      });
    } else {
      // Cadastro:

      await createAgente({
        nome: nome,
        contato: contato
      })
      .then((response) => {
        notifySuccess("agente cadastrado com sucesso.");
        navigate(`/list-agentes`);
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao cadastrar o agente.");
        }
      })
    }
  }

  return (
    <div>
      <MenuSistema tela={"agentes"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idAgente === null && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Agente de Integração &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idAgente !== null && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Agente de Integração &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Contato"
                  maxLength="100"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
                as={Link}
                to="/list-agentes"
              >
                <Icon name="reply" />
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
