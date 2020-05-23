/*
the redux configuration is petty simple in this project 
what we need : 
**handleInitialData🧑‍🚀
**add deck🚀
**remove deck,
**getAll decks  🚀
**and  addCradToDeck 
we will make all actionCreators in index.js 
to make it simple
*/
import {getDecks} from '../helpers/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const RESET_STORE = 'RESET_STORE';

export function receiveDecks(decks){
return {
    type:RECEIVE_DECKS,
    decks
};

}
export function resetStore() {
    return {
      type: RESET_STORE
    };
  }

export function addDeck(title){
    return{
        type:ADD_DECK,
        //title is the id necessary to get the specific Deck
        title
    };


}

export function addCardToDeck(key, card) {
    return {
      type: ADD_CARD,
      key,
      card
    };
  }

  
export function removeDeck(key){
    return{
        type:REMOVE_DECK,
        key
    };


}



export function handleInitialData(){


    return dispatch =>{

        return getDecks().then(decks=> {
                dispatch(receiveDecks(decks))


        })
    }
}