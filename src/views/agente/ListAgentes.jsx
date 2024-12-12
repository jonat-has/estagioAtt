
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ListAgentes() {
  
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  const getAgente = useQuery(api.agente.get)
  const removeAgente = useMutation(api.agente.remove)

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    setOpenModal(false)
    await removeAgente({
      id: idRemover
    })
  }

  return (
    <div>
      <MenuSistema tela={"agentes"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Agentes de Integração </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-agentes"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Contato</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {getAgente?.map((agente) => (
                  <Table.Row key={agente._id}>
                    <Table.Cell>{agente.nome}</Table.Cell>
                    <Table.Cell>{agente.contato}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste agente"
                        icon
                      >
                        <Link
                          to="/form-agentes"
                          state={ agente }
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
                        title="Clique aqui para remover este agente"
                        icon
                        onClick={() => confirmaRemover(agente._id)}
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
