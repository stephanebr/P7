// On initialise la latitude et la longitude de mon adresse (centre de la carte)
var monAdresse = {
  nom: "Mon adresse",
  lat: 48.785738,
  lon: 2.422402,
};

var map = null;
var infoWindow = null;

// Fonction d'initialisation de la carte
function initMap() {
  var alfortville = new google.maps.LatLng(monAdresse.lat, monAdresse.lon);
  // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
  map = new google.maps.Map(document.getElementById("map"), {
    // Nous plaçons le centre de la carte avec les coordonnées ci-dessus
    center: new google.maps.LatLng(monAdresse.lat, monAdresse.lon),
    // Nous définissons le zoom par défaut
    zoom: 11,
    // Nous définissons le type de carte (ici carte routière)
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // Nous activons les options de contrôle de la carte (plan, satellite...)
    mapTypeControl: true,
    // Nous désactivons la roulette de souris
    scrollwheel: false,
    mapTypeControlOptions: {
      // Cette option sert à définir comment les options se placent
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    },
    // Activation des options de navigation dans la carte (zoom...)
    navigationControl: true,
    navigationControlOptions: {
      // Comment ces options doivent-elles s'afficher
      style: google.maps.NavigationControlStyle.ZOOM_PAN,
    },
  });

  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        //infoWindow.setPosition(pos);
        //infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}

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
  initMap();

  let resto1 = document.getElementById("list-restaurant-1-list");
  let comment1 = document.getElementById("list-restaurant-1");
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
        
        resto.ratings.forEach((element) => {
          resto1.innerHTML = resto.name; //+ "<br>" + element.comment + "<br>";
          comment1.innerHTML = element.comment;
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
        lat: monAdresse.lat,
        lng: monAdresse.lon,
      },
      // On en profite pour ajouter une info-bulle contenant le nom de la ville
      title: monAdresse.nom,
      map: map,
      icon: image
    });
  /*}*/
};
