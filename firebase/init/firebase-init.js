import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// função para buscar a configuração do Firebase
async function fetchFirebaseConfig() {
  const res = await fetch('/api/firebase-config');
  return await res.json();
}

// função para inicializar o Firebase
export async function initFirebase() {
  const config = await fetchFirebaseConfig();
  const app = initializeApp(config);
  return app;
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