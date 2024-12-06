import axios from "axios";
import { React, useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormAgentes() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const { state } = useLocation();
  const [idAgente, setIdAgente] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/agentes-integracao/" + state.id)
        .then((response) => {
          setIdAgente(response.data.id);
          setNome(response.data.nome);
          setContato(response.data.contato);
        })
        .catch((error) => {
          notifyError("Erro ao carregar os dados do agente de integração.");
        });
    }
  }, [state]);

  function salvar() {
    let agenteRequest = {
      nome: nome,
      contato: contato,
    };

    if (idAgente != null) {
      // Alteração
      axios
        .put("http://localhost:8080/api/agentes-integracao/" + idAgente, agenteRequest)
        .then(() => {
          notifySuccess("Agente de integração alterado com sucesso.");
          navigate(`/list-agentes`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao alterar o agente de integração.");
          }
        });
    } else {
      // Cadastro
      axios
        .post("http://localhost:8080/api/agentes-integracao", agenteRequest)
        .then(() => {
          notifySuccess("Agente de integração cadastrado com sucesso.");
          navigate(`/list-agentes`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao cadastrar o agente de integração.");
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"agentes"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idAgente === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Agente de Integração &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idAgente !== undefined && (
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
