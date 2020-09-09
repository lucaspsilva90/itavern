var idGrupo;
var dataInicial;
var dataAlterada;
var cepInicial;
var cepAlterado;
var numEndereco;
var tag;


setTimeout(()=>{
    //mascara de data pro campo inicioReuniao
    $("#inicio").mask("99/99/9999");
    //mascara para o campo cep
    $("#cep-create").mask('99999-999');
    $("#cep-edit").mask('99999-999');
})

//função para marcar os dias de reunião
const colocaCheck = (tag) =>{
    let p = document.querySelector(`${tag}`).querySelector("p").innerText;
    let inputs =  document.querySelector(`${tag}`).querySelector(".opcoes").querySelectorAll('input');
    let lista = p.split(',');
    for(let y = 0; y < lista.length; y++){
        for(let x = 0; x < inputs.length; x++){
            if(inputs[x].id == lista[y]){
                inputs[x].setAttribute('checked','checked');
            }
        }
    }
}
//função que deleta um grupo
const deletaGrupo = (id) =>{
    return fetch(`/grupos/${id}/delete?_method=DELETE`,{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify({id})
    })
}
//função que remove o article do grupo excluído
const removeArticle = (id)=>{
    document.getElementById(`${id}`).remove();
    return true;
}

//adicionando um evento que captura o id do grupo selecionado
document.querySelectorAll('.deletar').forEach(botao=>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        idGrupo = evento.composedPath()[2].id;
    })
})
// adicionando evento que confirma a exclusão de um grupo
document.getElementById("confirma").addEventListener('click', async (evento)=>{
    evento.preventDefault();
    await deletaGrupo(idGrupo).then(response =>{
        if(response.status == 200){
            removeArticle(idGrupo);
            return idGrupo = null;
        }
    })
})
// adicionando evento que abre o popup do grupo a ser editado
document.querySelectorAll('.edit').forEach(botao =>{
    botao.addEventListener("click", (event)=>{
        event.preventDefault();
        tag = event.composedPath()[0].dataset.target;
        let valueCep = document.querySelector(`${tag}`).querySelector('#cep-edit').value;
        colocaCheck(tag);
        setPopup(tag ,valueCep);
    })
})
// adicionando evento que pega a data que veio do banco
document.querySelectorAll('.inicio-edit').forEach(inpInicio =>{
    inpInicio.addEventListener('focus', evento =>{
        dataInicial = inpInicio.value;
        $(inpInicio).mask("99/99/9999");
    })
})
// adiciona evento que determina o valor da data
document.querySelectorAll('.inicio-edit').forEach(inpInicio =>{
    inpInicio.addEventListener('blur', evento =>{
        dataAlterada = inpInicio.value;
        if(dataAlterada != ""){
            inpInicio.value = dataAlterada;
        }else{
            inpInicio.value = dataInicial;
        }
    })
})
// adicionando evento que pega o cep que veio do banco
document.querySelectorAll('.cep-edit').forEach(impCep =>{
    impCep.addEventListener('click', evento =>{
        cepInicial = impCep.value;
        numEndereco = document.querySelector(`${tag}`).querySelector('#numero').value;
        impCep.value = '';
        document.querySelector(`${tag}`).querySelector('#endereco').value = "";
        document.querySelector(`${tag}`).querySelector('#numero').value = "";
        document.querySelector(`${tag}`).querySelector('#cidade').value = "";
        $(impCep).mask('99999-999');
    })
})
// adiciona evento que determina o valor do cep
document.querySelectorAll('.cep-edit').forEach(inpCep =>{
    inpCep.addEventListener('blur', evento =>{
        cepAlterado = inpCep.value;
        if(cepAlterado != ""){
            inpCep.value = cepAlterado;
        }else{
            inpCep.value = cepInicial;
            document.querySelector(`${tag}`).querySelector('#numero').value = numEndereco;
        }
        setPopup(tag, inpCep.value);
    })
})

document.querySelectorAll('.duracao-edit').forEach(inpDuracao =>{
    inpDuracao.addEventListener('focus', evento =>{
        $(inpDuracao).mask("0:00");
    })
})

document.querySelectorAll('.numero-edit').forEach(inpNum =>{
    inpNum.addEventListener('focus', evento =>{
        $(inpNum).mask("00000");
    })
})

document.querySelectorAll('.jog-edit').forEach(inpJog =>{
    inpJog.addEventListener('focus', evento =>{
        $(inpJog).mask("00");
    })
})

//verifica se o usuario carregou algum grupo para editar
let lista = document.querySelector('#invi4').innerText;
if(lista == 0){
    document.querySelector('#semGrupo').classList.remove('invi');
}
