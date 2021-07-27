import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


// This function stores our state.
//save the partially executed state. 
const storeState = () => {
  let currentState = {feed: 10, blueFood : 20, hydrate:30 };
  // console.log(currentState);
  return (changeState = state => state) => {   //"changeState is tice inner fucntion - all it needs is 3rd arguemnt to execute" 
  // return (changeState) => {   //declaring 
    const newState = changeState(currentState);   //changeState("feed")(1)(currentState)
    console.log(currentState);
    // console.log(newState);
    currentState = {...newState};
    return newState;
  }
}


const stateControl = storeState();   //stores inner fucntion from line-8; we pass "feed" to this  ==> const newState = stateControl(feed); - here 
//we are passing to inner fucntion the "changeState" function
//const feed = changeState("feed")(1);
//key-1: stateControl(feed);   === stateControl(  changeState("feed")(1)  );
//key-2: const newState = stateControl(feed);

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
//obj = {feed:0 }

const changeState = (prop) => { //changeState("feed")(1)(currentState)    //fucntion that lets us alter the values of differnt properties (hence the name) ==> const feed = changeState("feed")(1);
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

//obj = {feed:0, blueFood:0, hydrate:0, superWater:0 }
//const feed = changeState("feed")(1); //PO: at this point this to an object - access to last statement that takes object as an arg - not executing last statement

const changePlant = (prop) => { 
  return (value) => {
    return (plant) => ({
      ...plant,
      [prop] : value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.

const feed = changeState("feed")(1);
console.log(feed);
const blueFood = changeState("blueFood")(5);
const hydrate = changeState("hydrate")(1);
const superWater = changeState("hydrate")(5);
// const salim = changeState("salim")(50); 

//obj = {feed:0, blueFood:0, hydrate:0, superWater:0 }
const newPlant = changePlant("name")("roses");
console.log(Object.values(newPlant));

$(document).ready(function() {
  // const currentState = stateControl();
  // $('#plant-names').text(`Name: ${currentState.plant}`);
// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.


  $('#health').click(function() {
    const newState = stateControl(feed);
    feed(state);
    $('#health2').text(`health: ${newState.feed}`);
  });

  $('#blueFood').click(function() {
    const newState = stateControl(blueFood);
    $('#blueFood2').text(`blueFood: ${newState.blueFood}`);
  });

  $('#hydrate').click(function() {
    const newState = stateControl(hydrate); // passing an objects property and value only. 
    console.log(newState)
    $('#hydrate2').text(`Water: ${newState.hydrate}`);
    // $('#hydrate2').text(`Water: ${newState.salim}`);
  });

  $('#superWater').click(function() {
    const newState = stateControl(superWater)
    $('#hydrate2').text(`Water: ${newState.hydrate}`);
  });

// This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
    // $('#water-value').text(`Water: ${currentState.water}`);
  });
});