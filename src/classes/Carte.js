class Carte {
    // On initialise la latitude et la longitude de mon adresse (centre de la carte)
    constructor() {
        this.monAdresse = {
            nom: "Mon adresse",
            lat: 48.785738,
            lon: 2.422402,
        };

        this.map = null;
        this.infoWindow = null;
    }
  
    // Fonction d'initialisation de la carte
    initMap() {
        var that = this;
        let alfortville = new google.maps.LatLng(that.monAdresse.lat, that.monAdresse.lon);
        // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
        this.map = new google.maps.Map(document.getElementById("map"), {
            // Nous plaçons le centre de la carte avec les coordonnées ci-dessus
            center: alfortville,
            // Nous définissons le zoom par défaut
            zoom: 11,
            gestureHandling: 'greedy',
            // Nous définissons le type de carte (ici carte routière)
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            // Nous activons les options de contrôle de la carte (plan, satellite...)
            mapTypeControl: true,
            // Nous désactivons la roulette de souris
            scrollwheel: true,
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
    
        this.infoWindow = new google.maps.InfoWindow();
    
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            var that = this;
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
        
                    //infoWindow.setPosition(pos);
                    //infoWindow.setContent("Location found.");
                    that.infoWindow.open(that.map);
                    that.map.setCenter(pos);
                },
                function () {
                    handleLocationError(true, that.infoWindow, that.map.getCenter());
                }
            )
        } else {
        // Browser doesn't support Geolocation
            handleLocationError(false, this.infoWindow, this.map.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        
        infoWindow.open(this.map);
    }
}

export {Carte};