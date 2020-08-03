import {Map} from './classes/Map.js';
import {KEY} from '../key.js';

let map = new Map();
const TILE_SIZE = 256;
let newMarker = {};
let geocoder = new google.maps.Geocoder();

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

function elementCard(numResto, nameResto, listP, latitude, longitude) {
  let img = `<img src="https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${latitude},${longitude}&fov=80&heading=70&pitch=0&key=${KEY}"/>`;

  let card = "";

  map.listMarkers.forEach(marker => {
    map.list.forEach(star => {
      card = `<div class="card">
                  <div id="${numResto}">
                    <h5 class="mb-0">
                      <button id="resto-${nameResto}" class="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapse-${nameResto}" aria-expanded="true" aria-controls="collapse-${nameResto}">
                      </button>
                    </h5>
                  </div>

                  <div id="collapse-${nameResto}" class="collapse hidden" aria-labelledby="${nameResto}" data-parent="#accordion">
                    <div class="card-body">
                      ${displayComment(listP)}
                      <strong id="star-${marker.id}"></strong>
                      <p id="notice-${numResto}"></p>
                      ${img}
                      <button id="btn-add-${numResto}">Ajouter un avis</button>
                    </div>
                  </div>
                </div>`;
    });
  });
  
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
      map.list = map.addAverage(result);
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


      map.restosFilter = map.filterStar(map.list, 1, 5);
      displayResto(map.restosFilter);
      map.filterMarker(map.restosFilter, map.listMarkers);

      //test

      map.map.addListener("idle", function() {
        const visibleMarkers = map.listMarkers.filter(function(marker) {
            return map.map.getBounds().contains(marker.getPosition());
        }); 

        map.restoVisible = [];
        visibleMarkers.forEach(marker => {
          map.restosFilter.forEach(resto => {
             if(marker.title === resto.name) {
                 map.restoVisible.push(resto);
             }
          });       
        });

       // map.filterRestoVisible(visibleMarkers);

        displayResto(map.restoVisible);
        addNotice(map.restoVisible);
        console.log(map.restosFilter);

      });//Fin idle 

      //Ajout marker
      map.map.addListener('click', function(event) {
        let notice = firstNotice();
        console.log(notice);
        let lat = "";
        let lng = "";
        let address = "";
        let average = "";
        let ratings = [{stars: 0, comment: notice}];
        let img = `<img src="https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${event.latLng.lat()},${event.latLng.lng()}&fov=80&heading=70&pitch=0&key=${KEY}"/>`;  
              

        geocoder.geocode({
          'latLng': event.latLng
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              address = results[0].formatted_address;
            }
          }
        });

        lat = event.latLng.lat();
        lng = event.latLng.lng();

        let name = addResto(event.latLng, img);

        console.log(name)

        map.list.push({name, address, average, ratings, lat, lng});
        map.restosFilter.push({name, address, average, ratings, lat, lng});

        console.log(map.list);
        
        addNotice(map.restoVisible);
        //displayResto(map.list);
      });

    });
}

document.getElementById("min").addEventListener("input", function(e){
  if(Number(e.target.value) <= Number(document.getElementById("max").value) && Number(e.target.value) >= 0) {
    map.restosFilter = map.filterStar(map.list, Number(e.target.value), Number(document.getElementById("max").value));
    // displayResto(map.restosFilter);
    map.filterMarker(map.restosFilter, map.listMarkers);
    const visibleMarkers = map.listMarkers.filter(function(marker) {
      return map.map.getBounds().contains(marker.getPosition());
  }); 

    let restoVisible = [];
    visibleMarkers.forEach(marker => {
      map.restosFilter.forEach(resto => {
        if(marker.title === resto.name) {
            restoVisible.push(resto);
        }
      });       
    });

    displayResto(restoVisible);
  }
});

