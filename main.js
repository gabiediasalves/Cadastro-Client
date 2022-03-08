//'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields() //limpa os campos
    document.getElementById('modal').classList.remove('active') //remove a classe
}


// const tempClient = {
//     nome: "Luan",
//     email: "Luan@gmail.com",
//     celular: "3499541222",
//     cidade: "Sao Paulo"
// }

//pega oq tem no banco de dados e transforma em json e armazena na var db client
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] //se for null, vazio retorna vazio                                                                             CREATE
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))// envia um item pro banco - key, value & transforma em string pq banco n le object            CREATE
// CRUP - create red update delete

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1) //exclui 
    setLocalStorage(dbClient) //atualiza o banco de dados
}

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
        createClient(client)
        closeModal()
    }
}

const updateTable = () => {
    const dbClient = readClient()
    dbClient.forEach(createRow)//cria uma linha p/ cada cliente
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)