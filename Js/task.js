const inputNovaTarefa = document.querySelector('.inputTarefa');
const addTarefa = document.querySelector('#addTarefa');
const listaTarefas = document.querySelector('#listaTarefas');
const janelaEdicao = document.querySelector('#janelaEdicao');
const janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
const janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
const btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
const idTarefaEdicao = document.querySelector('#idTarefaEdicao');
const inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

window.onbeforeunload = function() {
    return "Atualizando a página você perderá as tarefas" 
}


inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        const tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarID(),
        }

        // localStorage.tarefa = JSON.stringify(tarefa);
        // const local = (JSON.parse(localStorage.tarefa))
        // console.log(local)

        if (tarefa.nome == '') {
            alert('Digite uma tarefa!')
        } else {
            adicionarTarefa(tarefa);
        }//Adiconar tarefa ao HTML
    }
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', ''); //Retirar o # do id da tarefa

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById('' + idTarefa + '');

    if (tarefaAtual) {
        let li = criarTagLI(tarefa)
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    }
})


addTarefa.addEventListener('click', (e) => {
    const tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarID(),
    }
    if (tarefa.nome == '') {
        alert('Digite uma tarefa!')
    } else {
        adicionarTarefa(tarefa);
    }//Adicionar tarefa ao HTML também
})

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
})


function gerarID() {
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLI(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = `<input type ='checkbox' class='checkTarefas'>${tarefa.nome}`;


    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btnAcao');
    btnEdit.classList.add('btnEdit');
    btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEdit.setAttribute('onclick', 'editar(' + tarefa.id + ')');


    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btnAcao');
    btnDelete.classList.add('btnDelete');
    btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
    btnDelete.setAttribute('onclick', 'excluir(' + tarefa.id + ')');


    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa) {
    let li = document.getElementById('' + idTarefa + '');
    if (li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!')
    }
}

function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');
    if (confirmacao) {
        let li = document.getElementById('' + idTarefa + '');
        if (li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Documento HTML não encontrado!')
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}

