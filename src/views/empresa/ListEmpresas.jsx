import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

export default function ListEmpresas() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios
      .get("http://localhost:8080/api/empresas-concedentes")
      .then((response) => {
        setLista(response.data);
      })
      .catch((error) => {
        notifyError("Erro ao carregar a lista de empresas.");
      });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/empresas-concedentes/" + idRemover)
      .then(() => {
        notifySuccess("Empresa concedente removida com sucesso.");
        carregarLista(); // Recarrega a lista após exclusão
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao remover a empresa concedente.");
        }
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"empresas"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Empresas Concedentes </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-empresas"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CNPJ</Table.HeaderCell>
                  <Table.HeaderCell>Endereço</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Telefone</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((empresa) => (
                  <Table.Row key={empresa.id}>
                    <Table.Cell>{empresa.nome}</Table.Cell>
                    <Table.Cell>{empresa.cnpj}</Table.Cell>
                    <Table.Cell>{empresa.endereco}</Table.Cell>
                    <Table.Cell>{empresa.email}</Table.Cell>
                    <Table.Cell>{empresa.telefone}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados desta empresa"
                        icon
                      >
                        <Link
                          to="/form-empresas"
                          state={{ id: empresa.id }}
                          style={{ color: "green" }}
                        >
                          <Icon name="edit" />
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover esta empresa"
                        icon
                        onClick={() => confirmaRemover(empresa.id)}
                      >
                        <Icon name="trash" />
                      </Button>
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
          <div style={{ marginTop: "5%" }}> Tem certeza que deseja remover esse registro? </div>
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