document.getElementById("max").addEventListener("input", function(e) {
  if(Number(e.target.value) <= 5 && Number(e.target.value) > Number(document.getElementById("min").value)) {
    map.restosFilter = map.filterStar(map.list, Number(document.getElementById("min").value), Number(e.target.value));
    map.filterMarker(map.restosFilter, map.listMarkers);
    const visibleMarkers = map.listMarkers.filter(function(marker) {
      return map.map.getBounds().contains(marker.getPosition());
  }); 

  let restoVisible = [];
  visibleMarkers.forEach(marker => {
    map.restosFilter.forEach(resto => {
       if(marker.title === resto.name) {
           restoVisible.push(resto);
       }
    });       
  });

  displayResto(restoVisible);
  }
});

function addNotice(listRestos) {
  let myBtn = "";
  let yourNotice = "";

  listRestos.forEach((resto, index) => {
    myBtn = document.getElementById(`btn-add-${index}`);
        //**************** */
        if(myBtn) {
          myBtn.addEventListener("click", e => {
            let star = Number(prompt("Veuillez saisir une note entre 1 et 5 : "));
            
            while(star > 5 || star < 1 || star === "" || isNaN(star)) {
              star = Number(prompt("Veuillez saisir une note entre 1 et 5 : "));
            }
    
            document.getElementById(`star-${map.listMarkers.id}`).innerHTML = star;
            yourNotice = prompt("Saisissez votre avis : ");
            document.getElementById(`notice-${index}`).innerHTML = yourNotice;

            let comment = {
              stars: star,
              comment: yourNotice
            };

            resto.ratings.push(comment);
            console.log(listRestos);
          });
        }
  });
}


// Au changement de valeur de l'input
// Appeler displayResto en changeant le min
function displayResto(listRestos) {
  let idAccordion = document.getElementById("accordion");
  idAccordion.innerHTML = "";
  listRestos.forEach((resto, index) => {
    idAccordion.innerHTML += elementCard(index, resto.name, resto.ratings, resto.lat, resto.lng);
    let idResto = document.getElementById(`resto-${resto.name}`);
    idResto.innerHTML = resto.name;    
  });
}

function placeMarker(location) {
  let name = prompt("Veuillez saisir le nom du restaurant :");

  while(name === "" || name === null) {
    name = prompt("Veuillez saisir le nom du restaurant :");
  }
  
  let marker = new google.maps.Marker({
      id: Date.now(),
      star: 1,
      position: location,
      title: name, 
      map: map.map
  });
  
  map.listMarkers.push(marker); 
  return marker;
}

function addResto(location, img) {
  let idAccordion = document.getElementById("accordion");

  newMarker = placeMarker(location);
    
  let newCard = `<div class="card">
                  <div id="0-${newMarker.id}">
                  <h5 class="mb-0">
                    <button id="resto-${newMarker.id}-${newMarker.title}" class="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapse-0${newMarker.title}" aria-expanded="true" aria-controls="collapse-0${newMarker.title}">
                    </button>
                  </h5>
                </div>

                  <div id="collapse-0${newMarker.title}" class="collapse hidden" aria-labelledby="0${newMarker.title}" data-parent="#accordion">
                    <div class="card-body">
                      <strong id="star-${newMarker.id}">${newMarker.star}</strong>
                      <p id="notice-${newMarker.id}"></p>
                      ${map.restoVisible.address}
                      ${img}
                      <button id="btn-add-${newMarker.id}">Ajouter un avis</button>
                    </div>
                    </div>
                  </div>`;

  idAccordion.innerHTML += newCard;
  let idResto = document.getElementById(`resto-${newMarker.id}-${newMarker.title}`);
  
  return idResto.innerHTML = newMarker.title;
}

function firstNotice() {
  let myBtn = "";
  let yourNotice = "";

  map.listMarkers.forEach(marker => {
    myBtn = document.getElementById(`btn-add-${marker.id}`);
    
    if(myBtn) {
      myBtn.addEventListener("click", e => {
        marker.star = Number(prompt("Veuillez saisir une note entre 1 et 5 : "));
        while(marker.star > 5 || marker.star < 1 || marker.star === "" || isNaN(marker.star)) {
          marker.star = Number(prompt("Veuillez saisir une note entre 1 et 5 : "));
        }

        document.getElementById(`star-${marker.id}`).innerHTML = marker.star;
        yourNotice = prompt("Saisissez votre avis : ");
        document.getElementById(`notice-0${marker.id}`).innerHTML = yourNotice;
      });
    }
  });
}