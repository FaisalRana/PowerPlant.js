import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { pointTracker, setPoints } from './points';

// This function stores our state.
// This returns a copy of our fully executed factory function, which is considered the "state" the object is in.  
const storeState = () => {
  let currentState = {}; // this is the global state 
  return (changeState = state => state) => {
    const newState = changeState(currentState);   //changeState("feed")(1)(currentState)
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

//function factory

const changeState = (prop) => { //changeState("feed")(1)(currentState)    //fucntion that lets us alter the values of differnt properties (hence the name) ==> const feed = changeState("feed")(1);
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

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

const charachters = { "mage": { health: 2, intelligence: 5, agility: 3 }, "paladin": { health: 5, intelligence: 3, agility: 2 }, "warrior": { health: 5, intelligence: 1, agility: 4 }, "thief": { health: 1, intelligence: 5, agility: 4 } };

$(document).ready(function () {

  setPoints();
  $('#MyButton').click(function () {
    pointTracker();
  });


  $('#attribute-form').submit(function (event) {
    const charachterInput = $('#characters').val();

    stateControl(() => charachters[charachterInput]);

    const name = $('#name-input').val();
    const healthInput = parseInt($('#health-input').val());
    const agilityInput = parseInt($('#agility-input').val());
    const intelligenceInput = parseInt($('#intelligence-input').val());
    const strengthInput = parseInt($('#strength-input').val());
    const stealthInput = parseInt($('#stealth-input').val());

    const newStateArray = [firstHealthFunction(healthInput), firstAgilityFunction(agilityInput), firstIntelligenceFunction(intelligenceInput), firstStealthFunction(stealthInput), firstStrengthFunction(strengthInput)];

    const newState = newStateArray.reduce(function (acc, fn) {
      console.log(acc);
      return acc = stateControl(fn);
    }, {})

    const character1 = { ...newState };
    const player1 = createSimpleObject(name, character1);
    console.log(player1);

    $('#test-value').text(player1[name].health);

    function createSimpleObject(name, value) {
      var obj = {};
      obj[name] = value;
      return obj;
    }

    $('#name-value').text(`Character Name: ${name}`);
    $('#health-value').text(`Health: ${player1[name].health}`);
    $('#agility-value').text(`Agility: ${player1[name].agility}`);
    $('#intelligence-value').text(`Intelligence: ${player1[name].intelligence}`);
    $('#strength-value').text(`Strength: ${player1[name].strength}`);
    $('#stealth-value').text(`Stealth: ${player1[name].stealth}`);
    $(`.hiddenOutput`).show();
    event.preventDefault();
  });

});

