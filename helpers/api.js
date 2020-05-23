    
import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'Mobile_Flashcards:decks';
import {allDecks} from './_DATA'
const startingData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'Is React a Javascript UI library?',
        answer: 'Correct'
      },
      {
        question: 'Correct place to make Ajax requests is in a render method?',
        answer: 'Incorrect'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'Closure is a combination of a function and lexical environment within which that function was declared?',
        answer: 'Yes'
      }, 
      { 
        question: 'JavaScript is considered a weakly typed (or untyped) language?',
        answer: 'Correct'
      }
    ]
  }
}
    

export async function getDecks() {
  try {

    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        console.log("stored result from getdecks in api "+storeResults)
    if (storeResults === null) {

      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(allDecks));
    }
       //if the AsyncStorage is empty, initilize them with 
      //⚠️should parse the value 
      const result = storeResults === null ? allDecks : JSON.parse(storeResults);
  
    return result
  } catch (err) {
    console.log(err);
  }
}




export async function saveDeckTitle(title){


  AsyncStorage.mergeItem(DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
      title,
      questions: []
    }
  })
    ,
    () => {
      AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {

        return JSON.parse(result)
        console.log("result form mergeItem"+result);
      });
    
    

    })





}


export async function  getDeck(id){


  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        console.log("storeResults"+storeResults)
        console.log("parsed item getting"+ JSON.stringify(JSON.parse(storeResults)[id]))

    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }



}

export async function clearDecks() {
  try {
    await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
  } catch (err) {
    console.log(err);
  }
}

    /*
    1.get al items 
    2.delete the specific item 
    3.push again the new data

    */
export async function removeDeckAsync(key){

  try {


    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    const all = JSON.parse(storeResults)

    all[key] = undefined;
    delete all[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(all));

      
  } catch (err) {
    console.log(err);
  }

 
}

/*

  React: {
    title: 'React',
    questions: [
      {
        question: 'Is React a Javascript UI library?',
        answer: 'Correct'
      },
      {
        question: 'Correct place to make Ajax requests is in a render method?',
        answer: 'Incorrect'
      }
    ]
  }


*/

export async function addCardToDeckAsync(title,card){

      
      
  try{
    const data = await getDeck(title)
    const result  = await AsyncStorage.mergeItem(DECKS_STORAGE_KEY,
      JSON.stringify({
            [title]:{
                  //dd the card to the list of questions for the deck
                  // with the associated title. 
              questions:[...data.title].concat(card)


            }


      })
      )
  }catch(err){

      console.log("error when adding card to deck")
  }
      
    

}