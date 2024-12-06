import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormEstudantes() {
  const { state } = useLocation();
  const [idEstudante, setIdEstudante] = useState();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/estudantes/" + state.id)
        .then((response) => {
          setIdEstudante(response.data.id);
          setNome(response.data.nome);
          setMatricula(response.data.matricula);
          setCurso(response.data.curso);
        })
        .catch((error) => {
          notifyError("Erro ao carregar os dados do estudante.");
        });
    }
  }, [state]);

  function salvar() {
    let estudanteRequest = {
      nome: nome,
      matricula: matricula,
      curso: curso,
    };

    if (idEstudante != null) {
      // Alteração:
      axios
        .patch("http://localhost:8080/api/estudantes/" + idEstudante, estudanteRequest)
        .then((response) => {
          notifySuccess("Estudante alterado com sucesso.");
          navigate(`/list-estudantes`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao alterar o estudante.");
          }
        });
    } else {
      // Cadastro:
      axios
        .post("http://localhost:8080/api/estudantes", estudanteRequest)
        .then((response) => {
          notifySuccess("Estudante cadastrado com sucesso.");
          navigate(`/list-estudantes`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao cadastrar o estudante.");
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"estudante"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEstudante === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Estudante &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEstudante != undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Estudante &nbsp;
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
                  label="Matrícula"
                  maxLength="20"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Curso"
                  maxLength="100"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button type="button" inverted circular icon labelPosition="left" color="orange">
                <Icon name="reply" />
                <Link to={"/list-estudantes"}>Voltar</Link>
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
