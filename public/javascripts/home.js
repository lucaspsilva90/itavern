var idGrupo;
var idCandidato;

const requsitaDados = (id) =>{
    return fetch(`/info/${id}`,{
        method:'GET'
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.infGrupo;
    })
}

const requisitaNotificacoes = (id) =>{
    return fetch(`/notificacoes/${id}`,{
        method:"GET"
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.pedidos;
    })
}

const mudaStatus = (novoStatus) =>{
    return fetch('/mudaStatus',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({novoStatus, idGrupo, idCandidato})
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.resposta;
    })
}

const tiraDoGrupo = (id) =>{
    return fetch("/tiraDoGrupo",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id})
    }).then(data =>{
        data.json();
    }).then(resul =>{
        return resul;
    })
}

const montaInfo = async (dados)=>{
    let popInfo = document.getElementById('exampleModalCenter');
    popInfo.querySelector('#usuarios').innerText = '';
    popInfo.querySelector('#nomeGrupo').innerHTML = dados.nome;
    popInfo.querySelector('#dataInicio').innerHTML = dados.inicioReuniao;
    popInfo.querySelector('#descricao').innerHTML = dados.descricao;

    pesquisaCepInfo(dados.cep);

    dados.usuariosDoGrupo.forEach(usuario =>{
        let articleUsuario = document.createElement('article');
        articleUsuario.setAttribute('class','usuario');

        let divImg = document.createElement('div');
        divImg.setAttribute('class','imgUsuario');

        let img = document.createElement('img');
        img.setAttribute('id','avatar');
        img.setAttribute('src', `${usuario.img_perfil}` );

        let label = document.createElement('label');
        label.setAttribute('id','nickname');
        label.innerText = usuario.nickname;

        divImg.appendChild(img);
        articleUsuario.appendChild(divImg);
        articleUsuario.appendChild(label);

        popInfo.querySelector('#usuarios').appendChild(articleUsuario);

        if(usuario.id == dados.id_admin){
            popInfo.querySelector('#nomeAdm').innerHTML = usuario.nickname;
        }
        if(usuario.id == dados.idLogado && dados.idLogado != dados.id_admin){
            popInfo.querySelector('.adm').classList.remove('invi');
            popInfo.querySelector('#cNumero').classList.remove('invi');
            popInfo.querySelector('#numero').innerHTML = dados.numero;
            desejaSair();
        }
    })
    if(dados.id_admin == dados.idLogado){
        popInfo.querySelector('#numero').classList.remove('invi');
        popInfo.querySelector('#numero').innerHTML = dados.numero;
        popInfo.querySelector('.adm').classList.remove('invi');
        montaPedidos(await requisitaNotificacoes(idGrupo));
    }
    
}


const montaPedidos = (pedidos) =>{
    //array de obj
    let boxPedidos = document.getElementById('style-1');
    document.getElementById('style-1').innerText = "";
    
    if(pedidos.length != 0){
        pedidos.length >= 2?
            boxPedidos.setAttribute('style','overflow-y: scroll')
        : 
            boxPedidos.removeAttribute('style');
        pedidos.forEach(pedido =>{
            let notificacao = document.createElement('div');
            notificacao.setAttribute('class','notificacao');
            notificacao.setAttribute('id', `${pedido.id_usuario}`)
    
            let frasePedido = document.createElement('span');
            frasePedido.setAttribute('class', 'frasePedido');
            frasePedido.innerText = `Deseja aceitar ${pedido.nickname} em seu grupo`;
    
            let aprovar = document.createElement('i');
            aprovar.setAttribute('class', 'fa fa-beer fa-2x');
            aprovar.setAttribute('id', 'aprovar');
            eventoAprovar(aprovar, pedido.id_usuario, pedido.nickname);
    
            let reprovar = document.createElement('i');
            reprovar.setAttribute('class', 'fa fa-beer fa-2x');
            reprovar.setAttribute('id', 'reprovar');
            eventoReprovar(reprovar, pedido.id_usuario, pedido.nickname);
    
            notificacao.appendChild(frasePedido);
            notificacao.appendChild(aprovar);
            notificacao.appendChild(reprovar);
    
            boxPedidos.appendChild(notificacao);
        })
    }
    else{
        boxPedidos.removeAttribute('style');
        let notificacao = document.createElement('div');
        notificacao.setAttribute('class','notificacao');
        let fraseVazio = document.createElement('span');
        fraseVazio.setAttribute('class', 'frasePedido');
        fraseVazio.innerText = "Nenhum pedido no momento"
        notificacao.appendChild(fraseVazio);
        boxPedidos.appendChild(notificacao);
    }
}


const desejaSair = () =>{
    let boxPedidos = document.getElementById('style-1');
    boxPedidos.innerText = "";
    boxPedidos.removeAttribute('style');

    let sair = document.createElement("div");
    sair.setAttribute('id', "sairGrupo");

    let span = document.createElement("span");
    span.setAttribute('id', 'pergunta');
    span.innerText = "Deseja sair desse Grupo ?"

    let divBtns = document.createElement('div');
    divBtns.setAttribute('id','botoes');

    let btnSim = document.createElement('button');
    btnSim.setAttribute('id',"sim");
    btnSim.setAttribute('class', 'btn btn-primary');
    btnSim.setAttribute('data-dismiss', 'modal');
    btnSim.innerText = "Sim";
    eventoSairGrupo(btnSim);

    let btnNao = document.createElement('button');
    btnNao.setAttribute('id', "nao");
    btnNao.setAttribute('class', 'btn btn-primary');
    btnNao.setAttribute('data-dismiss', 'modal');
    btnNao.innerText = "Não";

    sair.appendChild(span);
    divBtns.appendChild(btnSim);
    divBtns.appendChild(btnNao);
    sair.appendChild(divBtns);

    boxPedidos.appendChild(sair);

}

const eventoAprovar = (botao, id, nickname) =>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        idCandidato = evento.composedPath()[1].id
        let resul = await mudaStatus('aprovado');
        let frasePedido = document.getElementById(`${id}`);
        frasePedido.innerHTML = `${nickname} foi aprovado`;
        setTimeout( async ()=>{
            montaInfo(await requsitaDados(idGrupo));
        },1000)
    })
}

const eventoReprovar = (botao, id, nickname) =>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        idCandidato = evento.composedPath()[1].id;
        let resul = await mudaStatus('recusado');
        let frasePedido = document.getElementById(`${id}`);
        frasePedido.innerHTML = `${nickname} foi recusado`;
    })
}

const eventoSairGrupo = (botao) =>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        let resul = await tiraDoGrupo(idGrupo);
        document.getElementById(`${idGrupo}`).remove();
    })
}

document.querySelectorAll('.info').forEach(botao => {
    botao.addEventListener('click', async (evento)=>{
        evento.preventDefault();
        idGrupo = evento.composedPath()[2].id;
        let dados = await requsitaDados(idGrupo);
        montaInfo(dados);
    })
});

document.getElementById('fechaInfo').addEventListener('click', evento=>{
    evento.preventDefault();
    document.querySelector('.adm').classList.add('invi');
})