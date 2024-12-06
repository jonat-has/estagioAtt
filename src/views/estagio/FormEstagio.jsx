import axios from "axios";
import { React, useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/Util";

export default function FormEstagios() {
  const { state } = useLocation();

  const [idEstagio, setIdEstagio] = useState();
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true); // Configurando 'ativo' como true por padrão
  const [idEstudante, setIdEstudante] = useState();
  const [idOrientador, setIdOrientador] = useState();
  const [idEmpresa, setIdEmpresa] = useState();
  const [idAgente, setIdAgente] = useState();

  const [listaEstudantes, setListaEstudantes] = useState([]);
  const [listaOrientadores, setListaOrientadores] = useState([]);
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [listaAgentes, setListaAgentes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/estagios/" + state.id)
        .then((response) => {
          setIdEstagio(response.data.id);
          setDescricao(response.data.descricao);
          setAtivo(response.data.ativo);
          setIdEstudante(response.data.estudante?.id);
          setIdOrientador(response.data.orientador?.id);
          setIdEmpresa(response.data.empresaConcedente?.id);
          setIdAgente(response.data.agenteIntegracao?.id);
        })
        .catch(() => {
          notifyError("Erro ao carregar os dados do estágio.");
        });
    }

    // Carregar listas suspensas
    carregarListas();
  }, [state]);

  function carregarListas() {
    axios.get("http://localhost:8080/api/estudantes").then((response) => {
      const estudantes = response.data.map((e) => ({
        text: `${e.id} - ${e.nome}`,
        value: e.id,
      }));
      setListaEstudantes(estudantes);
    });

    axios.get("http://localhost:8080/api/orientadores").then((response) => {
      const orientadores = response.data.map((o) => ({
        text: `${o.id} - ${o.nome}`,
        value: o.id,
      }));
      setListaOrientadores(orientadores);
    });

    axios.get("http://localhost:8080/api/empresas-concedentes").then((response) => {
      const empresas = response.data.map((e) => ({
        text: `${e.id} - ${e.nome}`,
        value: e.id,
      }));
      setListaEmpresas(empresas);
    });

    axios.get("http://localhost:8080/api/agentes-integracao").then((response) => {
      const agentes = response.data.map((a) => ({
        text: `${a.id} - ${a.nome}`,
        value: a.id,
      }));
      setListaAgentes(agentes);
    });
  }

  function salvar() {
    let estagioRequest = {
      descricao: descricao,
      ativo: ativo,
      idEstudante: idEstudante,
      idOrientador: idOrientador,
      idEmpresaConcedente: idEmpresa,
      idAgenteIntegracao: idAgente,
    };

    if (idEstagio != null) {
      // Alteração
      axios
        .put("http://localhost:8080/api/estagios/" + idEstagio, estagioRequest)
        .then(() => {
          notifySuccess("Estágio alterado com sucesso.");
          navigate(`/list-estagios`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao alterar o estágio.");
          }
        });
    } else {
      // Cadastro
      axios
        .post("http://localhost:8080/api/estagios", estagioRequest)
        .then(() => {
          notifySuccess("Estágio cadastrado com sucesso.");
          navigate(`/list-estagios`);
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.message);
          } else {
            notifyError("Erro ao cadastrar o estágio.");
          }
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"estagios"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEstagio === undefined ? (
            <h2>
              <span style={{ color: "darkgray" }}>
                Estágio &nbsp;
                <Icon name="angle double right" size="small" />
              </span>{" "}
              Cadastro
            </h2>
          ) : (
            <h2>
              <span style={{ color: "darkgray" }}>
                Estágio &nbsp;
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
                  label="Descrição"
                  maxLength="100"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

                <Form.Select
                  required
                  fluid
                  label="Ativo"
                  options={[
                    { text: "Sim", value: true },
                    { text: "Não", value: false },
                  ]}
                  value={ativo}
                  onChange={(e, { value }) => setAtivo(value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  required
                  fluid
                  label="Estudante"
                  placeholder="Selecione um estudante"
                  options={listaEstudantes}
                  value={idEstudante}
                  onChange={(e, { value }) => setIdEstudante(value)}
                />

                <Form.Select
                  required
                  fluid
                  label="Orientador"
                  placeholder="Selecione um orientador"
                  options={listaOrientadores}
                  value={idOrientador}
                  onChange={(e, { value }) => setIdOrientador(value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  required
                  fluid
                  label="Empresa Concedente"
                  placeholder="Selecione uma empresa"
                  options={listaEmpresas}
                  value={idEmpresa}
                  onChange={(e, { value }) => setIdEmpresa(value)}
                />

                <Form.Select
                  fluid
                  label="Agente de Integração"
                  placeholder="Selecione um agente"
                  options={listaAgentes}
                  value={idAgente}
                  onChange={(e, { value }) => setIdAgente(value)}
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
                to="/list-estagios"
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
