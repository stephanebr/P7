class Map {
    // On initialise la latitude et la longitude de mon adresse (centre de la carte)
    constructor() {
        this.myAdress = {
            name: "Mon adresse",
            lat: 48.785470,
            lon: 2.422255,
        }

        this.map = null;
        this.infoWindow = null;
    }
  
    // Fonction d'initialisation de la carte
    initMap() {
        let that = this;
        let alfortville = new google.maps.LatLng(that.myAdress.lat, that.myAdress.lon);
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
            // Nous activons la roulette de souris
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
    
        this.locationMyPosition();
    }

    idleMarker(listMarkers) {
        let that = this;
        that.map.addListener("idle", function() {
            listMarkers.forEach((elementMarker, index) => {
                that.map.getBounds().contains(elementMarker.getPosition());
                console.log(that.map.getBounds().contains(elementMarker.getPosition()) + " " + elementMarker.title);

                if(that.map.getBounds().contains(elementMarker.getPosition()) === false) {
                    let resto = 
                    document.querySelector(`div.card #resto-${elementMarker.title}`);
                    resto.parentElement.parentElement.parentElement.style.display = 'none';
                    resto.style.display = 'none';
                } else {
                    let restoVisible = 
                    document.querySelector(`div.card #resto-${elementMarker.title}`);
                    restoVisible.parentElement.parentElement.parentElement.style.display = 'block'
                    restoVisible.style.display = 'block';
                }
            });
          });
    }
    

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 
                              "Error: The Geolocation service failed." : 
                              "Error: Your browser doesn't support geolocation.");
        
        infoWindow.open(this.map);
    }

    locationMyPosition() {
        this.infoWindow = new google.maps.InfoWindow();
    
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            let that = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                    let pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    let icon = {
                        url: './icons/adresse.png', // url
                        scaledSize: new google.maps.Size(30, 30), // scaled size
                       };
                
                    let marker = new google.maps.Marker({
                          position: new google.maps.LatLng(pos.lat, pos.lng),
                          map: that.map,
                          icon: icon
                        });
        
                    that.infoWindow.setPosition(pos);
                    that.infoWindow.setContent("Ma position.");
                    that.infoWindow.open(that.map);
                    that.map.setCenter(pos);
                }, function () {
                    handleLocationError(true, that.infoWindow, that.map.getCenter());
                }
            )
        } else {
        // Browser doesn't support Geolocation
            handleLocationError(false, this.infoWindow, this.map.getCenter());
        }

    }    
}

export {Map};