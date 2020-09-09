const inpCepUser = document.getElementById("cepUser");
var cepAtual;
var componetesEndereco = {};

setTimeout(()=>{
    //mascarando cep
    $("#cepUser").mask("99999-999");
    pesquisaCepPerfil(inpCepUser.value)
});

inpCepUser.addEventListener('blur', (evento)=>{
    evento.preventDefault();
    if(inpCepUser.value == ""){
        inpCepUser.value = cepAtual;
        document.getElementById("cidadeUser").value = componetesEndereco.cidade;
        document.getElementById("bairro").value = componetesEndereco.bairro;
        document.getElementById("ruaCasa").value = componetesEndereco.rua;
        document.getElementById("numeroCasa").value = componetesEndereco.numero;
    }
    else{
        document.getElementById("numeroCasa").value = "";
        pesquisaCepPerfil(inpCepUser.value);
    }

})

setTimeout(()=>{
    $("#cepUser").mask("99999-999");
    pesquisaCepPerfil(inpCepUser.value)
});

inpCepUser.addEventListener('click', evento =>{
    cepAtual = inpCepUser.value;
    componetesEndereco.cidade = document.getElementById("cidadeUser").value;
    componetesEndereco.bairro = document.getElementById("bairro").value;
    componetesEndereco.rua = document.getElementById("ruaCasa").value;
    componetesEndereco.numero = document.getElementById("numeroCasa").value;

    inpCepUser.value = "";
    limpaPerfil();
    document.getElementById("numeroCasa").value = "";
})
