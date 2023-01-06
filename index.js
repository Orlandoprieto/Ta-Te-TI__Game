const Jugador = (marca, valor) => {
    let getMarca = marca;
    let getvalor = valor;
    let victorias = 0;
    let esElGanador = false;

    const sumarVictoria = () => {
        if (victorias == 2) {
            return esElGanador = true;
        } else {
            return victorias++;
        }
    }

    return {
        getMarca,
        getvalor,
        sumarVictoria
    }
}

const tablero = () => {
    const tablero = document.getElementById("tablero");
    let casilleros = Array.from(tablero.children);

    let id = 0;
    casilleros.forEach(casillero => {
        casillero.setAttribute("id", id++)
    })

    const agregarMarca = (marca, valor) => {
        casilleros.forEach(casillero => {
            casillero.addEventListener("click", function () {
                document.getElementsByName(this.id).value = valor;
                let img = document.getElementById(this.id).children;
                img[0].src = marca;
            })
        })
    }

    const limpiarTablero = () => {
        casilleros.forEach(casillero => {
            casillero.value = "";
            casillero.children[0].src = "";
            console.log(casillero.value)
        })
    }

    return {
        agregarMarca,
        limpiarTablero
    }
}

const controladorJuego = (() => {
    const jugadorUno = Jugador("./img/cruz.svg", "x")
    const { agregarMarca, limpiarTablero } = tablero();

    agregarMarca(jugadorUno.getMarca, jugadorUno.getvalor);

    setInterval( limpiarTablero , 5000)

})()