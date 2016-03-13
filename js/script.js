  var basemapUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

  var myMap = L.map('myMap', {
      scrollWheelZoom: false
      }).setView( [40.721762,-74.000473], 10);
  
      L.tileLayer(basemapUrl,{
      attribution: attribution
      }).addTo(myMap);

  var geojson;

  function getColor(cbs_percent_00_10) {
    return cbs_percent_00_10 < -10  ? '#762a83' :
           cbs_percent_00_10 < -5  ? '#af8dc3' :
           cbs_percent_00_10 < -1  ? '#e7d4e8' :
           cbs_percent_00_10 > 1   ? '#d9f0d3' :
           cbs_percent_00_10 > 5   ? '#7fbf7b' :
           cbs_percent_00_10 > 10   ? '#1b7837' :
                      '#FFEDA0';
}

  function style(feature) {
    return {
        fillColor: getColor(feature.properties.cbs_percent_00_10),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

  function mouseoverFunction(e) {
  var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    console.log(layer.feature.properties.name);
    $('#infoWindow').text(layer.feature.properties.name);
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        click: zoomToFeature
   });
  }

    $.getJSON('comdata.geojson', function(data) {
      geojson = L.geoJson(data,{
      style: style,
      onEachFeature: onEachFeature
      }).addTo(myMap);
  
  })


