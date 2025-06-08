import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

let app, auth, dba;
// função para buscar a configuração do Firebase
async function fetchFirebaseConfig() {
  const res = await fetch('/api/firebase-config');
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ao buscar config: ${res.status} - ${errorText}`);
  }

  return await res.json();
}

// função para inicializar o Firebase
export async function initFirebase() {
  if (app) return { app, auth, dba }; // já inicializado

  const config = await fetchFirebaseConfig();
  app = initializeApp(config);
  auth = getAuth(app);
  dba = getDatabase(app);
  return { app, auth, dba };
}

// const firebaseConfig = {
//         apiKey: "AIzaSyCnZwEWoH2mB7kP22VWpk6Yg0e1wSVM7nY",
//         authDomain: "teste-eps32.firebaseapp.com",
//         databaseURL: "https://teste-eps32-default-rtdb.firebaseio.com",
//         projectId: "teste-eps32",
//         storageBucket: "teste-eps32.firebasestorage.app",
//         messagingSenderId: "305904811162",
//         appId: "1:305904811162:web:8002a05558d53b68267323",
//         measurementId: "G-KSGTZGKCDD"
//     };
// const app = firebase.initializeApp(firebaseConfig);

// export default app;