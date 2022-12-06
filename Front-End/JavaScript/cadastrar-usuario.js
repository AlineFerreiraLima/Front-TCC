
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
const IconfirmaSenha = document.getElementById("confirmar_senha");

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
IconfirmaSenha.addEventListener('input', function () { validacao(confirmar_senha) });

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
const formularioCadastro = document.getElementById("CadastrarUsuario");
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
    let senha_hash = CryptoJS.MD5(Isenha.value)
    senha_hash = senha_hash.toString(CryptoJS.enc.Hex)
    
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
                senha: senha_hash
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
    