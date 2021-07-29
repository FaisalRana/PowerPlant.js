import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


export const setPoints = () => {
  const points = 100;
  document.querySelector("#pointCount").innerText  = points;
}

export const pointTracker = () => {
  let points = document.querySelector("#pointCount").innerText;
  points -= 1;
  $('#pointCount').text(points);
}


