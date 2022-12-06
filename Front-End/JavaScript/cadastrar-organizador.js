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

const formulario_cadastro = document.getElementById("cadastrar_organizador");
const Isenha_cadastrar = document.getElementById("senha_cadastro");
const Inome_cadastrar = document.getElementById("nome_cadastro");
const Icpf_cadastrar = document.getElementById("cpf_cadastro");
const Iemail_cadastrar = document.getElementById("email_cadastro");

const Itipo = document.getElementById("tipo_pessoa");




//Função para cadastrar um novo usuario na base de dados
function cadastrar() {
    let senha_hash = CryptoJS.MD5(Isenha_cadastrar.value)
    senha_hash = senha_hash.toString(CryptoJS.enc.Hex)
    fetch("http://localhost:8081/pessoas/criar",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                tipo_fk: tipo_pessoa.value,
                nome: Inome_cadastrar.value,
                cpf: Icpf_cadastrar.value,
                email: Iemail_cadastrar.value,
                senha: senha_hash
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })

};

function limparCadastro() {
    tipo_pessoa.value = "";
    Inome_cadastrar.value = "";
    Icpf_cadastrar.value = "";
    Iemail_cadastrar.value = "";
    Isenha_cadastrar.value = "";
}

function valida_form (){
    if(document.getElementById("nome_cadastro").value == ""){
        document.getElementById("nome_cadastro").setAttribute('style', 'border-color: red')
        document.getElementById("nome_cadastro").focus();
        
        return false
        } 
    else if(document.getElementById("cpf_cadastro").value == ""){        
        document.getElementById("cpf_cadastro").setAttribute('style', 'border-color: red')
        document.getElementById("cpf_cadastro").focus();
        return false
    } 
    else if(document.getElementById("email_cadastro").value == ""){
        document.getElementById("email_cadastro").setAttribute('style', 'border-color: red')
        document.getElementById("email_cadastro").focus();
        return false
    } 
    else if(document.getElementById("senha_cadastro").value == ""){
        document.getElementById("senha_cadastro").setAttribute('style', 'border-color: red')
        document.getElementById("senha_cadastro").focus();
        return false
    }else{
                cadastrar();
                limparCadastro();
            
        }
    }


    formulario_cadastro.addEventListener('click', function (event) {
        event.preventDefault();
        valida_form()
    });
    