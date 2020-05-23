import {
    RECEIVE_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD,
    RESET_STORE
  } from '../actions/index';

  import { decks as INITIAL_STATE } from '../helpers/_DATA';

  export default function decks(state={},action){
        //this will cotnain all action creators related to decks 
        switch(action.type){

            case RECEIVE_DECKS:
                return {
                    ...state,
                    ...action.decks
                  };
            
            case ADD_DECK:
                const {title} = action;
                return{
                    ...state,
                    [title]:{
                        title,
                        /*by default questions is empty initialy */
                        questions:[]

                    }
                };
            case ADD_CARD:
                    const {key,card} = action
                return{
                    ...state,
                     [key]:{
                         ...state[key],
                         questions:[...state[key].questions].concat(card)

                     }
                };
                case REMOVE_DECK:
                    const { keyDeck } = action;
                    //destrcutur then take only the excepted decks
                    const { [keyDeck]: value, ...restOfecks } = state;
                    console.log(restOfecks);
                    return restOfecks;
                
                    case RESET_STORE:
                        return INITIAL_STATE;
                default :
                    return state;









        }











  }