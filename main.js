
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields() //limpa os campos
    document.getElementById('modal').classList.remove('active') //remove a classe
}


//pega oq tem no banco de dados e transforma em json e armazena na var db client
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] //se for null, vazio retorna vazio                                                                             CREATE
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))// envia um item pro banco - key, value & transforma em string pq banco n le object            CREATE

// CRUP - create read update delete

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()//não é necessário pois so repete o getLocalStorage com outro nome

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}


//interação com o layout usuário
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '') //seleciona cada campo para limpar
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        } //construiu o Json acima
        const index = document.getElementById('nome').dataset.index
        if (index == 'new'){
            createClient(client)
            updateTable()//atualiza a tabela para quando registrar o cliente atualiza a lista
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
    <button type="button" class="button green" id="edit-${index}">Editar</button>
    <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))//apaga e cria as linhas para não repetir o msm usuário
    //pai da linha pega o filho e remove (remove a si mesmo) 
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)//cria uma linha p/ cada cliente
    // acima está enviando 1- elemento, 2-indice
}

//preenche os dados do editar
const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

//botao editar 
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

//botao deletar
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1) //exclui 
    setLocalStorage(dbClient) //atualiza o banco de dados
}

//descobre qual botão está clicando e em qual cliente
const editDelete = (event) => {
    if (event.target.type == 'button') {
        
        const [action, index] = event.target.id.split('-')//transforma a var em array
        
        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

//eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)