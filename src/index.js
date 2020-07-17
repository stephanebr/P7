import {Map} from './classes/Map.js';

let map = new Map();
const TILE_SIZE = 256;

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
  let siny = Math.sin((latLng.lat() * Math.PI) / 180);

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
  let card = `<div class="card">
                <div id="${numResto}">
                  <h5 class="mb-0">
                    <button id="resto-${nameResto}" class="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapse-${nameResto}" aria-expanded="true" aria-controls="collapse-${nameResto}">
                    </button>
                  </h5>
                </div>

                <div id="collapse-${nameResto}" class="collapse hidden" aria-labelledby="${nameResto}" data-parent="#accordion">
                  <div class="card-body">
                    ${displayComment(listP)}
                  </div>
                </div>
              </div>`;
  return card;
}

window.onload = function () {
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  map.initMap();

  fetch("restaurants.json")
    .then(function (data) {
      return data.json();
    })
    .then((result) => {
      map.restos = result;
      map.list = map.addAverage(map.restos);
      // Nous parcourons la liste des villes
      map.list.forEach((resto, ind) => {
        let marker = new google.maps.Marker({
          // A chaque boucle, la latitude et la longitude sont lues dans le tableau
          position: {
            lat: resto.lat,
            lng: resto.lng
          },
          // On en profite pour ajouter une info-bulle contenant le nom de la ville
          title: resto.name,
          map: map.map,
        });

        map.listMarkers.push(marker);
       });

       displayResto(map.filterStar(map.list, 1, 5));
      
       //map.idleMarker(listMarkers);
       //displayMarker(map.listMarkers);

       //map.filterMarker(map.list, map.listMarkers);

       //console.log(idleFilterMarker(map.listMarkers, 1, 5));
    });
}

document.getElementById("min").addEventListener("input", function(e){
  if(Number(e.target.value) <= 5 && Number(e.target.value) > 0) {
    displayResto(map.filterStar(map.list, Number(e.target.value), 5));
    //displayMarker(idleFilterMarker(map.listMarkers, Number(e.target.value), 5));
    map.filterMarker(map.list, map.listMarkers);
  }
});

// Au changement de valeur de l'input
// Appeler displayResto en changeant le min
function displayResto(listRestos) {
  let idAccordion = document.getElementById("accordion");
  idAccordion.innerHTML = "";
  listRestos.forEach((resto, index) => {
    idAccordion.innerHTML += elementCard(index, resto.name, resto.ratings);
    let idResto = document.getElementById(`resto-${resto.name}`);
    idResto.innerHTML = resto.name;    
  });
}

function displayMarker(listMarkers) {
  map.map.addListener("idle", function() {
    listMarkers.forEach((elementMarker, index) => {
        map.map.getBounds().contains(elementMarker.getPosition());
        console.log(map.map.getBounds().contains(elementMarker.getPosition()) + " " + elementMarker.title + " " + elementMarker.average);
    });
  });
}

function idleFilterMarker(listMarker, min, max) {
  return listMarker.filter(marker => marker.average >= min && marker.average <= max);
}