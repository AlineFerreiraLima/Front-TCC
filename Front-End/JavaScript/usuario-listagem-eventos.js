function listar_eventos(){
    //Recebe o conteudo do banco de dados atraves da URL
    fetch('http://localhost:8081/eventos/lista',
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "GET"

    })
    .then(response => {
        if(!response.ok){
            console.log("Ocorreu um erro " + response.status)
        }
        return response.json();
    })
    .then(json => {
        //Acessando o Array do Objeto JSON vindo da URL, no laço forEach ele está fazendo a leitura dos dados contidos no Array e populando os cards. 
        json.forEach((element, i) => {  

            const main = document.querySelector(".main");
            console.log(main);

            //Criando o card

            const card = document.createElement('div');
            card.classList = 'card';

            let id_param = json[i].id;

            let data_formatada = json[i].data;
            data_formatada = data_formatada.replace(/[T].{1,}/gm, '');
            data_formatada = data_formatada.split('-');
            data_formatada = `${data_formatada[2]}/${data_formatada[1]}/${data_formatada[0]}`


            const eventoCard = `
                <img class="capaEvento card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                alt="Capa Evento ADS" 
                src="${json[i].file_name}" data-holder-rendered="true">
                <div class="textCard card-body"> 
                    <p>Título: ${json[i].nome}</p>                        
                    <p>Organizador: ${json[i].organizador}</p>                    
                    <p>Palestrante: ${json[i].palestrante}</p>                    
                    <p>Curso: ${json[i].curso_fk}</p>                    
                    <p>Data: ${data_formatada}</p>                                              
                    <p>Horário: ${json[i].hora}</p>              
                </div>  
                    <div class="alinhamentoBotao">
                        <a href="../HTML/usuario_view_evento.html" class="BotaoInscricao btn btn-primary" id="${id_param}">Visualizar</a>     
                    </div>
                `;
            
                card.innerHTML += eventoCard;
                main.appendChild(card)
            });
            
        });
    }
    
    listar_eventos();
    
    const main = document.querySelector(".main");
    main.addEventListener("click", (e) => {
        let id
        if (e.target.classList.contains("BotaoInscricao")) {
            id = e.target.id;
        }
        localStorage.setItem("id", id)
    })
    
        
    let filter = document.getElementById("pesquisar");
    filter.addEventListener("keyup", function(){
        var pesquisar = this.value
        var all = document.getElementsByClassName("card");
        let item2 = pesquisar.charAt(0).toUpperCase() + pesquisar.slice(1).toLowerCase();
        console.log(pesquisar);
        for (let i of all){
            let item = i.innerHTML;
            
            if(item.indexOf(item2) == -1){
                i.classList.add("hide");
            }
            else{
                i.classList.remove("hide");
            }
        }
    });
    
      
let botaoPassado = document.getElementById("botao_passado")

botaoPassado.addEventListener("click", function(){
    let all = document.getElementsByClassName("card");
   
    let hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();
    
    hoje = dd + '/' + mm + '/' + yyyy;
    let correctFormat = hoje.replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$2/$1"),
    data_hoje = new Date(correctFormat);
    

    for (let i of all){
        let item = i.children[1].children[4].innerText.substring(6);
        let correctFormat = item.replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$2/$1"),
        data_item = new Date(correctFormat);

        if(data_item.getTime()  == data_hoje.getTime()){
            i.classList.add("hide");
           
        } else  if ( data_item.getTime()  > data_hoje.getTime()) {
            i.classList.add("hide");
        }
        else{
            i.classList.remove("hide");
        }
    }


});

let botaoHoje = document.getElementById("botao_hoje")

botaoHoje.addEventListener("click", function(){
    let all = document.getElementsByClassName("card");
   
    let hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();
    
    hoje = dd + '/' + mm + '/' + yyyy;

    let correctFormat = hoje.replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$2/$1"),
    data_hoje = new Date(correctFormat);
    

    for (let i of all){
        let item = i.children[1].children[4].innerText.substring(6);
        let correctFormat = item.replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$2/$1"),
        data_item = new Date(correctFormat);
        
        if(data_item.getTime() == data_hoje.getTime()){   
                    
            i.classList.remove("hide");
        }
        else{            
            i.classList.add("hide");
        }
    }


});


let botaoFuturo = document.getElementById("botao_futuro")

botaoFuturo.addEventListener("click", function(){
    let all = document.getElementsByClassName("card");
   
    let hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();
    
    hoje = dd + '/' + mm + '/' + yyyy;
    let correctFormat = hoje.replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$2/$1"),
    data_hoje = new Date(correctFormat);
    

    for (let i of all){
        let item = i.children[1].children[4].innerText.substring(6);
        let correctFormat = item.replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$2/$1"),
        data_item = new Date(correctFormat);

        if(data_item.getTime()  == data_hoje.getTime()){
            i.classList.add("hide");
           
        } else  if ( data_item.getTime()  < data_hoje.getTime()) {
            i.classList.add("hide");
        }
        else{
            i.classList.remove("hide");
        }
    }


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
    IconfirmaSenha.addEventListener('input', function () { validacao(confirmaSenha) });
    
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
    
  