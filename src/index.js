import {Carte} from './classes/Carte.js';

let carte = new Carte();
const TILE_SIZE = 256;

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
  var siny = Math.sin((latLng.lat() * Math.PI) / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return new google.maps.Point(
    TILE_SIZE * (0.5 + latLng.lng() / 360),
    TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
  );
}

window.onload = function () {
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  carte.initMap();

  let resto1 = document.getElementById("resto-1");
  let comment1 = document.getElementById("collapseOne");
  let resto2 = document.getElementById("resto-2");
  let comment2 = document.getElementById("collapseTwo");
  let resto3 = document.getElementById("resto-3");
  let comment3 = document.getElementById("collapseThree");
  let resto4 = document.getElementById("resto-4");
  let comment4 = document.getElementById("collapseFoor");
  let resto5 = document.getElementById("resto-5");
  let comment5 = document.getElementById("collapseFive");
  let restos = [];
  let resto = d.namer

  fetch("restaurants.json")
    .then(function (data) {
      return data.json();
    })
    .then((result) => {
      restos = result;
      // Nous parcourons la liste des villes
      restos.forEach((resto) => {
        var marker = new google.maps.Marker({
          // A chaque boucle, la latitude et la longitude sont lues dans le tableau
          position: {
            lat: resto.lat,
            lng: resto.lng,
          },
          // On en profite pour ajouter une info-bulle contenant le nom de la ville
          title: resto.name,
          map: carte.map,
        });
        //displayResto(1,5);
      })
    })
  /*}*/
};

displayResto(min, max) {
  foreach resto 
    if resto.rating < min || resto.rating > max
      if let elem = document.getElementById(resto.name) {
        elem.display none
      }
      
} else {
  if let elem = document.getElementById(resto.nme)
  if elem is undefined
  createElement ....... 
}

}