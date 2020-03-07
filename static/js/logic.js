var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
// d3.json(queryUrl,function(data){
//     createFeatures(data.features);
// })

// function createFeatures(earthquakeData) {

//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of the earthquake
//     function onEachFeature(feature, layer) {


//       layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//     }
    


    
   
    
//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature
//     });
  
//     // Sending our earthquakes layer to the createMap function
//     createMap(earthquakes);
//   }
  
//   function createMap(earthquakes) {
  
//     // Define streetmap and darkmap layers
//     var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.streets",
//       accessToken: API_KEY
//     });
  
//     var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.dark",
//       accessToken: API_KEY
//     });


    
//     // Define a baseMaps object to hold our base layers
//     var baseMaps = {
//       "Street Map": streetmap,
//       "Dark Map": darkmap
//     };
  
//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//       Earthquakes: earthquakes
//     };
  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map("map", {
//       center: [
//         37.09, -95.71
//       ],
//       zoom: 5,
//       layers: [streetmap, earthquakes]
//     });
        
//           // Add our marker cluster layer to the map
          

//     // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(myMap);


//   }
  




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

info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

info.addTo(myMap);

d3.json(queryUrl, function(response) {
    
  // Create a new marker cluster group
  // var markers = L.markerClusterGroup();

  // Loop through data
      var location = response.features;
  //   console.log(location)
  location.forEach(element => {
      console.log(`this is the element ${element.geometry.coordinates[1]}`)
      
      var color = "";
      if (element.properties.mag > 5) {
        color = "#b30000";
      }
      else if (element.properties.mag > 4) {
        color = "#e34a33";
      }
      else if (element.properties.mag > 3) {
        color = "#fc8d59";
      }
      else if (element.properties.mag > 2) {
        color = "#fdbb84";
      }
      else if (element.properties.mag > 1) {
        color = "#fdd49e";
      }
      else {
        color = "#fef0d9";
      }
    
    //   if (location) {

    //   // Add a new marker to the cluster group and bind a pop-up
    //   markers.addLayer(L.marker([parseFloat(element.geometry.coordinates[1]), parseFloat(element.geometry.coordinates[0])])
    //     .bindPopup(element.properties.mag));
    // }

    L.circle([parseFloat(element.geometry.coordinates[1]), parseFloat(element.geometry.coordinates[0])], {
      fillOpacity: 0.85,
      color: color,
      fillColor: color,
      // Adjust radius
      radius: parseFloat(element.properties.mag) * 15000
      // radius: 1000
    }).addTo(myMap);
      


    
  });
    // Check for location property


  // }

  // Add our marker cluster layer to the map
  // myMap.addLayer(markers);

});
