var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var layers = {
  zeroToOne: new L.LayerGroup(),
  oneToTwo: new L.LayerGroup(),
  twoToThree: new L.LayerGroup(),
  threeToFour: new L.LayerGroup(),
  fourToFive: new L.LayerGroup(),
  fivePlus: new L.LayerGroup()
}

var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [
    layers.zeroToOne,
    layers.oneToTwo,
    layers.twoToThree,
    layers.threeToFour,
    layers.fourToFive,
    layers.fivePlus
  ]
});
streetmap.addTo(myMap);

var overlays = {
  "0-1":layers.zeroToOne,
  "1-2":layers.oneToTwo,
  "2-3":layers.twoToThree,
  "3-4":layers.threeToFour,
  "4-5":layers.fourToFive,
  "5+":layers.fivePlus
  
}

L.control.layers(null, overlays).addTo(myMap);
var info = L.control({
  position: "bottomright"
});


d3.json(queryUrl, function(response) {
    
    // Create a new marker cluster group

    // Loop through data
        var location = response.features;

  
    location.forEach(element => {
        console.log(`this is the element ${element.geometry.coordinates[1]}`)
        
        var color = "";
        var magitude = element.properties.mag;
        var layerName = ""
  
        if (magitude > 5) {
          color = "#b30000";
          layerName = "fivePlus"
  
        }
        else if (magitude > 4) {
          color = "#e34a33";
          layerName = "fourToFive"
        }
        else if (magitude > 3) {
          color = "#fc8d59";
          layerName = "threeToFour"
        }
        else if (magitude > 2) {
          color = "#fdbb84";
          layerName = "twoToThree"
        }
        else if (magitude > 1) {
          color = "#fdd49e";
          layerName = "oneToTwo"
        }
        else {
          color = "#fef0d9";
          layerName = "zeroToOne"
        }

      
      var circles = L.circle([parseFloat(element.geometry.coordinates[1]), parseFloat(element.geometry.coordinates[0])], {
        fillOpacity: 0.85,
        color: color,
        fillColor: color,
        // Adjust radius
        radius: parseFloat(element.properties.mag) * 15000
        // radius: 1000
      })
    // }).addTo(myMap);
      circles.addTo(layers[layerName])
  
  
    });

  
  });