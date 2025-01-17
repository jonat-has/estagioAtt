import { Segment } from 'semantic-ui-react';
import './App.css';
import Rotas from './Rotas';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBNXd-9v4umxOw2L4V82u_WnpyQbJBs9WU",
    authDomain: "att-topicos.firebaseapp.com",
    projectId: "att-topicos",
    storageBucket: "att-topicos.firebasestorage.app",
    messagingSenderId: "909672474227",
    appId: "1:909672474227:web:eb45d2bfb22a89d8532c06"
  };
  
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      
      <ToastContainer />
      <Rotas/>

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2024 - Projeto TA em Eng de Soft II - IFPE Jaboatão dos Guararapes - Enio Batalha, Jonathas Gabriel e Lucas Emanuel
        </Segment>
      </div>

    </div>
  );
}

export default App;
