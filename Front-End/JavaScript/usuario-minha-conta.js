//Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formularioMinhaConta = document.getElementById("minhaConta");
const Inome = document.getElementById("nome");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Icurso = document.getElementById("curso");
const Isenha = document.getElementById("senha");
const IconfirmaSenha = document.getElementById("confirmaSenha");

const formularioEditarConta = document.getElementById("editar_conta");
const InomeConta = document.getElementById("nome_conta");
const IcpfConta = document.getElementById("cpf_conta");
const IemailConta = document.getElementById("email_conta");
const IcursoConta = document.getElementById("curso_conta");

const formularioAlterarSenha = document.getElementById("alterar_senha");
const IsenhaAtual = document.getElementById("senha_atual");
const InovaSenha = document.getElementById("nova_senha");
const IconfirmarSenha = document.getElementById("confirma_senha");


// const logoffBtn = document.getElementById("logoff-btn");
// const logoffBtnMobile = document.getElementById("logoff-btn-mobile");

let indice = localStorage.getItem("indice");
console.log(indice)
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
         Inome.value = responseJSON[indice].nome;
         Icpf.value = responseJSON[indice].cpf;
         Iemail.value = responseJSON[indice].email;
      })
};
conta();
