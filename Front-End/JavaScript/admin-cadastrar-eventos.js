
//Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formulario_cadastro_evento = document.getElementById("criar_eventos");
const Icapa_evento = document.getElementById("img-input");
const Inome_evento = document.getElementById("nome_evento");
const Icodigo_validacao = document.getElementById("codValida");
const Iorganizador = document.getElementById("organizador");
const Icurso = document.getElementById("curso");
const Ipalestrante = document.getElementById("palestrante");
const Idata = document.getElementById("data");
const Ihorario = document.getElementById("horario");
const Icarga_horaria = document.getElementById("cargaHoraria");
const Ilocal = document.getElementById("local");
const Idescricao = document.getElementById("descricao");
const Icapacidade_maxima = document.getElementById("capacidade_maxima");

const Isenha = document.getElementById("senha");
const IconfirmaSenha = document.getElementById("confirmaSenha");

const formulario_cadastrar_organizador = document.getElementById("CadastroOrg");
const formularioEsqueceuSenha = document.getElementById("EsqueceuSenha");
const Inome = document.getElementById("nome");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Itipo_pessoa = document.getElementById("tipo_pessoa");
const Iemail_recuperar = document.getElementById("email_recuperar");




//Função para cadastrar um novo EVENTO na base de dados
function cadastrar() {
    fetch("http://localhost:8081/eventos/criar",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: Inome_evento.value,
                palestrante: Ipalestrante.value,
                organizador: Iorganizador.value,
                descricao: Idescricao.value,
                local_evento: Ilocal.value,
                carga_horaria: Icarga_horaria.value,
                data: Idata.value,
                hora: Ihorario.value,
                codigo_checkin: Icodigo_validacao.value,
                capacidade_maxima: Icapacidade_maxima.value,
                curso_fk: Icurso.value,
                file_name: Icapa_evento.value
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })

};
//Função para limpar os campos de cadastro de evento.
function limparCadastro() {
    Icodigo_validacao.value = "";
    Inome_evento.value = "";
    Ipalestrante.value = "";
    Idescricao.value = "";
    Ilocal.value = "";
    Icarga_horaria.value = "";
    Icapa_evento.value = "";
    Iorganizador.value = "";
    Icapacidade_maxima.value = "";
    Ihorario.value = "";
    Icurso.value = "";
    Idata.value = "";
}

//Função de evento para chamar a execução das funções Cadastrar e limparCadastro
formulario_cadastro_evento.addEventListener('click', function (event) {
    console.log("entrou")
    event.preventDefault();
    cadastrar();
    limparCadastro();
});


//Função destinada ao cadastro de usuarios, utilizada para adicinar mascara para o campo CPF
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


//Função para fazer a visualização da imagem que será cadastrada no evento
function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
        };       
        file.readAsDataURL(this.files[0]);
    }
}
document.getElementById("img-input").addEventListener("change", readImage, false);