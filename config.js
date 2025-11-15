// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrGOhFc5i8xNmbOpd25zZ2Su9bsGzGIxc",
  authDomain: "crud-senac.firebaseapp.com",
  projectId: "crud-senac",
  storageBucket: "crud-senac.appspot.com",
  messagingSenderId: "796809747684",
  appId: "1:796809747684",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
