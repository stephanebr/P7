import {Carte} from './classes/Carte.js';

let carte = new Carte();
const TILE_SIZE = 256;
let numResto = 0;
let numIdCollapse = 0;

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

function elementCard(nameResto, comment) {
  let numHeading = 0;
  let numDataTarget = 0;
  let numAriaControls = 0;
  let numAriaLabelldby = 0;
  let card = `<div class="card">
                <div id="${numHeading++}">
                  <h5 class="mb-0">
                    <button id="resto-${numResto++}" class="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapse-${numDataTarget++}" aria-expanded="true" aria-controls="collapse-${numAriaControls++}">
                      ${nameResto}
                    </button>
                  </h5>
                </div>

                <div id="collapse-${numIdCollapse++}" class="collapse show" aria-labelledby="${numAriaLabelldby++}" data-parent="#accordion">
                  <div class="card-body">
                    ${comment}
                  </div>
                </div>
              </div>`;
  return card;
}

window.onload = function () {
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  carte.initMap();
  
  let restos = [];
  
  //let resto = d.namer


var icon = {
        url: './icons/adresse.png', // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
       };

var iconBase = './icons/adresse.png';
var marker = new google.maps.Marker({
          position: new google.maps.LatLng(carte.monAdresse.lat, carte.monAdresse.lon),
          map: carte.map,
          icon: icon
        });

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
        resto.ratings.forEach(element => {
          console.log(elementCard(resto.name, element.comment));
          let idAccordion = document.getElementById("accordion");
          console.log(idResto);
          console.log(idComment);
          idAccordion.innerHTML = elementCard(idResto.innerHTML = resto.name, idComment.innerHTML = element.comment);
          let idResto = document.getElementById(`resto-1`);
          let idComment = document.getElementById(`collapse-1`);

        });
        

        
        
        
      })
    })
  /*}*/
};

/*displayResto(min, max) {
  foreach resto 
    if resto.rating < min || resto.rating > max
      if let elem = document.getElementById(resto.name) {
        elem.display none
      }
      
} else {
  if let elem = document.getElementById(resto.nme)
  if elem is undefined
  createElement ....... 
}*/

//}