import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

export default function ListEstudantes() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios
      .get("http://localhost:8080/api/estudantes")
      .then((response) => {
        setLista(response.data);
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
      .delete("http://localhost:8080/api/estudantes/" + idRemover)
      .then(() => {
        notifySuccess("Estudante removido com sucesso.");
        carregarLista(); // Recarregar a lista após a exclusão
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Erro ao remover o estudante.");
        }
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"estudante"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Estudante </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-estudantes"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Matrícula</Table.HeaderCell>
                  <Table.HeaderCell>Curso</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((estudante) => (
                  <Table.Row key={estudante.id}>
                    <Table.Cell>{estudante.nome}</Table.Cell>
                    <Table.Cell>{estudante.matricula}</Table.Cell>
                    <Table.Cell>{estudante.curso}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste estudante"
                        icon
                      >
                        <Link
                          to="/form-estudantes"
                          state={{ id: estudante.id }}
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
                        title="Clique aqui para remover este estudante"
                        icon
                        onClick={() => confirmaRemover(estudante.id)}
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

      {/* Modal de Confirmação */}
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
