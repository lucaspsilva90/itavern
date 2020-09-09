"use strict";

var latFixa;
var lonFixa;

navigator.geolocation.getCurrentPosition((pos) =>{ 
    latFixa = pos.coords.latitude;
    lonFixa = pos.coords.longitude;
})

function buscaEnderecos (){
    return fetch('/grupos/ceps',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
    }).then(resp =>{
        return resp.json();
    }).then(data =>{
        return {listaEnderecos:data.listaEnderecos, endSemId:data.endSemId};
    })
}

function montaRequest (origem, destinos){
    return {
        origins: origem,
        destinations: destinos,
        travelMode: 'DRIVING',
    }
}

async function initMap(valueDistancia) {

        let service = new google.maps.DistanceMatrixService();

        let {listaEnderecos, endSemId} = await buscaEnderecos()

        let request = montaRequest([{lat:latFixa, lng:lonFixa}], endSemId);
        service.getDistanceMatrix(request, function(response, status) {
            if (status !== 'OK') {
                return console.log('Error was: ' + status);
            } 
            else {
                let { rows } = response;
                let filtrados = [];
                switch(valueDistancia){
                    case "1":
                        rows[0].elements.forEach((obj, index) =>{
                            let d = (obj.distance.value) / 1000;
                            if(d < 5){
                                filtrados.push(listaEnderecos[index].id);
                            }
                        })
                        break;
                    case "2":
                        rows[0].elements.forEach((obj, index) =>{
                            let d = (obj.distance.value) / 1000;
                            if(d >= 5 && d < 15){
                                filtrados.push(listaEnderecos[index].id);
                            }
                        })
                        break;
                    case "3":
                        rows[0].elements.forEach((obj, index) =>{
                            let d = (obj.distance.value) / 1000;
                            if(d >= 15){
                                filtrados.push(listaEnderecos[index].id);
                            }
                        })
                        break;
                }
                return ocultaFiltrados(filtrados);
            }
        }
    )
}

// setTimeout(()=>{
    let valueDistancia = document.getElementById('inputGroupSelect03').value
    if(document.getElementById('inputGroupSelect03').value != ''){
        initMap(valueDistancia);
    }
    else{
        tiraInvi();
    }
// })