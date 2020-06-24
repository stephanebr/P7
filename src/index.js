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
          map: map,
        });

        google.maps.event.addListener(marker, 'click', function() {
          resto1.innerHTML = restos[0].name; 
          comment1.innerHTML = restos[0].ratings[0].comment;
          resto2.innerHTML = restos[1].name; 
          comment2.innerHTML = restos[1].ratings[0].comment;
          resto3.innerHTML = restos[2].name; 
          comment3.innerHTML = restos[2].ratings[0].comment;
          resto4.innerHTML = restos[3].name; 
          comment4.innerHTML = restos[3].ratings[0].comment;
          resto5.innerHTML = restos[4].name; 
          comment5.innerHTML = restos[4].ratings[0].comment; 
        });               
      });
    })
    .catch(function (err) {
      alert(err);
    });

    var icon = './icons/adresse.png';

    var image = new google.maps.MarkerImage(
      icon,
      new google.maps.Size(71, 71),
      new google.maps.Point(0, 0),
      new google.maps.Point(17, 34),
      new google.maps.Size(25, 25));

    var markerAdresse = new google.maps.Marker({
      // A chaque boucle, la latitude et la longitude sont lues dans le tableau
      position: {
        lat: carte.monAdresse.lat,
        lng: carte.monAdresse.lon,
      },
      // On en profite pour ajouter une info-bulle contenant le nom de la ville
      title: carte.monAdresse.nom,
      map: carte.map,
      icon: image
    });
  /*}*/
};
