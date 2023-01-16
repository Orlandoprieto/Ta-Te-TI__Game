const tableroDOM = () => {
    const tablero = document.getElementById("tablero");
    let casilleros = Array.from(tablero.children);

    let id = 0;
    casilleros.forEach(casillero => {
        casillero.setAttribute("id", id++);
    })

    const ocuparCasillero = (idCasillero, {img, valor}) => {
        const casillero = document.getElementById(idCasillero);
        casillero.value = valor;
        casillero.children[0].src = img;
    }

    const limpiar = () => {
        casilleros.forEach(casillero => {
            casillero.value = "";
            casillero.children[0].src = "";
        })
    }

    return {
        casilleros,
        ocuparCasillero,
        limpiar
    }
}


const verificarSiHayGanador = () => {

    const direcciones = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let ganador; 
    for(let direccion of direcciones){

        let patron = "";
        for(let id of direccion){
            const valor = document.getElementById(id).value;
            patron += valor;
        }

        if(patron == "xxx"){
            ganador = "x"
            
        } else if (patron == "ooo"){
            ganador = "o"
        }
    }

    return ganador;
}


const jugadorCPU =  () => {
    const { casilleros, ocuparCasillero } = tableroDOM();
    const casillerosDisponibles = casilleros.filter(casillero => casillero.value == "");
    let index = Math.ceil(Math.random() * (casillerosDisponibles.length - 1));
    
    const CPU = { img: "./img/circ.svg", valor: "o" }

    if (casillerosDisponibles != 0) {
        const idCasillero = casillerosDisponibles[index].id;
        ocuparCasillero(idCasillero, CPU)
    }
}


const jugador = (idcasillero) => {
    const { ocuparCasillero } = tableroDOM();
    const jugador = { img: "./img/cruz.svg", valor: "x" };
    ocuparCasillero(idcasillero, jugador);
}


const controladorJuego = ( () => {

    const { casilleros, limpiar } = tableroDOM()

    let turno = 0;
    casilleros.forEach(casillero => {
        casillero.onclick =  function (){
            const id = this.id;

            if(casillero.value == ""){ 
                jugador(id);
                jugadorCPU();
                turno = turno + 2;
                console.log(turno)
                
                let ganador = verificarSiHayGanador();
                if (ganador != undefined) {
                    Swal.fire(`El ganador es ${ ganador }`);
                    limpiar();
                    turno = 0;

                } else if(turno > 9){
                    Swal.fire(`El juego termino en empate`);
                    limpiar();
                    turno = 0;
                }
            }
        }
    })
})()