import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header, Icon, Menu, Modal, Segment, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

export default function ListEstagios() {
  const [listaEstagios, setListaEstagios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [menuFiltro, setMenuFiltro] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [idEstudante, setIdEstudante] = useState("");
  const [listaEstudantes, setListaEstudantes] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios
      .get("http://localhost:8080/api/estagios")
      .then((response) => {
        setListaEstagios(response.data);
      })
      .catch((error) => {
        notifyError("Erro ao carregar a lista de estágios.");
      });

    axios
      .get("http://localhost:8080/api/estudantes")
      .then((response) => {
        const dropDownEstudantes = [{ text: "", value: "" }];
        response.data.map((e) =>
          dropDownEstudantes.push({ text: e.nome, value: e.id })
        );
        setListaEstudantes(dropDownEstudantes);
      })
      .catch((error) => {
        notifyError("Erro ao carregar a lista de estudantes.");
      });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/estagios/" + idRemover)
      .then(() => {
        notifySuccess("Estágio removido com sucesso.");
        carregarLista();
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao remover o estágio.");
        }
      });
    setOpenModal(false);
  }

  function handleMenuFiltro() {
    setMenuFiltro(!menuFiltro);
  }

  function handleChangeDescricao(value) {
    filtrarEstagios(value, idEstudante);
  }

  function handleChangeEstudante(value) {
    filtrarEstagios(descricao, value);
  }

  async function filtrarEstagios(descricaoParam, idEstudanteParam) {
    let formData = new FormData();

    if (descricaoParam !== undefined) {
      setDescricao(descricaoParam);
      formData.append("descricao", descricaoParam);
    }
    if (idEstudanteParam !== undefined) {
      setIdEstudante(idEstudanteParam);
      formData.append("idEstudante", idEstudanteParam);
    }

    await axios
      .post("http://localhost:8080/api/estagios/filtrar", formData)
      .then((response) => {
        setListaEstagios(response.data);
      })
      .catch((error) => {
        notifyError("Erro ao filtrar os estágios.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"estagios"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Estágios </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Menu compact>
              <Menu.Item
                name="menuFiltro"
                active={menuFiltro === true}
                onClick={handleMenuFiltro}
              >
                <Icon name="filter" />
                Filtrar
              </Menu.Item>
            </Menu>

            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-estagios"
            />

            {menuFiltro ? (
              <Segment>
                <Form className="form-filtros">
                  <Form.Input
                    icon="search"
                    value={descricao}
                    onChange={(e) => handleChangeDescricao(e.target.value)}
                    label="Descrição"
                    placeholder="Filtrar por descrição"
                    labelPosition="left"
                    width={6}
                  />

                  <Form.Select
                    placeholder="Filtrar por Estudante"
                    label="Estudante"
                    options={listaEstudantes}
                    value={idEstudante}
                    onChange={(e, { value }) => handleChangeEstudante(value)}
                  />
                </Form>
              </Segment>
            ) : (
              ""
            )}

            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Estudante</Table.HeaderCell>
                  <Table.HeaderCell>Orientador</Table.HeaderCell>
                  <Table.HeaderCell>Empresa</Table.HeaderCell>
                  <Table.HeaderCell>Agente de Integração</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Ações
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {listaEstagios.map((e) => (
                  <Table.Row key={e.id}>
                    <Table.Cell>{e.descricao}</Table.Cell>
                    <Table.Cell>{e.estudante?.nome || "N/A"}</Table.Cell>
                    <Table.Cell>{e.orientador?.nome || "N/A"}</Table.Cell>
                    <Table.Cell>{e.empresaConcedente?.nome || "N/A"}</Table.Cell>
                    <Table.Cell>
                      {e.agenteIntegracao?.nome || "N/A"}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste estágio"
                        icon
                      >
                        <Link
                          to="/form-estagios"
                          state={{ id: e.id }}
                          style={{ color: "green" }}
                        >
                          <Icon name="edit" />
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        icon="trash"
                        color="red"
                        title="Clique aqui para remover este estágio"
                        onClick={() => confirmaRemover(e.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            Tem certeza que deseja remover esse registro?
          </div>
        </Header>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpenModal(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
