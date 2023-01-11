const tableroDOM = () => {
    const tablero = document.getElementById("tablero");
    let casilleros = Array.from(tablero.children);

    let id = 0;
    casilleros.forEach(casillero => {
        casillero.setAttribute("id", id++);
    })

    const ocuparCasillero = (casillero, {img, valor}) => {
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


const verificarSiHayGanador = ( {valor} ) => {

    const { casilleros } = tableroDOM();

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

    for (let direccion of direcciones) {
        if (casilleros[direccion[0]].value == valor && casilleros[direccion[1]].value == valor && casilleros[direccion[2]].value == valor) {
            return true;
        }
    }
}


const controladorJuego = (() => {
    
    const { casilleros, limpiar, ocuparCasillero } = tableroDOM();

    const jugadorUno = {
        img: "./img/cruz.svg",
        valor: "x", 
    }

    const jugadorDos = {
        img: "/img/circ.svg",
        valor: "0", 
    }

    let turno = jugadorUno;
    let ronda = 0;
    casilleros.forEach(casillero => {
        casillero.onclick = function () {

            

            const casillero = document.getElementById(this.id);

            if (casillero.value == "") {
                ronda++;
                
                ocuparCasillero(casillero, turno);

                if (verificarSiHayGanador(turno) ) { 
                    Swal.fire(`${turno.valor} es el ganador de la ronda`);
                    limpiar();       
                    ronda = 0; 
                    turno.victorias++;

                } else if (ronda == 9) {
                    Swal.fire(`Esta ronda termino en empate`);
                    limpiar();
                } 
                    
                turno = (turno == jugadorUno) ? jugadorDos : jugadorUno;
            }
        }
    })
})()