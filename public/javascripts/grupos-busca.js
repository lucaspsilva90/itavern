var idGrupo;

const colocaNoGrupo = (id) =>{
    return fetch('/grupos/addNoGrupo',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id})
    }).then(resul =>{
        if(resul.status == 200){
            return resul.json();
        }
    }).then(data =>{
        return data;
    })
}

const ocultaFiltrados = (lista) =>{
    if(lista.length == 0){
        return document.getElementById('semGrupoBusca').classList.remove('invi');
    }
    document.getElementById('semGrupoBusca').classList.add('invi');
    document.querySelectorAll('.aCard').forEach(single =>{
        let id = single.getAttribute("id");
        id = Number.parseInt(id);
        if(lista.includes(id)){
            single.classList.remove('invi')
        }
        else{
            single.classList.add('invi');
        }
    })
}

const tiraInvi = () =>{
    document.querySelectorAll('.aCard').forEach(item =>{
        item.classList.remove('invi');
    })
}

document.querySelectorAll('.entrar').forEach(botao=>{
    botao.addEventListener('click', evento =>{
        evento.preventDefault();
        idGrupo = evento.composedPath()[2].id;
    })
})

document.getElementById('confirmaEntrada').addEventListener('click', async (evento) =>{
    evento.preventDefault();
    let resul = await colocaNoGrupo(idGrupo);
    document.getElementById(`${idGrupo}`).remove();
    idGrupo = null;
    
})

document.getElementById('numDeGrupos').innerText == 0?
    document.getElementById('semGrupoBusca').classList.remove('invi')
:
    document.getElementById('semGrupoBusca').classList.add('invi');