//Aprender a chamar uma URL pelo JavaScript
//1ª Chamar API
//2º "Traduzir" a resposta da API
//3º Tralhar com os dados da API

//AJAX => ANTIGA E NÃO DEVE SER USADA EM CODIGOS NOVOS
//FETCH => 2015+ OK
//AXIOS => mais moderno, porém depende de uma biblioteca externa
let respostaApi;
let dadosApi;
const cep = document.querySelector("#cep")
const rua = document.querySelector("#rua")
const estado = document.querySelector("#uf")
const bairro = document.querySelector("#bairro")
const cidade = document.querySelector("#cidade")
const complemento = document.querySelector("#comp")
const rodopiao = document.querySelector(".loader")

const todoForm = [cep, rua, bairro, uf, cidade, complemento];
//Método do fetch para ler os dados da API
 function buscaCep(cep){
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
.then((resposta) => {
    desabilitarForms()
    console.log(resposta)

    rodopiao.style.display = "block"
    return resposta.json()
})

.then(dados => {
    dadosApi = dados;
    setTimeout(() => {
        habilitarForms()
        preencherForms(dadosApi)
        rodopiao.style.display = "none"
    }, 5000)
    ;
    });
}

function preencherForms(dadosApi){
    rua.value = dadosApi.logradouro;
    estado.value = dadosApi.uf;
    cidade.value = dadosApi.localidade;
    bairro.value = dadosApi.bairro;
    complemento.value = dadosApi.complemento;

}

cep.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Enter"){
        buscaCep(cep.value)
    }
})

function desabilitarForms(){
    for (const input of todoForm){
        input.disabled = true;
    }
}

function habilitarForms(){
    for (const input of todoForm){
        input.disabled = false;
    }
}

