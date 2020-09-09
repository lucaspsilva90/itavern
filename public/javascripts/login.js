var senhaUser;
var senhaDigitada;
var emailUserRec;

const emailDaRec = document.querySelector('h6').innerText;

const btnLogin = document.getElementById('login');


// EVENTO ACONTECE QUANDO O USUARIO RECEBE O LINK DE MUDAR A SENHA
setTimeout(()=>{
    if(emailDaRec.includes("@")){
        document.getElementById('lblEmail').classList.add("invi");
        document.getElementById('emailRec').classList.add("invi");
        document.getElementById('informa').classList.add("invi");
        document.getElementById('lblSenha').classList.remove("invi");
        document.getElementById('confirmaSenhaRec').classList.remove("invi");

        emailUserRec = document.querySelector('h6').innerText;

        let formRec = document.getElementById('recupera');
        formRec.setAttribute('action','login/update');

        document.getElementById('btnConf').addEventListener('click', async (evento) =>{
            evento.preventDefault();
            senhaUser == senhaDigitada?
                await atualizaSenha(document.getElementById('senhaRec').value)
            :
                mostraErroRec('Senhas não compativeis')
        })
        $('#esqueciSenha').modal('show')
    }
})

// VERIFICA SE O NICK OU EMAIL JÁ FOI CADASTRADO
const verificaSeExiste = (nome, nickname, email, senha) =>{
    console.log('cheguei')
    fetch("/cadastro/submit",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({nome, nickname, email, senha})
    }).then(resp =>{
        return resp.json();
    }).then(data =>{
        data.message?
            mostraErroCriar(data.message)
        :
            location.href = 'http://localhost:3000/home';
    })

}

// verifica login
const verificaLogin = (email, senha) =>{
    fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, senha})
    }).then(resul =>{
        return resul.json();
    }).then(data =>{
        data.message?
            mostraErro(data.message)
        :
            location.href = 'http://localhost:3000/home'
    })
}

const verificaEmail = (email) =>{
    console.log(email);
    fetch('login/recSenha',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({emailRec:email})
    }).then(resp =>{
        return resp.json();
    }).then(data =>{
        data.message?
            mostraErroRec(data.message)
        :
            location.href = 'http://localhost:3000'
    })
}

const mostraErro = (erro) =>{
    document.querySelector('h6').innerText = erro;
    document.getElementById('falhaLogin').classList.remove('invi');
}
const mostraErroCriar = (erro) =>{

    document.getElementById('restricoes').classList.remove('invi');
    document.getElementById('restricoes').innerText = erro;
}

const mostraErroRec = (erro) =>{
    document.getElementById('erroRec').innerText = '';
    document.getElementById('erroRec').innerText = erro;
}

const comparaSenhas = () =>{
    document.getElementById('checkSenha').classList.remove('invi')
    senhaUser = document.getElementById('senhaUser').value;
    let senhaDigitada = document.getElementById('confirmarSenhaUser').value;

    setTimeout(()=>{
        senhaUser == senhaDigitada ? 
        document.getElementById('checkSenha').innerText = "As senhas correspondem"
    :
        document.getElementById('checkSenha').innerText = "As senhas não correspondem"
    })
}

const comparaSenhasRec = () =>{
    document.getElementById('checkSenhaRec').classList.remove('invi')
    senhaDigitada = document.getElementById('confirmaRec').value;
    senhaUser = document.getElementById('senhaRec').value;

    setTimeout(()=>{
        senhaUser == senhaDigitada ? 
        document.getElementById('checkSenhaRec').innerText = "As senhas correspondem"
    :
        document.getElementById('checkSenhaRec').innerText = "As senhas não correspondem"
    })
}

const atualizaSenha = (senha) =>{
    return fetch("/login/update",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email:emailUserRec, senha})
    }).then(resp =>{
        return resp.json()
    }).then(data =>{
        !data.message?
            location.href = 'http://localhost:3000/home'
        :
            mostraErroRec("Email não cadastrado")
    })
}

// EVENTO QUE CHAMA A VERIFICAÇÃO DE LOGIN
document.getElementById('login').addEventListener('submit', async (evento) =>{
    evento.preventDefault();
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    verificaLogin(email, senha);
})
// EVENTOS QUE VERIFICAM A SENHA NO MOMENTO QUE DIGITA
document.getElementById('confirmarSenhaUser').addEventListener('keyup', evento =>{
    comparaSenhas();
})

document.getElementById('senhaUser').addEventListener('keyup', evento =>{
    comparaSenhas();
})

document.getElementById('senhaRec').addEventListener('keyup', evento =>{
    comparaSenhasRec();
})

document.getElementById('confirmaRec').addEventListener('keyup', evento=>{
    comparaSenhasRec();
})

// EVENTO QUE VERIFICA CRIAÇÃO
document.getElementById('btnCriarConta').addEventListener('click', async (evento) =>{
    evento.preventDefault();
    let nome = document.getElementById('nomeUser').value;
    let email = document.getElementById('emailUser').value;
    let nickname = document.getElementById('sobrenomeUser').value;
    let senha = document.getElementById('senhaUser').value;
    let confCriar = document.getElementById('confirmarSenhaUser').value;

    if(senha){
        senha == confCriar?
            verificaSeExiste(nome, nickname, email, senha)
        :
            mostraErroCriar('As senhas não conferem');
    }
    else{
        verificaSeExiste(nome, nickname, email, senha)
    }


})

// EVENTO QUE VERIFICA SE O EMAIL ESTÁ CADASTRADO

document.getElementById('recupera').addEventListener('submit', evento =>{
    evento.preventDefault();

    let email = document.getElementById('emailRec').value;

    if(email != ""){
        verificaEmail(email)
    }
    else{
        mostraErroRec('Digite o email')
    }

})

document.querySelectorAll('.fechaRec').forEach(btn =>{
    btn.addEventListener('click', evento =>{
        document.getElementById('erroRec').innerText = '';
    })
})