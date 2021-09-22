/* Modulo, funcion autoinvocable encerrar parentesis y agregar(), crea
    un scope sin nombre; */
const miModulo = (()=>{ 
    "use strict"

    let deck = [];
    const tipos = ['C', 'D', 'H','S'],
          especiales = ['A', 'J', 'Q','K'];

    //arreglo para los puntos de los jugadores, donde el ultimo elemento es pc
    let puntosJugadores = [];


    //Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHtml = document.querySelectorAll('small'),
          cartasJugadoresHtml = document.querySelectorAll('.divCartas')

    /* inicializar el juego, crear deck y definir numero de jugadores*/
    const iniciarJuego = (numeroJugadores = 2) =>{
        deck = crearDeck(); 

        puntosJugadores = [];
        for (let i = 0; i< numeroJugadores; i++) {
          puntosJugadores.push(0);
        }

        puntosHtml.forEach(elem => elem.innerText = 0);
        cartasJugadoresHtml.forEach(elem=>elem.innerHTML= '');

        btnPedir.disabled = false;
        btnDetener.disabled = false; 
    };
    /* crea una baraja y crea una baraja aleatoria con undescore */
    const crearDeck = ()=>{
        deck = [];
        for(let i=2; i<=10; i++){
            for (let tipo of tipos) {
                deck.push(i+tipo)
            }
        }
        for(let tipo of tipos){
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        return _.shuffle(deck); //deck barajeado con libreria underscore
    }

    /* funcion tomar una carta de la baraja */
    const pedirCarta = () =>{
        if (deck.length === 0) {
            throw 'no hay cartas en el deck';
        }
        return deck.pop(); 
    };

    /* cual es el valor de la carta que se extrajo */
    const valorCarta = (carta) => {
        const valor = carta.substring(0,carta.length-1);
        return  ((isNaN(valor)) ?
                    (valor==='A') ? 11 : 10 : //if anidados
                    valor*1);
    }
    //turno 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const CrearCarta = (carta, turno) => {
        const imgCarta = document.createElement ('img');
        imgCarta.src = `./assets/cartas/${ carta }.png`
        imgCarta.classList.add ("carta");
        cartasJugadoresHtml[turno].append( imgCarta );  
    }

    const DeterminarGanador = () =>{
        /* destructuracion de arreglos extraer los puntosjugadores, 
        los puntoscomputador y minimos*/
        const [puntosMinimos, puntosComputador] = puntosJugadores;
    /* poder ejecutarlo al mismo tiempo debido a que Js no es multi hilo  */
        setTimeout( ()=>{ //permite ejecutar el callback en milisegundos
            if( puntosComputador === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputador > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100);
    }

    /* Turno de la computadora */
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputador = 0;

        do {
        const carta = pedirCarta();
        puntosComputador = acumularPuntos(carta,puntosJugadores.length-1);
        CrearCarta(carta, puntosJugadores.length-1)

        } while ( ( puntosComputador < puntosMinimos ) && (puntosMinimos<=21) ); 
        DeterminarGanador();
    
    }

    //Eventos, agregar acciones a los botones al dar click
    btnPedir.addEventListener('click', ()=>{  // callback
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);
        CrearCarta(carta,0);

        if (puntosJugador>21) {
            console.warn('perdiste');
            btnPedir.disabled = true; //desabilita boton
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador===21){
            console.warn('ganaste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } 
    });

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () =>{

        iniciarJuego();

    });


    return {
        //publico
        nuevoJuego : iniciarJuego //pasar referencia
    }


})();