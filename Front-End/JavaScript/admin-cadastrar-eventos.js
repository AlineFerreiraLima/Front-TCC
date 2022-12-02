
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
const formulario_cadastrar_organizador = document.getElementById("CadastroOrg");
const formularioEsqueceuSenha = document.getElementById("EsqueceuSenha");
const Inome = document.getElementById("nome");
const Icpf = document.getElementById("cpf");
const Iemail = document.getElementById("email");
const Itipo_pessoa = document.getElementById("tipo_pessoa");
const Iemail_recuperar = document.getElementById("email_recuperar");



//Função para cadastrar um novo usuario na base de dados
function cadastrar_organizador() {
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

function limpar_cadastro_organizador() {
    Itipo_pessoa.value = "";
    Inome.value = "";
    Icpf.value = "";
    Iemail.value = "";
    Isenha.value = "";
    IconfirmaSenha.value = "";
}


formularioCadastro.addEventListener('submit', function (event) {
    event.preventDefault();

    cadastrar_organizador();
    limpar_cadastro_organizador();
});


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