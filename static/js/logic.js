var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(queryUrl,function(data){
    createFeatures(data.features);
})

function createFeatures(earthquakeData){

    








}