src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/core.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.js"

//Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formularioMinhaConta = document.getElementById("minhaConta");
const Inome = document.getElementById("nome");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Isenha = document.getElementById("senha");
const IconfirmaSenha = document.getElementById("confirmaSenha");

const formularioEditarConta = document.getElementById("editar");
const InomeConta = document.getElementById("nome_editar");
const IcpfConta = document.getElementById("cpf_editar");
const IemailConta = document.getElementById("email_editar");

const formulario_alterar_senha = document.getElementById("alterar_senha");
const IsenhaAtual = document.getElementById("senha_atual");
const InovaSenha = document.getElementById("nova_senha");
const IconfirmarNsenha = document.getElementById("confirma_senha");

// const formularioCadastro = document.getElementById("Cadastrar_organizador");
// const Itipo_pessoa = document.getElementById("tipo_pessoa");
// const Inome_cadastrar = document.getElementById("nome_cadastro");
// const Icpf_cadastrar = document.getElementById("cpf_cadastro");
// const Iemail_cadastrar = document.getElementById("email_cadastro");
// const Isenha_cadastrar = document.getElementById("senha_cadastro");
// const Iemail_recuperar = document.getElementById("email_recuperar");

const formulario_editar_conta = document.getElementById("editar_conta");
const formulario_chama_editar = document.getElementById("chama_editar");


// const logoffBtn = document.getElementById("logoff-btn");
// const logoffBtnMobile = document.getElementById("logoff-btn-mobile");

let indice = localStorage.getItem("indice");
//Função para pegar os dados do usuario na base de dados
function conta() {
    fetch("http://localhost:8081/pessoas/lista",
    {
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: "GET"
     })
     .then((response) => { return response.json() })
     .then((responseJSON) => {
        let cpf = responseJSON[indice].cpf;

        fetch(`http://localhost:8081/pessoas/buscar/${cpf}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then((response) => { return response.json() })
            .then((responseJSON) => {

                Inome.value = responseJSON.nome;
                Icpf.value = responseJSON.cpf;
                Iemail.value = responseJSON.email;
            })
    })
};
conta();

let senha_cad;
let tipo_fk_cad;
function visualizar_conta() {
    fetch("http://localhost:8081/pessoas/lista",
    {
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: "GET"
     })
     .then((response) => {
        return response.json()
     })
     .then((responseJSON) => {
        let cpf = responseJSON[indice].cpf;

        fetch(`http://localhost:8081/pessoas/buscar/${cpf}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJSON) => {
                InomeConta.value = responseJSON.nome;
                IcpfConta.value = responseJSON.cpf;
                IemailConta.value = responseJSON.email;
                senha_cad = responseJSON.senha;
                tipo_fk_cad = responseJSON.tipo_fk;
            })
    })
};

function editar_conta(){
    fetch("http://localhost:8081/pessoas/editar",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                nome: InomeConta.value,
                cpf: IcpfConta.value,
                email: IemailConta.value,
                senha: senha_cad,
                tipo_fk: tipo_fk_cad
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
};

formulario_chama_editar.addEventListener('click', function (event) {
    event.preventDefault();

    visualizar_conta();
});

formulario_editar_conta.addEventListener('click', function (event) {
    event.preventDefault();

    editar_conta();
});



function alterar_senha(){
    fetch("http://localhost:8081/pessoas/lista",
    {
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: "GET"
     })
     .then((response) => {
        return response.json()
     })
     .then((responseJSON) => {
        let senha_user = responseJSON[indice].senha;
        let nome_user =  responseJSON[indice].nome;
        let email_user =  responseJSON[indice].email;
        let cpf_user =  responseJSON[indice].cpf;
        let tipo_fk_user =  responseJSON[indice].tipo_fk;

        //Cria o hash na senha atual (primeiro campo)
        let senha_atual_hash = CryptoJS.MD5(IsenhaAtual.value)
        senha_atual_hash = senha_atual_hash.toString(CryptoJS.enc.Hex)

        if(senha_user == senha_atual_hash){
            console.log("entrou no if")

            //Cria o hash na nova senha (segundo campo)
            let nova_senha_hash = CryptoJS.MD5(InovaSenha.value)
            nova_senha_hash = nova_senha_hash.toString(CryptoJS.enc.Hex)
            
            fetch("http://localhost:8081/pessoas/editar",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                    nome: nome_user,
                    email: email_user,
                    cpf: cpf_user,
                    senha: nova_senha_hash,
                    tipo_fk: tipo_fk_user
                })
            })
            
            .then(function (res) {                 
                msgSucesso.setAttribute('style', 'display: block')
                msgSucesso.innerHTML = 'Senha alterada com sucesso!'
                console.log(res) 
            })
            .catch(function (res) { console.log(res) })
        }else{
            IsenhaAtual.setAttribute('style', 'color: red')
            msgErro.setAttribute('style', 'display: block')
            msgErro.innerHTML = 'Senha incorreta!'
            IsenhaAtual.focus()
        }
      
    })
}

formulario_alterar_senha.addEventListener('click', function (event) {
    event.preventDefault();

    alterar_senha();
});
