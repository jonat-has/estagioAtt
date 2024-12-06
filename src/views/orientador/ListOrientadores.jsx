import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListOrientadores() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios
      .get("http://localhost:8080/api/orientadores")
      .then((response) => {
        setLista(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar a lista de orientadores:", error);
      });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/orientadores/" + idRemover)
      .then(() => {
        setOpenModal(false);
        console.log("Orientador removido com sucesso.");
        carregarLista(); // Recarrega a lista após a exclusão
      })
      .catch((error) => {
        setOpenModal(false);
        console.error("Erro ao remover o orientador:", error);
      });
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
                {lista.length > 0 &&
                  lista.map((orientador) => (
                    <Table.Row key={orientador.id}>
                      <Table.Cell>{orientador.nome}</Table.Cell>
                      <Table.Cell>{orientador.departamento}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste orientador"
                          icon
                        >
                          <Link
                            to="/form-orientadores"
                            state={{ id: orientador.id }}
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
                          title="Clique aqui para remover este orientador"
                          icon
                          onClick={() => confirmaRemover(orientador.id)}
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
