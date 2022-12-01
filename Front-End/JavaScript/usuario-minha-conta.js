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
         Inome.value = responseJSON[5].nome;
         Icpf.value = responseJSON[5].cpf;
         Iemail.value = responseJSON[5].email;
      })
};
conta();

// function editarConta() {
//    fetch("http://localhost:8081/pessoas/editar",
//       {
//          headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//          },
//          method: "PUT",
//          body: JSON.stringify({
//             nome_conta: InomeConta.value,
//             cpf_conta: Icpf.value,
//             email_conta: IemailConta.value,
//             curso_conta: IcursoConta.value
//          })
//       })
//       .then(function (res) { console.log(res) })
//       .catch(function (res) { console.log(res) })
// };

// formularioEditarConta.addEventListener('submit', function (event) {
//    event.preventDefault();

//    editarConta();
// });

// function alterarSenha() {
//    fetch("http://localhost:5500/alterarSenha",
//       {
//          headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//          },
//          method: "PUT",
//          body: JSON.stringify({
//             senha_atual: IsenhaAtual.value,
//             nova_senha: InovaSenha.value,
//             confirma_senha: IconfirmarSenha.value
//          })
//       })
//       .then(function (res) { console.log(res) })
//       .catch(function (res) { console.log(res) })

// };
// formularioAlterarSenha.addEventListener('submit', function (event) {
//    event.preventDefault();

//    alterarSenha();
// });

// logoffBtn.addEventListener("click", async function (e) {
//    e.preventDefault();
//    await fetch("http://localhost:5500/logoff")
//       .then((logoff) => {
//          return logoff.json();
//       })
//       .then((data) => {
//          if (data.logoff) {
//             window.location.href = "../HTML/listagem_eventos.html"
//          } else {
//             console.log(data);
//          }
//       })
// })
// logoffBtnMobile.addEventListener('click', function (e) {
//    fetch("http://localhost:5500/logoff",
//       {
//          headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//          }
//       })
//       .then((data) =>
//          window.location.href = "../HTML/listagem_eventos.html"
//       )
// })