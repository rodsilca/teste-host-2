//import firebaseApp from './init/firebase-init.js';
import { initFirebase } from './init/firebase-init.js';

const app = await initFirebase(); // aguarda o app ser inicializado

// agora você pode usar o `app` normalmente
console.log("Firebase app iniciado:", app);


var db = firebase.database();
var refTemperatura = db.ref("sensor/temperatura/");
var refUmidade = db.ref("sensor/umidade/");
var refHistorico = db.ref("historico/");

const refUltimasUmidades = db.ref("sensor/umidade/").orderByKey().limitToLast(5);

refTemperatura.on("value", (snapshot) => {
    // ... seu código existente aqui ...
    const data = snapshot.val();
    if (data) {
        const chaves = Object.keys(data);
        const ultimaChave = chaves[chaves.length - 1];
        const ultimoValor = data[ultimaChave];
        document.getElementById("saidaTemperatura").textContent = ultimoValor;
    }
});

refUmidade.on("value", (snapshot) => {
    // ... seu código existente aqui ...
    const data = snapshot.val();
    if (data) {
        const chaves = Object.keys(data);
        const ultimaChave = chaves[chaves.length - 1];
        const ultimoValor = data[ultimaChave];
        document.getElementById("saidaUmidade").textContent = ultimoValor;
    }
});

refHistorico.on("value", (snapshot) => {
    const data = snapshot.val();
    const numeros = Object.keys(data);
    const ultimaChave = numeros[numeros.length -1];
    const ultimoValor = data[ultimaChave];

    console.log("Dados recuperados:", data);
    
    // Split the string into parts
    const partes = ultimoValor.split(' '); // Split by space
    
    // Assuming the format is "Mensagem! DD/MM/YYYY HH:MM:SS"
    // The message could have multiple words, so we'll re-join them.
    const mensagemArray = [];
    let dataString = '';
    let horarioString = '';

    // Iterate through the parts to identify message, date, and time
    for (let i = 0; i < partes.length; i++) {
        if (partes[i].includes('/') && partes[i].length === 10) { // Likely the date (DD/MM/YYYY)
            dataString = partes[i];
        } else if (partes[i].includes(':') && partes[i].length === 8) { // Likely the time (HH:MM:SS)
            horarioString = partes[i];
        } else {
            mensagemArray.push(partes[i]); // Part of the message
        }
    }

    const mensagem = mensagemArray.join(' '); // Re-join message parts

    // Remove the date and time from the message if they were mistakenly included
    const cleanedMessage = mensagem.replace(dataString, '').replace(horarioString, '').trim();

    // Display in HTML
    //document.getElementById("saidaMensagem").textContent = cleanedMessage;
    document.getElementById("saidaData").textContent = dataString;
    document.getElementById("saidaHorario").textContent = horarioString;


    // Exemplo de exibição no HTML
    //document.getElementById("saidaHistorico").textContent = ultimoValor;
    //document.getElementById("saidaHistoricoHora").textContent = ultimoValor;
});

refUltimasUmidades.on("value", (snapshot) => {
    const listaUmidadeElement = document.getElementById("listaUltimasUmidades");
    
    // Limpa a lista anterior
    if (listaUmidadeElement) {
        listaUmidadeElement.innerHTML = ""; 
    } else {
        console.error("Elemento 'listaUltimasUmidades' não encontrado.");
        return;
    }

    if (snapshot.exists()) {
        const umidadesArray = [];
        // O snapshot.forEach() itera sobre os filhos na ordem definida pela query (neste caso, os 5 últimos)
        // Da mais antiga (das 5) para a mais nova.
        snapshot.forEach((childSnapshot) => {
            umidadesArray.push(childSnapshot.val());
        });

        // Se você quiser exibir a mais nova primeiro, pode inverter o array:
        umidadesArray.reverse(); 

        if (umidadesArray.length === 0) {
            const listItem = document.createElement("li");
            listItem.textContent = "Nenhuma leitura de umidade ainda.";
            listaUmidadeElement.appendChild(listItem);
        } else {
            umidadesArray.forEach((umidadeValor) => {
                const listItem = document.createElement("li");
                listItem.textContent = umidadeValor + " %"; // Adicionando unidade
                listaUmidadeElement.appendChild(listItem); // Adiciona na ordem (mais antiga das 5 primeiro)
                // Se quisesse a mais nova primeiro e não inverteu o array, poderia usar:
                // listaUmidadeElement.prepend(listItem); 
            });
        }
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = "Nenhum dado de umidade encontrado.";
        listaUmidadeElement.appendChild(listItem);
    }
}, (error) => {
    console.error("Erro ao buscar últimas umidades:", error);
    const listaUmidadeElement = document.getElementById("listaUltimasUmidades");
    if (listaUmidadeElement) {
        listaUmidadeElement.innerHTML = "<li>Erro ao carregar dados.</li>";
    }
});
  