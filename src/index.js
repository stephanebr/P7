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

function displayComment (listComments) {
  let result = "";
  listComments.forEach(element => {
   result += `<strong>${element.stars}</strong><p> ${element.comment} </p>`;
  });

  return result;
 }

function elementCard(numResto, nameResto, listP) {
  console.log("numresto : " , numResto);
  console.log("nameresto : ", nameResto);
  console.log("comment : " , listP);

  let card = `<div class="card">
                <div id="${numResto}">
                  <h5 class="mb-0">
                    <button id="resto-${nameResto}" class="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapse-${nameResto}" aria-expanded="true" aria-controls="collapse-${nameResto}">
                    </button>
                  </h5>
                </div>

                <div id="collapse-${nameResto}" class="collapse show" aria-labelledby="${nameResto}" data-parent="#accordion">
                  <div class="card-body">
                    ${displayComment(listP)}
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
      restos.forEach((resto, ind) => {
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

        let idAccordion = document.getElementById("accordion");
        idAccordion.innerHTML += elementCard(ind, resto.name, resto.ratings);
        let idResto = document.getElementById(`resto-${resto.name}`);
        idResto.innerHTML = resto.name;

        

        
        
        
      });
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