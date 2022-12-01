
//Acessando os campos input, pegando os valores referente aos id e salvando em variaveis
const formularioCadastro = document.getElementById("criar_eventos");
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




//Função para cadastrar um novo usuario na base de dados
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


formularioCadastro.addEventListener('click', function (event) {
    console.log("entrou")
    event.preventDefault();
    cadastrar();
    limparCadastro();
});
