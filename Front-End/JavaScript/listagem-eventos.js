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
                    <a href="../HTML/view_evento.html" class="BotaoInscricao btn btn-primary" id="${id_param}" >Visualizar</a>     
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
