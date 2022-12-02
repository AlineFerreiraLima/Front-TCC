if(localStorage.getItem('token') == null){
    window.location.href = "../HTML/auth_nao_autorizado.html";
}

function logoff(){
    localStorage.removeItem('token')
    window.location.href = "../HTML/listagem_eventos.html";
                
}