const uri = 'api/Jogadores';
let jogadores = [];
let times = [];
var criarModal = new bootstrap.Modal(document.getElementById('criarModal'));
var editarModal = new bootstrap.Modal(document.getElementById('EditarModal'));

function getTimes() {
    fetch('api/Times')
    .then(response => response.json())
    .then(times => mostraTimes(times))
    .catch(error => console.error('Error ao buscar times.', error));
}

function mostraTimes(listTimes) {
    const select = document.getElementById('add-idtime');
    const selectEdit = document.getElementById('edit-idtime');
  
    listTimes.forEach(time => {
        var option = document.createElement('option');
        option.id = "time"+time.id;
        option.value = time.id;
        option.appendChild(document.createTextNode(time.nome));

        select.appendChild(option);
        selectEdit.appendChild(option);
    });

    times = listTimes;
}

//Exibir jogadores
function getJogadores() {
    fetch(uri)
    .then(response => response.json())
    .then(jogadores => mostraJogadores(jogadores))
    .catch(error => console.error('Error ao buscar jogadores.', error));
}

function mostraJogadores(listJogadores) {
    const tBody = document.getElementById('jogadores');
    tBody.innerHTML = '';
  
    const button = document.createElement('button');
  
    listJogadores.forEach(jogador => {
    
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `displayEditForm(${jogador.id})`);
        editButton.setAttribute('class', `btn btn-secondary`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Excluir';
        deleteButton.setAttribute('onclick', `deleteJogador(${jogador.id})`);
        deleteButton.setAttribute('class', `btn btn-secondary`);
    
        let tr = tBody.insertRow();
    
        let td1 = tr.insertCell();
        let textNode1 = document.createTextNode(jogador.nome);
        td1.appendChild(textNode1);
    
        let td2 = tr.insertCell();
        let textNode2 = document.createTextNode(jogador.idade);
        td2.appendChild(textNode2);
    
        let td3 = tr.insertCell();
        let textNode3 = document.createTextNode(jogador.altura);
        td3.appendChild(textNode3);
    
        let td4 = tr.insertCell();
        let textNode4 = document.createTextNode(jogador.peso);
        td4.appendChild(textNode4);
    
        let td5 = tr.insertCell();
        let textNode5 = document.createTextNode(jogador.num_partidas);
        td5.appendChild(textNode5);
    
        let td6 = tr.insertCell();
        let textNode6 = document.createTextNode(jogador.num_gols);
        td6.appendChild(textNode6);
    
        let td7 = tr.insertCell();
        let textNode7 = document.createTextNode(jogador.descricao);
        td7.appendChild(textNode7);

        if(jogador.id_time === 0){
            jogador.id_time = 1;
        }

        const time = times.find(time => time.id === jogador.id_time);

        // console.log("Times: ", times);
        // console.log("Jogador: ", jogador);
        // console.log("Time do jogador: ", jogador.idtime);
        // console.log("Nome do time do jogador: ", time);
    
        let td8 = tr.insertCell();
        let textNode8 = document.createTextNode(time.nome);
        td8.appendChild(textNode8);
    
        let td9 = tr.insertCell();
        td9.appendChild(editButton);
        td9.setAttribute('class', `min`);
    
        let td10 = tr.insertCell();
        td10.appendChild(deleteButton);
        td10.setAttribute('class', `min`);
    });

    jogadores = listJogadores;
    criarModal.hide();
}

//Cadastrar jogador
function addJogador() {
    const nome = document.getElementById('add-nome');
    const idade = document.getElementById('add-idade');
    const altura = document.getElementById('add-altura');
    const peso = document.getElementById('add-peso');
    const num_partidas = document.getElementById('add-partidas');
    const num_gols = document.getElementById('add-gols');
    const descricao = document.getElementById('add-descricao');
    const idtime = document.getElementById('add-idtime');


    const jogador = {
        nome: nome.value.trim(),
        idade: parseInt(idade.value.trim()),
        altura: parseFloat(altura.value.trim()),
        peso: parseFloat(peso.value.trim()),
        num_partidas: parseInt(num_partidas.value.trim()),
        num_gols: parseInt(num_gols.value.trim()),
        descricao: descricao.value.trim(),
        Idtime: parseInt(idtime.value.trim())
    };

    if(jogador.Idtime === null){
        jogador.Idtime = 1;
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jogador)
    })
    .then(response => response.json())
    .then(() => {
        getJogadores();
        nome.value = '';
        idade.value = '';
        altura.value = '';
        peso.value = '';
        num_partidas.value = '';
        num_gols.value = '';
        descricao.value = '';
        idtime.value = '';
    })
    .catch(error => console.error('Erro ao cadastrar jogador.', error));
}

//Editar jogador
function displayEditForm(id) {

    editarModal.show();

    const jogador = jogadores.find(jogador => jogador.id === id);
    
    document.getElementById('edit-id').value = jogador.id;
    document.getElementById('edit-nome').value = jogador.nome;
    document.getElementById('edit-idade').value = jogador.idade;
    document.getElementById('edit-altura').value = jogador.altura;
    document.getElementById('edit-peso').value = jogador.peso;
    document.getElementById('edit-partidas').value = jogador.num_partidas;
    document.getElementById('edit-gols').value = jogador.num_gols;
    document.getElementById('edit-descricao').value = jogador.descricao;
    document.getElementById('edit-idtime').value = jogador.id_time;
    
}

function updateJogador() {
    const jogadorId = document.getElementById('edit-id').value;
    const jogador = {
      id: parseInt(jogadorId),
      nome: document.getElementById('edit-nome').value.trim(),
      idade: parseInt(document.getElementById('edit-idade').value.trim()),
      altura: parseFloat(document.getElementById('edit-altura').value.trim()),
      peso: parseFloat(document.getElementById('edit-peso').value.trim()),
      num_partidas: parseInt(document.getElementById('edit-partidas').value.trim()),
      num_gols: parseInt(document.getElementById('edit-gols').value.trim()),
      descricao: document.getElementById('edit-descricao').value.trim(),
      idtime: parseInt(document.getElementById('edit-idtime').value.trim()),
    };
  
    fetch(`${uri}/${jogadorId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jogador)
    })
    .then(() => getJogadores())
    .catch(error => console.error('Erro ao editar jogador.', error));
  
    editarModal.hide();
  
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

//Excluir jogador
function deleteJogador(id) {
    fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => getJogadores())
    .catch(error => console.error('Erro ao tentar deletar jogador.', error));
}

//Preecher combobox de times
function getTimes() {
    fetch('api/Times')
    .then(response => response.json())
    .then(times => mostraTimes(times))
    .catch(error => console.error('Error ao buscar times.', error));
}