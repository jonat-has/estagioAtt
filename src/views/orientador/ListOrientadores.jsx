
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ListOrientadores() {

  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  const getOrientador = useQuery(api.orientador.get)
  const removeOrientador = useMutation(api.orientador.remove)


  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    setOpenModal(false)
    await removeOrientador({
      id: idRemover
    })
  }

  return (
    <div>
      <MenuSistema tela="orientadores" />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Orientadores </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-orientadores"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Departamento</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Ações
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {getOrientador?.map((orientador) => (
                    <Table.Row key={orientador._id}>
                      <Table.Cell>{orientador.nome}</Table.Cell>
                      <Table.Cell>{orientador.departamento}</Table.Cell>
                      <Table.Cell textAlign="center" >
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste orientador"
                          icon
                        >
                          <Link
                            to="/form-orientadores"
                            state={orientador}
                            style={{ color: "green" }}
                          >
                            <Icon name="edit" />
                          </Link>
                        </Button>
                        <Button
                          inverted
                          circular
                          color="red"
                          title="Clique aqui para remover este orientador"
                          icon
                          onClick={() => confirmaRemover(orientador._id)}
                        >
                          <Icon name="trash" />
                        </Button>
                      </div>

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
