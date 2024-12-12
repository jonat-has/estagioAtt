
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormOrientadores() {
  const { state } = useLocation();

  const createOrientador = useMutation(api.orientador.create);
  const updateOrientador = useMutation(api.orientador.update);

  const [idOrientador, setIdOrientador] = useState(null);

  const [nome, setNome] = useState("");
  const [departamento, setDepartamento] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (state !== null) {
      setIdOrientador(state._id);
      setNome(state.nome);
      setDepartamento(state.departamento);
    }
  }, [state]);

  async function salvar() {
    if (idOrientador !== null) {
      // Alteração:
      await updateOrientador({
        id: idOrientador,
        nome: nome,
        departamento: departamento,

      }).then((response) => {
        notifySuccess("Orientador alterado com sucesso.");
        navigate(`/list-orientadores`);
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao alterar o orientador.");
        }
      });
    } else {
      // Cadastro:

      await createOrientador({
        nome: nome,
        departamento: departamento
      })
      .then((response) => {
        notifySuccess("Orientador cadastrado com sucesso.");
        navigate(`/list-orientadores`);
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao cadastrar o orientador.");
        }
      })
    }
  }

  return (
    <div>
      <MenuSistema tela="orientadores" />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idOrientador === null && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Orientador &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idOrientador !== null && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Orientador &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
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
                label="Departamento"
                maxLength="100"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                label="Voltar"
                circular
                color="orange"
                icon="reply"
                as={Link}
                to="/list-orientadores"
              />

              <Button
                label="Salvar"
                circular
                color="blue"
                icon="save"
                floated="right"
                onClick={() => salvar()}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
