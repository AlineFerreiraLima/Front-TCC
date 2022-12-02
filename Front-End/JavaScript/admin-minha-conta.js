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
         Inome.value = responseJSON.nome;
         Icpf.value = responseJSON.cpf;
         Iemail.value = responseJSON.email;
      })
    })
};
conta();


//Função para adicinar mascara para o campo CPF
function mascara(i) {

    var v = i.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}


//Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formularioCadastro = document.getElementById("Cadastrar_organizador");
const formularioLogin = document.getElementById("loginUser");
const formularioEsqueceuSenha = document.getElementById("EsqueceuSenha");
const Itipo_pessoa = document.getElementById("tipo_pessoa");
const Inome_cadastrar = document.getElementById("nome_cadastro");
const Icpf_cadastrar = document.getElementById("cpf_cadastro");
const Iemail_cadastrar = document.getElementById("email_cadastro");
const Isenha_cadastrar = document.getElementById("senha_cadastro");
const Iemail_recuperar = document.getElementById("email_recuperar");

const formulario_editar_conta = document.getElementById("editar_conta");
const formulario_chama_editar = document.getElementById("chama_editar");

let senha_cad;
let tipo_fk_cad;



//Função para cadastrar um novo usuario na base de dados
function cadastrar() {
    fetch("http://localhost:8081/pessoas/criar",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                tipo_fk: Itipo_pessoa.value,
                nome: Inome_cadastrar.value,
                cpf: Icpf_cadastrar.value,
                email: Iemail_cadastrar.value,
                senha: Isenha_cadastrar.value
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })

};

function limparCadastro() {
    Itipo_pessoa.value = "";
    Inome.value = "";
    Icpf.value = "";
    Iemail.value = "";
    Isenha.value = "";
}


formularioCadastro.addEventListener('click', function (event) {
    event.preventDefault();

    cadastrar();
    limparCadastro();
});



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
}

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

        console.log(senha_user)
        if(senha_user == IsenhaAtual.value){
            console.log("entrou no if")
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
                    senha: InovaSenha.value,
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
