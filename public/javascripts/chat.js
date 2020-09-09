
const idGrupo = document.getElementById('refGrupo').innerText;

const buscaChat = () =>{
    return fetch(`/chat/${idGrupo}`,{
        method:"GET",
    }).then(resul =>{
        return resul.json()
    }).then(data =>{
        console.log(data.mensagens)
        return data.mensagens;
    })
}

const scrollButtom = () =>{
    let lastMsg = document.querySelector('.message-area').lastElementChild;
    lastMsg.scrollIntoView();
}

setTimeout(async()=>{
    var socket = io('http://localhost:3000');

    socket.on('outrasMsg', (mensagem) =>{
        showMessage(mensagem);
    })

    let mensagens = await buscaChat();
    console.log(mensagens)
    for(let x = 0; x < mensagens.length; x++){
        if(x != 0){
            showMessage(mensagens[x]);
        }
    }

    // socket.on('msgAntigas', (mensagens)=>{
    //     for(mensagem of mensagens){
    //         showMessage(mensagem)
    //     }
    // })

    document.getElementById('formChat').addEventListener('submit',evento=>{
        evento.preventDefault();

        let autor = document.getElementById('userAtual').innerText;
        let mensagem = document.getElementById('mensagem').value;

        document.getElementById('mensagem').value = '';

        let objMsg;
        if(autor.length && mensagem.length){
            objMsg ={
                autor,
                mensagem,
                idGrupo
            }
        }

        showMessage(objMsg);
        socket.emit('enviaMsg', objMsg);
    })
})

const showMessage = (mensagem) =>{
    if(mensagem.autor == document.getElementById('userAtual').innerText){
        $('.message-area').append(
            `<div class="chat-msg my-msg">
                <h4>Você</h4>
                <p>${mensagem.mensagem}</p>
                <p class="datetime">${mensagem.horaMsg || ""}</p>
          </div>`
        )
    }
    else{
        $('.message-area').append(
            `<div class="chat-msg">
                <h4>${mensagem.autor}</h4>
                <p>${mensagem.mensagem}</p>
                <p class="datetime"> ${mensagem.horaMsg || ""}</p>
          </div>`
        )
    }
    scrollButtom();
}

