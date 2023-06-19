import _ from "underscore"

  //Creación de una nueva baraja

/**
* Esta función retorna un nuevo deck 
* @param {array} tiposDeCarta 
* @param {array} tiposEspeciales 
* @returns {array}
*/
export  const crearDeck = (tiposDeCarta, tiposEspeciales) =>  {
    
    if(!tiposDeCarta) throw new Error('TiposDeCarta es obligatorio!');
    if(tiposDeCarta.length === 0) throw new Error('TiposDeCarta tiene que ser un arreglo de string!');
    
    let deck = []
    
    for( let i = 2; i<= 10; i++ ){
        for( let tipo of tiposDeCarta ){
            deck.push(i + tipo)
        }
    }

    for( let tipo of tiposDeCarta ){
        for( let especial of tiposEspeciales ){
            deck.push(especial + tipo)
        }
    }

    return _.shuffle(deck)
}