import axios from "axios";
import { React, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormEmpresas() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const { state } = useLocation();
  const [idEmpresa, setIdEmpresa] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/empresas-concedentes/" + state.id)
        .then((response) => {
          setIdEmpresa(response.data.id);
          setNome(response.data.nome);
          setCnpj(response.data.cnpj);
          setEndereco(response.data.endereco);
          setEmail(response.data.email);
          setTelefone(response.data.telefone);
        })
        .catch(() => {
          notifyError("Erro ao carregar os dados da empresa.");
        });
    }
  }, [state]);

  function salvar() {
    let empresaRequest = {
      nome: nome,
      cnpj: cnpj,
      endereco: endereco,
      email: email,
      telefone: telefone,
    };

    if (idEmpresa != null) {
      // Alteração
      axios
        .put("http://localhost:8080/api/empresas-concedentes/" + idEmpresa, empresaRequest)
        .then(() => {
          notifySuccess("Empresa concedente alterada com sucesso.");
          navigate(`/list-empresas`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao alterar a empresa concedente.");
          }
        });
    } else {
      // Cadastro
      axios
        .post("http://localhost:8080/api/empresas-concedentes", empresaRequest)
        .then(() => {
          notifySuccess("Empresa concedente cadastrada com sucesso.");
          navigate(`/list-empresas`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao cadastrar a empresa concedente.");
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"empresas"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEmpresa === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Empresa Concedente &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEmpresa !== undefined && (
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
