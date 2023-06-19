/**
 * Función para pedir carta
 * @param {Array} deck es un arreglo de string
 * @returns {String} retorna la carta del deck
 */

export const pedirCarta = ( deck ) => {

    if(deck.length == 0){
    throw 'No hay cartas en la baraja';
    }

    return deck.pop()
}