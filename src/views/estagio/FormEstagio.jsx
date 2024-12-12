
import { React, useEffect, useRef, useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../util/Util";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function FormEstagios() {
  const { state } = useLocation();

  const getEstudantes = useQuery(api.estudante.getEstudantes);
  const getOrientadores = useQuery(api.orientador.get);
  const getEmpresas = useQuery(api.empresa.get);
  const getAgentes = useQuery(api.agente.get);

  const createEstagio = useMutation(api.estagio.create);
  const updateEstagio = useMutation(api.estagio.update)

  const [idEstagio, setIdEstagio] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true); // Configurando 'ativo' como true por padrão
  const [idEstudante, setIdEstudante] = useState();
  const [idOrientador, setIdOrientador] = useState();
  const [idEmpresa, setIdEmpresa] = useState();
  const [idAgente, setIdAgente] = useState();
  const [link, setLink] = useState(null)


  const navigate = useNavigate();

  useEffect(() => {
   if (state !== null) {
      setIdEstagio(state._id);
      setDescricao(state.descricao);
      setIdEstudante(state.estudante);
      setIdOrientador(state.orientador);
      setIdEmpresa(state.empresa);
      setIdAgente(state.agente)
      setLink(state.pdf)
    }

  }, [getAgentes, getEmpresas, getEstudantes, getOrientadores, state]);

 
  const generateUploadUrl = useMutation(api.estagio.generateUploadUrl);
  
    const fileInput = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
  
    async function handleSendPdf() {
      if (!selectedFile) {
        alert("Por favor, selecione um arquivo PDF.");
        return null;
      }
  
      try {
        // Passo 1: Obter uma URL de upload de curta duração
        const postUrl = await generateUploadUrl();
  
        // Passo 2: Enviar o arquivo para a URL
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });
  
        const { storageId } = await result.json();
        return storageId;
      } catch (error) {
        console.error("Erro ao enviar o PDF:", error);
        alert("Ocorreu um erro ao enviar o arquivo. Tente novamente.");
        return null;
      }
    }
  
    async function salvar(event) {
      event.preventDefault();
  
      let storageId = link;
  
      if (selectedFile) {
        // Se o arquivo foi selecionado, envie-o antes de salvar o estágio
        storageId = await handleSendPdf();
        console.log(storageId)
        if (!storageId) return; // Se falhar no envio, não continua
      }
  
      if (idEstagio !== null) {
        // Alteração:
        await updateEstagio({
          id: idEstagio,
          estudante: idEstudante,
          orientador: idOrientador,
          empresa: idEmpresa,
          agente: idAgente,
          descricao: descricao,
          ativo: ativo,
          pdf: storageId, // Atualizando o PDF
        })
        .then((response) => {
          notifySuccess("Estágio alterado com sucesso.");
          navigate(`/list-estagios`);
        })
        .catch((error) => {
          notifyError(error.response ? error.response.data.message : "Erro ao alterar o Estágio.");
        });
      } else {
        // Cadastro:
        await createEstagio({
          estudante: idEstudante,
          orientador: idOrientador,
          empresa: idEmpresa,
          agente: idAgente,
          descricao: descricao,
          ativo: ativo,
          pdf: storageId, // Usando o storageId do arquivo enviado
        })
        .then((response) => {
          notifySuccess("Estágio cadastrado com sucesso.");
          navigate(`/list-estagios`);
        })
        .catch((error) => {
          notifyError(error.response ? error.response.data.message : "Erro ao cadastrar o Estágio.");
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
                  options={getEstudantes?.map((estudante) => ({
                    text: estudante.nome,
                    value: estudante._id, 
                  }))}
                  value={idEstudante}
                  onChange={(e, { value }) => setIdEstudante(value)}
                />

              <Form.Select
                  required
                  fluid
                  label="Orientador"
                  placeholder="Selecione um orientador"
                  options={getOrientadores?.map((orientador) => ({
                    text: orientador.nome,
                    value: orientador._id,
                  }))}
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
                  options={getEmpresas?.map((empresa) => ({
                    text: empresa.nome,
                    value: empresa._id,
                  }))}
                  value={idEmpresa}
                  onChange={(e, { value }) => setIdEmpresa(value)}
                />

                <Form.Select
                  fluid
                  label="Agente de Integração"
                  placeholder="Selecione um agente"
                  options={getAgentes?.map((agente) => ({
                    text: agente.nome,
                    value: agente._id
                  }))}
                  value={idAgente}
                  onChange={(e, { value }) => setIdAgente(value)}
                />
              </Form.Group>
            </Form>

            <input
                type="file"
                accept="application/pdf"
                ref={fileInput}
                onChange={(event) => setSelectedFile(event.target.files[0])}
                disabled={selectedFile !== null}
              />

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
                onClick={(event) => salvar(event)}
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
