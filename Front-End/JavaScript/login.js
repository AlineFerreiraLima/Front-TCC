const formulario_login = document.getElementById("loginUser");

function login(){
    let Iemail = document.getElementById("email_login");
    let Isenha = document.getElementById("senha_login");
    let msgErro = document.getElementById("msgErro");
   
    let lista_usuarios = [];
    let userValida = {
        email: '',
        senha: '',
        tipo_fk: '',
    }


    fetch('http://localhost:8081/pessoas/lista',
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
   // Acessando o Array do Objeto JSON vindo da URL, no laço forEach ele está fazendo a leitura dos dados contidos no Array e populando os cards. 
        json.forEach((element, i) => {  
            lista_usuarios[i] = {
                nome: json[i].nome,
                cpf: json[i].cpf,
                email: json[i].email,
                senha: json[i].senha,
                tipo_fk: json[i].tipo_fk
            }

        });
        console.log(lista_usuarios)
        lista_usuarios.forEach((element, i) => {
            
            if(Iemail.value == lista_usuarios[i].email && Isenha.value == lista_usuarios[i].senha){
            
                userValida = {
                    email: lista_usuarios[i].email,
                    senha: lista_usuarios[i].senha,
                    tipo_fk: lista_usuarios[i].tipo_fk
                }        
            }        
        });
        
        if(Iemail.value == userValida.email && Isenha.value == userValida.senha){
            if(userValida.tipo_fk != 1){
                window.location.href = "../HTML/usuario_listagem_eventos.html";
                let mathRandom = Math.random().toString(16).substr(2)
                let token = mathRandom + mathRandom
                
                localStorage.setItem('token', token)
            }
            else{
                window.location.href = "../HTML/admin_listagem_eventos.html";
                let mathRandom = Math.random().toString(16).substr(2)
                let token = mathRandom + mathRandom
                
                localStorage.setItem('token', token)
            }
           
        } else{
            Iemail.setAttribute('style', 'border-color: red')
            Isenha.setAttribute('style', 'color: red')
            msgErro.setAttribute('style', 'display: block')
            msgErro.innerHTML = 'Usuário ou senha incorretos'
            Iemail.focus()

        }
    });

    
    
}

formulario_login.addEventListener('submit', function (event) {
    event.preventDefault();

    login();
});

