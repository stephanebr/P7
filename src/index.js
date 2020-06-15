let restaurants = [{
  "name":"Bronco",
  "address":"39 Rue des Petites Écuries, 75010 Paris",
  "lat":48.8737815,
  "lon":2.3501649,
  "ratings":[
     {
        "stars":4,
        "comment":"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
     },
     {
        "stars":5,
        "comment":"Tout simplement mon restaurant préféré !"
     }
  ]
},
{
  "name":"Babalou",
  "address":"4 Rue Lamarck, 75018 Paris",
  "lat":48.8865035,
  "lon":2.3442197,
  "ratings":[
     {
        "stars":5,
        "comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
     },
     {
        "stars":3,
        "comment":"J'ai trouvé ça correct, sans plus"
     }
  ]
},
{
"name":"Ratacaba",
"address":"177B Rue Paul Vaillant Couturie, 94140 Alfortville",
"lat":48.804752,
"lon":2.419906,
"ratings":[
   {
      "stars":5,
      "comment":"Très sympa, accueil chaleureux"
   },
   {
      "stars":5,
      "comment":"Excellent"
   }
]
},
{
"name":"Kalabale",
"address":"206 Rue Paul Vaillant Couturier, 94140 Alfortville",
"lat":48.802038,
"lon":2.421537,
"ratings":[
   {
      "stars":4,
      "comment":"Une minuscule pizzeria délicieuse cachée pas loin du centre ville !"
   },
   {
      "stars":4,
      "comment":"Très bon"
   }
]
},
{
"name":"Farfafouille",
"address":"71 Quai Blanqui, 94140 Alfortville",
"lat":48.800992, 
"lon":2.417717,
"ratings":[
   {
      "stars":5,
      "comment":"Une minuscule pizzeria délicieuse !"
   },
   {
      "stars":3,
      "comment":"J'ai trouvé ça correct, sans plus"
   }
]
}];

// On initialise la latitude et la longitude de Paris (centre de la carte)
var lat = 48.852969;
var lon = 2.349903;
var map = null;
// Fonction d'initialisation de la carte
function initMap() {
  var paris = new google.maps.LatLng(lat, lon);
  // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
  map = new google.maps.Map(document.getElementById("map"), {
    // Nous plaçons le centre de la carte avec les coordonnées ci-dessus
    center: new google.maps.LatLng(lat, lon), 
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
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
    },
    // Activation des options de navigation dans la carte (zoom...)
    navigationControl: true, 
    navigationControlOptions: {
      // Comment ces options doivent-elles s'afficher
      style: google.maps.NavigationControlStyle.ZOOM_PAN 
    }
  });

  var coordInfoWindow = new google.maps.InfoWindow();
  coordInfoWindow.setContent(createInfoWindowContent(paris, map.getZoom()));
  coordInfoWindow.setPosition(paris);
  coordInfoWindow.open(map);

  map.addListener('zoom_changed', function() {
    coordInfoWindow.setContent(createInfoWindowContent(paris, map.getZoom()));
    coordInfoWindow.open(map);
  });
}

const TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
  var scale = 1 << zoom;

  var worldCoordinate = project(latLng);

  var pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale),
      Math.floor(worldCoordinate.y * scale));

  var tileCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale / TILE_SIZE),
      Math.floor(worldCoordinate.y * scale / TILE_SIZE));

  return [
    'Paris, IL',
    'LatLng: ' + latLng,
    'Zoom level: ' + zoom,
    'World Coordinate: ' + worldCoordinate,
    'Pixel Coordinate: ' + pixelCoordinate,
    'Tile Coordinate: ' + tileCoordinate
  ].join('<br>');
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
  var siny = Math.sin(latLng.lat() * Math.PI / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

window.onload = function(){
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  initMap();
  
  let comments = document.getElementById('commentaire');

  // Nous parcourons la liste des villes
  for(restaurant in restaurants) {
    var marker = new google.maps.Marker({
      // A chaque boucle, la latitude et la longitude sont lues dans le tableau
      position: {lat: restaurants[restaurant].lat, lng: restaurants[restaurant].lon},
      // On en profite pour ajouter une info-bulle contenant le nom de la ville
      title: restaurants[restaurant].name,
      map: map
    });
    
    console.log(restaurants[restaurant].name); 
    
    restaurants[restaurant].ratings.forEach(element => {
      console.log(element.comment);

      comments.innerHTML += restaurants[restaurant].name + '<br>' + element.comment + '<br>';
       
    });


  }

let restos = [];

console.log("1");
 fetch("restaurants.json")
   .then(
      function(data){
         return data.json()
      })
   .then((result) => {
      restos = result;
      comments.innerHTML = restos[0].name;
      console.log("2");
   })
   .catch(function(err) {
      alert(err);
   });
console.log("3");
};