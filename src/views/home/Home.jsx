import React from "react";
import { Container, Grid, Image, Button } from 'semantic-ui-react';
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import MenuSistema from "../../MenuSistema";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { notifyError, notifySuccess } from "../util/Util";

export default function Home() {

    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    const isUserEmpty = !localStorage.getItem('user');

    const saveRole = useMutation(api.users.create);
    const updateRole = useMutation(api.users.update);
    const getRole = useMutation(api.users.get)

    const loginViewer = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;

                const role = await getRole({
                    firebaseId: user.uid
                })

                
                if(!role) {
                    await saveRole({
                            firebaseId: user.uid,
                            role: "V"
                          })
                          .then((response) => {
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("role", "V")
                            window.location.reload();
                          })
                 } else {
                    if (role.role === "E") {
                        signOut(auth).then(() => {
                            notifyError("Conta registrada como editor")
                            localStorage.removeItem("user");
                            localStorage.removeItem("role");
                        }).catch((error) => {

                        });
                    } else {
                        notifySuccess("Bem vindo de volta: " + user.displayName);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("role", role.role)
                        window.location.reload();
                    }
                }
                
                
            })
            .catch((error) => {
                console.error("Erro ao logar:", error);
            });
    };
    
    const loginEditor = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;

                const role = await getRole({
                    firebaseId: user.uid
                })
                console.log(role)
                
                if(!role) {
                    await saveRole({
                            firebaseId: user.uid,
                            role: "E"
                          })
                          .then((response) => {
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("role", "E")
                            window.location.reload();
                          })
                 } else {
                    if (role.role === "V") {
                        signOut(auth).then(() => {
                            notifyError("Conta registrada como Visualizador")
                            localStorage.removeItem("user");
                            localStorage.removeItem("role");
                        }).catch((error) => {

                        });
                    } else {
                        notifySuccess("Bem vindo de volta: " + user.displayName);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("role", role.role)
                        window.location.reload();
                    }
                }
                
                
            })
            .catch((error) => {
                console.error("Erro ao logar:", error);
            });
    };


    return (
        <div>
            <MenuSistema tela={'home'} />

            <div style={{ marginTop: '5%' }}>
                <Container>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Image src='/logo-IFPE.png' size='large' />
                            </Grid.Column>
                            <Grid.Column>
                                Bem vindo ao sistema <strong>Estágio IFPE</strong>! <br />
                                Este sistema foi desenvolvido na disciplina de Tópicos Avançados em Engenharia de Software II. <br /> <br />
                                Para acessar o código da <strong>API</strong> do sistema, acesse: <a href='https://github.com/eniobatalha/estagios-api-ejl' target='_blank' rel="noreferrer"> https://github.com/eniobatalha/estagios-api-ejl </a> <br /> <br />
                                Para acessar o código do <strong>Módulo WEB</strong>, acesse: <a href='https://github.com/eniobatalha/estagios-web-ejl' target='_blank' rel="noreferrer"> https://github.com/eniobatalha/estagios-web-ejl </a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>

            {/* Buttons Section */}
            
            <div style={{ marginTop: '5%', textAlign: 'center' }}>
            {isUserEmpty && (
                <>
                    <Button
                        color="green"
                        style={{ backgroundColor: '#68912E', color: '#fff', marginRight: '10px' }}
                        onClick={() => { loginViewer(); }}
                    >
                        <FcGoogle style={{ marginRight: '8px', backgroundColor: '#fff', borderRadius: '33%' }} />
                        Logar como Visualizador
                    </Button>
                    <Button
                        color="red"
                        style={{ backgroundColor: '#EE1C25', color: '#fff' }}
                        onClick={() => { loginEditor(); }}
                    >
                        <FcGoogle style={{ marginRight: '8px', backgroundColor: '#fff', borderRadius: '33%' }} />
                        Logar como Editor
                    </Button>
                </>
            )}
        </div>
            </div>

    );
}
