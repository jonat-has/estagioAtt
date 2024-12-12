
import { React, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/Util";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function FormEmpresas() {
  const { state } = useLocation();

  const createEmpresa = useMutation(api.empresa.create);
  const updateEmpresa = useMutation(api.empresa.update);

  const [idEmpresa, setIdEmpresa] = useState(null);

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (state !== null) {
      setIdEmpresa(state._id);
      setNome(state.nome);
      setCnpj(state.cnpj);
      setEndereco(state.endereco);
      setEmail(state.email);
      setTelefone(state.telefone)
    }
  }, [state]);

  async function salvar() {
    if (idEmpresa !== null) {
      // Alteração:
      await updateEmpresa({
        id: idEmpresa,
        nome: nome,
        cnpj: cnpj,
        endereco: endereco,
        email: email,
        telefone: telefone

      }).then((response) => {
        notifySuccess("empresa alterado com sucesso.");
        navigate(`/list-empresas`);
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao alterar o empresa.");
        }
      });
    } else {
      // Cadastro:

      await createEmpresa({
        nome: nome,
        cnpj: cnpj,
        endereco: endereco,
        email: email,
        telefone: telefone
      })
      .then((response) => {
        notifySuccess("empresa cadastrado com sucesso.");
        navigate(`/list-empresas`);
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao cadastrar o empresa.");
        }
      })
    }
  }

  return (
    <div>
      <MenuSistema tela={"empresas"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEmpresa === null && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Empresa Concedente &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEmpresa !== null && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Empresa Concedente &nbsp;
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
                  label="CNPJ"
                  width={6}
                >
                  <InputMask
                    required
                    mask="99.999.999/9999-99"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Email"
                  width={10}
                  maxLength="100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Telefone"
                  width={6}
                >
                  <InputMask
                    mask="(99) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </Form.Input>
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
                to="/list-empresas"
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
