/* 2C = two of clubs (treboles)\
2D = two of diamonds (treboles)
2H = two of hearts (treboles)
2S = two of spades (treboles)
A = 11
J, Q y K = 10
*/
let deck = [];
const tipos = ['C', 'D', 'H','S'];
const especiales = ['A', 'J', 'Q','K'];

//variables para sumar los puntos del jugador y la pc
let puntosJugador = 0, 
    puntosComputador = 0;

//Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHtml = document.querySelectorAll('small');
const cartaNuevaJugador = document.querySelector('#jugador-cartas');
const cartaNuevaComputador = document.querySelector('#computadora-cartas');



/* crea una baraja y crea una baraja aleatoria con
undescore */
const crearDeck = ()=>{
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
    /* el arreglo te lo da ordenado, entonces se necesita
    que este desordenado para repartirse */
    // console.log(deck);
    /* usando la libreria underscore 
    llamamos al objeto _ para usar shuffle*/
    deck =_.shuffle(deck) //deck barajeado
    console.log(deck);
    return deck;
}

crearDeck(); 

/* funcion tomar una carta de la baraja */
const pedirCarta = () =>{
    if (deck.length === 0) {
        /* dar mensaje que no hay cartas en console */
        throw 'no hay cartas en el deck';
    }
    const carta = deck.pop();   
    //console.log(deck);
    //console.log(carta);carta debe de ser de la baraja
    return carta;
};
//pedirCarta();
 
/* cual es el valor de la carta que se extrajo */
const valorCarta = (carta) => {
    /* devuelve un subconjunto de un objeto string \
    delimitamos desde donde empieza y lo hacemos
    general restandole 1 al total */
    const valor = carta.substring(0,carta.length-1);
    return  ((isNaN(valor)) ?
                (valor==='A') ? 11 : 10 : //if anidados
                valor*1);
/*     let puntos = 0;
    2 =2, 10 =10, 3=3
     saber si es un numero o es J,Q,K 
    if (isNaN(valor)) {
        console.log('No es un numero');
        puntos = (valor==='A') ? 11 :10;
    } else{
        console.log('Es un numero');
         puntos se tranforma en un string por la naturaleza de la 
        ble vari valor y se requiere convertir a numero 
        puntos = valor*1; para convertir a numero *1 
    }
    console.log(puntos); */
}
/* Turno de la computadora */
const turnoComputadora = (puntosMinimos) => {
  
    do {
    const carta = pedirCarta();
    //console.log(valorCarta(pedirCarta()));
    puntosComputador = puntosComputador + valorCarta(carta)
    puntosHtml[1].innerText = puntosComputador;

    //crear cartas en html conforme al numero que pida el jugador 1
    // <img class="carta" src="./assets/cartas/10C.png" alt=""></img>
    const imgCarta = document.createElement ('img');
    /*con `` puedes insertar un bloque de codigo de javascript */
    imgCarta.src = `./assets/cartas/${ carta }.png`
    imgCarta.classList.add ("carta");
    cartaNuevaComputador.append( imgCarta );  

    if (puntosMinimos>21) {
        break;
    }

    } while ( ( puntosComputador < puntosMinimos ) && (puntosMinimos<=21) ); 

    /* poder ejecutarlo al mismo tiempo debido a que Js no es multi hilo  
    usamos un callback*/
    setTimeout( ()=>{ //permite ejecutar el callnack en milisegundos
        if (puntosJugador === puntosComputador){
            alert('Empate');
        }else if (puntosJugador > puntosComputador && puntosJugador <= 21  || puntosComputador > 21){
            alert('Vittoria');
        }else if (puntosJugador < puntosComputador && puntosComputador <= 21 || puntosJugador > 21){
            alert('Perdiste pero recuerda que siempre hay segundas oportunidades');
        }
    }, 100);

}

//const valor = valorCarta(pedirCarta());
//console.log({valor});

//Eventos, agregar acciones a los botones al dar click
/* cuando se de click en ese boton, se va disparar esa accion */
btnPedir.addEventListener('click', ()=>{
// callback: es una funcion dentro de otra que se manda como argumento
    const carta = pedirCarta();
    //console.log(valorCarta(pedirCarta()));
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHtml[0].innerText = puntosJugador;

    //crear cartas en html conforme al numero que pida el jugador 1
    // <img class="carta" src="./assets/cartas/10C.png" alt=""></img>
    const imgCarta = document.createElement ('img');
    /*con `` puedes insertar un bloque de codigo de javascript */
    imgCarta.src = `./assets/cartas/${ carta }.png`
    imgCarta.classList.add ("carta");
    cartaNuevaJugador.append( imgCarta );

     if (puntosJugador>21) {
        console.warn('perdiste');
        btnPedir.disabled = true; //desabilita boton
        btnDetener.disabled = true;
        turnoComputadora(puntosComputador);
    }else if(puntosJugador===21){
        console.warn('ganaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosComputador);
    } 
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador)

});

btnNuevo.addEventListener('click', () =>{
    console.clear();
    deck = [];
    deck = crearDeck();
    
    puntosJugador = 0;
    puntosComputador = 0;

    puntosHtml[0,1].innerText = 0;
    puntosHtml[1].innerText = 0;

    cartaNuevaComputador.innerHTML = '';
    cartaNuevaJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});