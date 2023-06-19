import _ from 'underscore';
import { crearDeck, pedirCarta, valorCarta } from './usecases';

//PATRON MODULO

(() => {

  'use strinct' // ayuda a evitar errores comunes usando este patrón.
    
  let deck = [];

  const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

  

  let puntosJugadores = []

  //Referencias HTML

  const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevoJuego = document.querySelector('#btnNuevo')

  

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosHTML = document.querySelectorAll('smal');



  const inicializarJuego = ( numJugadores = 2) => {

      deck = crearDeck(tipos, especiales);

      puntosJugadores = []

      for(let i = 0; i< numJugadores; i++){
          puntosJugadores.push(0);
      }

      btnPedir.disabled   = false;
      btnDetener.disabled = false;

      puntosHTML.forEach( ele => ele.innerText = 0)
      divCartasJugadores.forEach(ele => ele.innerHTML = '')

  }



  
  deck = inicializarJuego();

  //Turno 0: primer jugador y el ultimo será la computadora
  const acumularPuntos = ( carta, turno ) => {

      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
      puntosHTML[turno].innerText = puntosJugadores[turno];

      return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta')
      divCartasJugadores[turno].append(imgCarta)

  }

  const determinarGanador= () => {

      const [puntosMinimos, puntosComputadora] = puntosJugadores;

      setTimeout(() => {
          if(puntosComputadora === puntosMinimos){
              alert('Nadie gana')
          } else if ( puntosMinimos > 21 ){
              alert('Computadora gana!')
          } else if ( puntosComputadora> 21 ){
              alert('Jugador gana!')
          }else{
              alert('Computadora gana')
          }
          
      }, 100);
  }
  //turno computadora
  const turnoComputadora = ( puntosMinimos ) => {

      let puntosComputadora = 0

      do{

          const carta = pedirCarta(deck);
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
      
          crearCarta(carta, puntosJugadores.length-1)
         
      }while( (puntosComputadora < puntosMinimos) && puntosMinimos <= 21 );

      determinarGanador()

  }

  //Eventos botones
  btnPedir.addEventListener('click', () => {

      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos(carta, 0)

      crearCarta(carta, 0)

      if ( puntosJugador > 21 ){
      
          btnDetener.disabled = true
          btnPedir.disabled = true
          turnoComputadora(puntosJugador);

      }else if ( puntosJugadores[puntosJugadores.length-1] === 21 ){

          btnDetener.disabled = true
          btnPedir.disabled = true
          turnoComputadora(puntosJugador);

      }else{
      
      }

  })

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true

      turnoComputadora(puntosJugadores[0])
  })

  btnNuevoJuego.addEventListener('click', () => {
      inicializarJuego()
  })


  return {
      nuevoJuego: inicializarJuego()
  }


})();



