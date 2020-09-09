const { Grupo } = require('../models/index');
const moment = require('moment');

module.exports = {
    chat: (socket) =>{
    
        // função que mostra as mensagens antigas
        // socket.emit('msgAntigas', mensagens);
    
        // função que recebe a msg que acabou de ser enviada
        socket.on("enviaMsg", async (data)=>{

            let horaMsg = moment().format('LT');
            data.horaMsg = horaMsg;

            let id = data.idGrupo; 
            data.idGrupo = undefined;

            let objComArray = await Grupo.findByPk(id,{
                attributes:["chat"]
            })

            let lista = objComArray.chat;
            lista.push(data)

            await Grupo.update({
                chat: lista
            },{
                where:{
                    id:id
                }
            })
            // mensagens.push(data);

            // função que manda a mensagem para outos membros online
            socket.broadcast.emit('outrasMsg', data);
      })
    }  
}