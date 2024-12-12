import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Menu,
  Modal,
  Segment,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ListEstagios() {
  const getEstagios = useQuery(api.estagio.get);
  const removeEstagios = useMutation(api.estagio.remove);
  const pdf = useMutation(api.estagio.pdfLink);

  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [descricao, setDescricao] = useState("");
  const [idEstudante, setIdEstudante] = useState("");
  const [menuFiltro, setMenuFiltro] = useState(false);
  const [links, setLinks] = useState({})

  useEffect(() => {
    if (getEstagios) {
      getEstagios.forEach(async (estagio) => {
        const link = await pdf({id: estagio.pdf}); // Chama a função para gerar o link
        setLinks((prevLinks) => ({
          ...prevLinks,
          [estagio._id]: link, // Atualiza o estado com o link correspondente ao id
        }));
      });
    }
  }, [getEstagios, pdf]);
  
  function handleMenuFiltro() {
    setMenuFiltro(!menuFiltro);
  }

  function handleChangeDescricao(value) {
    setDescricao(value);
  }

  function handleChangeEstudante(value) {
    setIdEstudante(value);
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    setOpenModal(false);
    removeEstagios({ id: idRemover });
  }

  function filtrarEstagios(estagios) {
    return estagios.filter((e) => {
      const matchesDescricao = e.descricao
        ?.toLowerCase()
        .includes(descricao.toLowerCase());
      const matchesEstudante = idEstudante
        ? e.estudante_nome?.toLowerCase().includes(idEstudante.toLowerCase())
        : true;
  
      return matchesDescricao && matchesEstudante;
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

                  <Form.Input
                    icon="search"
                    value={idEstudante}
                    onChange={(e) => handleChangeEstudante(e.target.value)}
                    label="Estudante"
                    placeholder="Filtrar por nome do estudante"
                    labelPosition="left"
                    width={6}
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
                  <Table.HeaderCell>Ativo</Table.HeaderCell>
                  <Table.HeaderCell>PDF</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    Ações
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {getEstagios &&
                  filtrarEstagios(getEstagios).map((e) => (
                    <Table.Row key={e.id}>
                      <Table.Cell>{e.descricao}</Table.Cell>
                      <Table.Cell>{e.estudante_nome || "N/A"}</Table.Cell>
                      <Table.Cell>{e.orientador_nome || "N/A"}</Table.Cell>
                      <Table.Cell>{e.empresa_nome || "N/A"}</Table.Cell>
                      <Table.Cell>{e.agente_nome || "N/A"}</Table.Cell>
                      <Table.Cell>{e.ativo ? "Ativo" : "Inativo"}</Table.Cell>
                      <Table.Cell>
                              {links[e._id] ? (
                          <a href={links[e._id]} target="_blank" rel="noopener noreferrer">
                            Visualizar PDF
                          </a>
                        ) : (
                          'Carregando...'
                        )}
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
                            state={ e }
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
                          onClick={() => confirmaRemover(e._id)}
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
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
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
