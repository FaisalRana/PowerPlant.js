import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


// This function stores our state.
//save the partially executed state. 
const storeState = () => {
  let currentState = {};
  return (changeState = state => state) => {   
    const newState = changeState(currentState);   //changeState("feed")(1)(currentState)
    currentState = {...newState};
    return newState;
  };
};



const stateControl = storeState();

//function factory

const changeState = (prop) => { //changeState("feed")(1)(currentState)    //fucntion that lets us alter the values of differnt properties (hence the name) ==> const feed = changeState("feed")(1);
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

//obj = {feed:0, blueFood:0, hydrate:0, superWater:0 }
//const feed = changeState("feed")(1); //PO: at this point this to an object - access to last statement that takes object as an arg - not executing last statement

// const changePlant = (prop) => { 
//   return (value) => {
//     return (plant) => ({
//       ...plant,
//       [prop] : value
//     })
//   }
// }

// We create four functions using our function factory. We could easily create many more.


const firstHealthFunction = changeState("health");
const firstAgilityFunction = changeState("agility");
const firstIntelligenceFunction = changeState("intelligence");
const firstStrengthFunction = changeState("strength");
const firstStealthFunction = changeState("stealth");
// healthPropFunction = 
// (value) => {
//   return (state) => ({
//     ...state,
//     [health] : (state[health] || 0) + value



$(document).ready(function() {
  // const currentState = stateControl();
  // $('#plant-names').text(`Name: ${currentState.plant}`);
// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.


  $('#attribute-form').submit(function(event) {

    const name = $('#name-input').val();
    const health = parseInt($('#health-input').val());
    const agility = parseInt($('#agility-input').val());
    const intelligence = parseInt($('#intelligence-input').val());
    const strength = parseInt($('#strength-input').val());
    const stealth = parseInt($('#stealth-input').val());
    const secondHealthFunction = firstHealthFunction(health);
    const secondAgilityFunction = firstAgilityFunction(agility);
    const secondIntelligenceFunction = firstIntelligenceFunction(intelligence);
    const secondStrengthFunction = firstStrengthFunction(strength);
    const secondStealthFunction = firstStealthFunction(stealth);
    const newHealthState = stateControl(secondHealthFunction);
    const newAgilityState = stateControl(secondAgilityFunction);
    const newIntelligenceState = stateControl(secondIntelligenceFunction);
    const newStrengthState = stateControl(secondStrengthFunction);
    const newStealthState = stateControl(secondStealthFunction);
    
    $('#name-value').text(`Character Name: ${name}`);
    $('#health-value').text(`Health: ${newHealthState.health}`);
    $('#agility-value').text(`Agility: ${newAgilityState.agility}`);
    $('#intelligence-value').text(`Intelligence: ${newIntelligenceState.intelligence}`);
    $('#strength-value').text(`Strength: ${newStrengthState.strength}`);
    $('#stealth-value').text(`Stealth: ${newStealthState.stealth}`);
    $(`.hiddenOutput`).show();
    event.preventDefault();
  });
});