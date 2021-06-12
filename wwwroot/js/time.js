const uri = 'api/Times';
let times = [];
var criarModal = new bootstrap.Modal(document.getElementById('criarModal'));
var editarModal = new bootstrap.Modal(document.getElementById('EditarModal'));

//Exibir times
function getTimes() {
    fetch(uri)
    .then(response => response.json())
    .then(times => mostraTimes(times))
    .catch(error => console.error('Error ao buscar times.', error));
}

function displayCount(timeCount) {
  const name = (timeCount === 1) ? 'time' : 'times';

  document.getElementById('counter').innerText = `${timeCount} ${name}`;
}

function mostraTimes(listaTimes) {
    const tBody = document.getElementById('times');
    tBody.innerHTML = '';
  
    displayCount(listaTimes.length);

    const button = document.createElement('button');
  
    listaTimes.forEach(time => {
    
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.setAttribute('onclick', `displayEditForm(${time.id})`);
        editButton.setAttribute('class', `btn btn-secondary`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Excluir';
        deleteButton.setAttribute('onclick', `deleteTime(${time.id})`);
        deleteButton.setAttribute('class', `btn btn-secondary`);
    
        let tr = tBody.insertRow();
    
        let td1 = tr.insertCell();
        let textNode1 = document.createTextNode(time.nome);
        td1.appendChild(textNode1);
    
        let td2 = tr.insertCell();
        let textNode2 = document.createTextNode(time.abrev);
        td2.appendChild(textNode2);
    
        let td3 = tr.insertCell();
        let textNode3 = document.createTextNode(time.cidade);
        td3.appendChild(textNode3);
    
        let td4 = tr.insertCell();
        td4.appendChild(editButton);
        td4.setAttribute('class', `min`);
    
        let td5 = tr.insertCell();
        td5.appendChild(deleteButton);
        td5.setAttribute('class', `min`);
    });

    times = listaTimes;
}

//Cadastrar time
function addTime() {
    const nome = document.getElementById('add-nome');
    const abrev = document.getElementById('add-abrev');
    const cidade = document.getElementById('add-cidade');

    const time = {
        nome: nome.value.trim(),
        abrev: abrev.value.trim(),
        cidade: cidade.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(time)
    })
    .then(response => response.json())
    .then(() => {
        getTimes();
        nome.value = '';
        abrev.value = '';
        cidade.value = '';
    })
    .catch(error => console.error('Erro ao cadastrar time.', error));

    
    criarModal.hide();
    return false;
}

//Editar time
function displayEditForm(id) {

    editarModal.show();

    const time = times.find(time => time.id === id);
    
    document.getElementById('edit-id').value = time.id;
    document.getElementById('edit-nome').value = time.nome;
    document.getElementById('edit-abrev').value = time.abrev;
    document.getElementById('edit-cidade').value = time.cidade;
}

function updateTime() {
    const timeId = document.getElementById('edit-id').value;
    const time = {
      id: parseInt(timeId, 10),
      nome: document.getElementById('edit-nome').value.trim(),
      abrev: document.getElementById('edit-abrev').value.trim(),
      cidade: document.getElementById('edit-cidade').value.trim()
    };
  
    fetch(`${uri}/${timeId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(time)
    })
    .then(() => getTimes())
    .catch(error => console.error('Erro ao editar time.', error));
    
    editarModal.hide();

    return false;
}

//Excluir time
function deleteTime(id) {
    fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => getTimes())
    .catch(error => console.error('Erro ao tentar deletar time.', error));
}