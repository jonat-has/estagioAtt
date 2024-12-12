
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ListEstudantes() {

  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  const getEstudantes = useQuery(api.estudante.getEstudantes)
  const removeEstudante = useMutation(api.estudante.removeEstudante)

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    setOpenModal(false)
    await removeEstudante({
      id: idRemover
    })
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
                {getEstudantes?.map((estudante) => (
                  <Table.Row key={estudante._id}>
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
                          state={ estudante }
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
                        onClick={() => confirmaRemover(estudante._id)}
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
