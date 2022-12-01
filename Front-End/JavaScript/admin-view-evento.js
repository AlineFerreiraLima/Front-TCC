
let id = localStorage.getItem("id");
console.log(id)

//Recebe o conteudo do banco de dados atraves da URL

fetch(`http://localhost:8081/eventos/buscar/${id}`,
   {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      method: "GET"
   })
   .then(response => {
      if (!response.ok) {
         console.log("Ocorreu um erro " + response.status)
      }
      console.log("Entrou na dois");

      return response.json()
    
   })
   .then(json => {
      //Acessando o Array do Objeto JSON vindo da URL, no laço forEach ele está fazendo a leitura dos dados contidos no Array e populando os cards. 

         const main = document.querySelector(".main");

         //Criando o card
         const card = document.createElement('div');
         card.classList = 'card';


         let data_formatada = json.data;
         data_formatada = data_formatada.replace(/[T].{1,}/gm, '');
         data_formatada = data_formatada.split('-');
         data_formatada = `${data_formatada[2]}/${data_formatada[1]}/${data_formatada[0]}`

         const eventoCard = `
                     <img class="image card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                     alt="Capa Evento ADS" 
                     src="${json.file_name}" data-holder-rendered="true">
                     <div class="textCard card-body"> 
                         <p>Título: ${json.nome}</p>                        
                         <p>Organizador: ${json.organizador}</p>                    
                         <p>Palestrante: ${json.palestrante}</p>                    
                         <p>Curso: ${json.curso_fk}</p>                    
                         <p>Data: ${data_formatada}</p>                                              
                         <p>Horário: ${json.hora}</p>                   
                         <p>Carga Horária: ${json.carga_horaria}</p>                    
                         <p>Capacidade Máxima: ${json.capacidade_maxima}</p>                      
                         <p>Descrição: ${json.descricao}</p>                 
                     </div>  
            <div class="alinhamentoBotao">
                <a href="./admin_galeria.html"  class="botoesEvento btn btn-primary" >Galeria</a>  
                <button class="botoesEvento btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalRelatorios" >Relatórios</button>     
                <a href="./admin_editar_evento.html"  class="botoesEvento btn btn-primary" id="${id}" >Editar</a>  
                <button class="botoesEvento btn btn-primary" >Excluir</button>   
            </div>
        `;
    
        card.innerHTML += eventoCard;
        main.appendChild(card)
    });
    
    

    
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
const Isenha = document.getElementById("senha");
const IconfirmaSenha = document.getElementById("confirmaSenha");

// Função para validar se com campos de senha e confirma senha são iguais
function validacao(item) {
    item.setCustomValidity('');
    item.checkValidity();

    if (item == IconfirmaSenha) {
        if (item.value === Isenha.value) {
            item.setCustomValidity('')
        } else {
            item.setCustomValidity("As senhas digitadas não são iguais");
        };

    }
}
Isenha.addEventListener('input', function () { validacao(senha) });
//Função para validar a força da senha digitada pelo usuario
function forca_senha() {
    var senha_real_time = document.getElementById('senha').value
    var forca = 0;
    if ((senha_real_time.length >= 4) && (senha_real_time.length <= 7)) {
        forca = forca + 10;
    } else if (senha_real_time.length > 7) {
        forca = forca + 25;
    }

    if ((senha_real_time.length >= 5) && (senha_real_time.match(/[a-z]+/))) {
        forca = forca + 10;
    }

    if ((senha_real_time.length >= 6) && (senha_real_time.match(/[A-Z]+/))) {
        forca = forca + 20;
    }
    if ((senha_real_time.length >= 7) && (senha_real_time.match(/[@#$%&;*]+/))) {
        forca = forca + 25;
    }

    mostrar_forca(forca);
}
function mostrar_forca(forca) {
    if (forca < 30) {
        document.getElementById("erro_senha_forca").innerHTML = "<span style='color: #FF0000'>Fraca</span>";
    } else if ((forca >= 30) && (forca < 50)) {
        document.getElementById("erro_senha_forca").innerHTML = "<span style='color: #FFD700'>Média</span>";
    } else if ((forca >= 50) && (forca < 70)) {
        document.getElementById("erro_senha_forca").innerHTML = "<span style='color: #7FFF00'>Forte</span>";
    }
}

//Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formularioCadastro = document.getElementById("CadastroOrg");
const formularioLogin = document.getElementById("loginUser");
const formularioEsqueceuSenha = document.getElementById("EsqueceuSenha");
const Inome = document.getElementById("nome");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Itipo_pessoa = document.getElementById("tipo_pessoa");
const Iemail_login = document.getElementById("email_login");
const Isenha_login = document.getElementById("senha_login");
const Iemail_recuperar = document.getElementById("email_recuperar");



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
                nome: Inome.value,
                cpf: Icpf.value,
                email: Iemail.value,
                senha: Isenha.value
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
    IconfirmaSenha.value = "";
}


formularioCadastro.addEventListener('submit', function (event) {
    event.preventDefault();

    cadastrar();
    limparCadastro();
});
