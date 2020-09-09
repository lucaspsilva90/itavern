
setTimeout(()=>{
    $('#duracao').mask('0:00');
    $('#numJogador').mask('00');
    $('#numero').mask('00000');
})

const mostraEmBranco = (erro) =>{
    document.getElementById('avisos').innerText = '';
    document.getElementById('avisos').classList.add('flex');
    document.getElementById('avisos').classList.remove('invi');
    for(msg of erro){
        let div = document.createElement("div");
        div.innerText = msg;
        document.getElementById('avisos').appendChild(div);
    }
}

const validaData = (Data) =>{

    Data = Data.substring(0,10);

    var dma = -1;
    var data = Array(3);
    var ch = Data.charAt(0); 

    for(i=0; i < Data.length && (( ch >= '0' && ch <= '9' ) || ( ch == '/' && i != 0 ) ); ){
        data[++dma] = '';
        if(ch!='/' && i != 0) return false;
        if(i != 0 ) ch = Data.charAt(++i);
        if(ch=='0') ch = Data.charAt(++i);
        while( ch >= '0' && ch <= '9' ){
            data[dma] += ch;
            ch = Data.charAt(++i);
        } 
    }

    if(ch!='') return false;

    if(data[0] == '' || isNaN(data[0]) || parseInt(data[0]) < 1) return false;

    if(data[1] == '' || isNaN(data[1]) || parseInt(data[1]) < 1 || 
    parseInt(data[1]) > 12) return false;

    if(data[2] == '' || isNaN(data[2]) || ((parseInt(data[2]) < 0 || 
    parseInt(data[2]) > 99 ) && (parseInt(data[2]) < 
    1900 || parseInt(data[2]) > 9999))) return false;

    if(data[2] < 50) data[2] = parseInt(data[2]) + 2000;

    else if(data[2] < 100) data[2] = parseInt(data[2]) + 1900;

    switch(parseInt(data[1])){
        case 2: 
            if(((parseInt(data[2])%4!=0 || 
            (parseInt(data[2])%100==0 && parseInt(data[2])%400!=0)) 
            && parseInt(data[0]) > 28) || parseInt(data[0]) > 
            29 ) return false;
            break; 
        case 4: case 6: case 9: case 11:  
            if(parseInt(data[0]) > 30) return false;
            break;
        default: { if(parseInt(data[0]) > 31) return false;}
    }
    return true; 
   
}


// EVENTO QUE PEGA OS DADOS DO FORMULARIO CRIAR GRUPO
document.getElementById('criarSala').addEventListener('submit', evento=>{
    evento.preventDefault();

    // APENAS CAMPOS OBRIGATORIOS EXCLUINDO O DIASREUNIAO
    let listaCampos = document.querySelectorAll('.obrig');
    let listaValue = [];
    let diasReuniao = document.querySelectorAll('[name=diasReuniao]:checked');
    let invalido = [];
    let status = true;


    document.querySelectorAll('.obrig').forEach(campo =>{
        listaValue.push(campo.value);
    });
    
    if(listaValue.includes('') || listaValue.includes('Selecione') || diasReuniao.length == 0){
        status = false;
        return mostraEmBranco(['Termine de preencher o formulário !'])
    }
    
    listaCampos.forEach(campo =>{
        switch(campo.name){
            case "nome":
                if(campo.value.length < 4){
                    status = false;
                    return invalido.push('Nome do grupo é muito curto !');
                }
                if(campo.value.length > 40){
                    status = false;
                    return invalido.push('Nome do grupo é muito longo !');
                }
                break;
            case "nomeJogo":
                break;
            case "inicioReuniao":
                if(!validaData(campo.value)){
                    status = false;
                    invalido.push("Data inválida !")
                }
                break;
            case "horario":
                break;
            case "tempoJogo":
                let min = campo.value.substring(2);
                if(Number.parseInt(min) > 59){
                    status = false;
                    invalido.push('Tempo de jogo inválido !');
                } 
                break;
            case "numJogadores":
                break;
            case "cep":
                if(document.getElementById('endereco').value == ''){
                    status = false;
                    invalido.push("CEP inválido !")
                }
                break;
            case "numero":
                if(campo.value < 0 || campo.value > 45000){
                    status = false;
                    invalido.push("Numeração inválida !")
                }
                break;
            case "imgGrupo":
                if(!$('input[name="imgGrupo"]').val()){
                    invalido.push('Foto não anexada !')
                }
                break;
        }
    })

    status? evento.target.submit() : mostraEmBranco(invalido);

})

document.querySelectorAll('[name=fecha]').forEach(btn =>{
    btn.addEventListener('click', evento =>{
        document.getElementById('avisos').classList.remove('flex');
        document.getElementById('avisos').classList.add('invi');
    })
})