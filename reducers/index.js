import {
    RECEIVE_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD
  } from '../actions/index';



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
                return{
                    ...state,
                     [action.key]:{
                         ...state[key],
                         questions:[...state[action.key].questions].concat(card)

                     }


                };
                case REMOVE_DECK:
                    const { id } = action;
                    //destrcutur then take only the excepted decks
                    const { [id]: value, ...restOfecks } = state;
                    console.log(restOfecks);
                    return restOfecks;
                

                default :
                    return state;









        }











  }