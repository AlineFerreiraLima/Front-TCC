// Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const Ipreview = document.getElementById("preview");
const Iimagem = document.getElementById("imagem");
const Iid_evento = document.getElementById("id_evento");
const Icod_valida = document.getElementById("codValida");
const Ititulo = document.getElementById('titulo');
const Iorganizador = document.getElementById("organizador");
const Icurso = document.getElementById("curso");
const Ipalestrante = document.getElementById("palestrante");
const Idata = document.getElementById("data");
const Ihora = document.getElementById("horario");
const Icarga_horaria = document.getElementById("cargaHoraria");
const Ilocal = document.getElementById("local");
const Idescricao = document.getElementById("descricao");
const formularioEditarEvento = document.getElementById("editar-form");
const Icapacidade_maxima = document.getElementById("capacidade_maxima");
const formularioEditar = document.getElementById("eventos");



let id = localStorage.getItem('id');
// Função para mostrar detalhes do evento selecionado
function evento() {
   fetch(`http://localhost:8081/eventos/buscar/${id}`,
      {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: "GET"
      })
      .then((response) => response.json())
      .then((responseJSON) => {
         // do stuff with responseJSON here...
         console.log(responseJSON);
         let horario = responseJSON.hora,
            matches = horario.toLowerCase().match(/(\d{1,2}):(\d{2})/);
         output = matches[0];

         let data_formatada = responseJSON.data;
         data_formatada = data_formatada.replace(/[T].{1,}/gm, '');
         data_formatada = data_formatada.split('-');
         data_formatada = `${data_formatada[0]}-${data_formatada[1]}-${data_formatada[2]}`

         // console.log(data_formatada);
         console.log(responseJSON);
         Ipreview.src = `../../${responseJSON.file_name}`;
         Iid_evento.value = responseJSON.id;
         Icod_valida.value = responseJSON.codigo_checkin;
         Ititulo.value = responseJSON.nome;
         Iorganizador.value = responseJSON.organizador;
         Icurso.value = responseJSON.curso_fk;
         Ipalestrante.value = responseJSON.palestrante;
         Ihora.value = output;

         Idata.value = data_formatada;
         Icarga_horaria.value = responseJSON.carga_horaria;
         Ilocal.value = responseJSON.local_evento;
         Idescricao.value = responseJSON.descricao;
         Icapacidade_maxima.value = responseJSON.capacidade_maxima;
      })

};
evento();

function editar(){
    fetch("http://localhost:8081/eventos/editar",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                id: Iid_evento.value,
                nome: Ititulo.value,
                palestrante: Ipalestrante.value,
                organizador: Iorganizador.value,
                descricao: Idescricao.value,
                local_evento: Ilocal.value,
                carga_horaria: Icarga_horaria.value,
                data: Idata.value,
                hora: Ihora.value,
                codigo_checkin: Icod_valida.value,
                capacidade_maxima: Icapacidade_maxima.value,
                curso_fk: Icurso.value,
                file_name: Iimagem.value
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}

formularioEditar.addEventListener('click', function (event) {
    console.log("Entrou no editar")
    event.preventDefault();
 
    editar();
 });

// formularioEditarEvento.addEventListener('submit', function (event) {
//    event.preventDefault();

//    // Instanciando um objeto FormData que é o mesmo que o elemento <form>, mas que aceita todos os tipos de métodos HTTP
//    let formData = new FormData();
//    formData.append("codigo_checkin", Icod_valida.value);
//    formData.append("nome", Ititulo.value);
//    formData.append("organizador", Iorganizador.value);
//    formData.append("palestrante", Ipalestrante.value);
//    formData.append("curso_fk", Icurso.value);
//    formData.append("descricao", Idescricao.value);
//    formData.append("local_evento", Ilocal.value);
//    formData.append("carga_horaria", Icarga_horaria.value);
//    formData.append("data", Idata.value);
//    formData.append("hora", Ihora.value);
//    formData.append("file_name", Iimagem.files[0]); // Pega o arquivo e o converte para Base64, que é usado pelo Multer

//    fetch(`http://localhost:5500/evento/${id}`,
//       {
//          method: "PUT",
//          body: formData // Usando o objeto como corpo, sem headers
//       })
//       .then(function (res) { console.log(res) })
//       .catch(function (res) { console.log(res) })
// });

// Função para adicinar mascara para o campo CPF
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

// Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
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

// Função para validar a força da senha digitada pelo usuario
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

// Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formularioCadastro = document.getElementById("CadastroOrg");
const Inome = document.getElementById("nome");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Itipo_pessoa = document.getElementById("tipo_pessoa");

// Função para cadastrar um novo usuario na base de dados
function cadastrar() {
   fetch("http://localhost:5500/pessoa",
      {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: "POST",
         body: JSON.stringify({
            tipo_pessoa: Itipo_pessoa.value,
            nome: Inome.value,
            cpf: Icpf.value,
            email: Iemail.value,
            senha: Isenha.value,
            confirmaSenha: IconfirmaSenha.value
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

function readImage() {
   if (this.files && this.files[0]) {
      var file = new FileReader();
      file.onload = function (e) {
         document.getElementById("preview").src = e.target.result;
      };
      file.readAsDataURL(this.files[0]);
   }
}
document.getElementById("imagem").addEventListener("change", readImage, false);

