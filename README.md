# Bikes in the city

## About

Urbica Design analyzed the performance statistics of the city bicycle rental in 2015 for the Department of Transport of Moscow. Data on 812 000 rides at 300 rental stations were studied and analyzed taking into account each ride direction and thematic segments. The detailed analysis identified main schemes of how bicycles were used in different districts of the city and explicitly showed the dependency of weather conditions on the use of a bicycle by various categories of riders.
The data are represented in three modes:

- Research — a form of self-study of the information by several segments on the map of the city.
- Presentation — the key facts from the research are represented in the form of an animated slide-show.
- Calendar — the daily statistics on the bicycle rental performance (the total number, rates and average duration of a ride) and the influence of the weather conditions on the use of a bicycle.

The project: [urbica.co/bikes/](http://urbica.co/bikes/)
Read [the full story](https://medium.com/@Urbica.co/bicycles-in-the-city-f9529d918388#.5a50iz3pf) on Medium

## Data visualisation

- Map data — [OpenStreetMap](http://openstreetmap.org)
- The bicycles have no GPS sensors, so for visualization of routes we constructed the routes automatically using [OSRM](http://project-osrm.org)
- Data storage for visualization — [Mapbox](http://mapbox.com)
- Visualization technology [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/), graphs — [D3.js](http://d3js.org)
- Data preprocessing — Node.js, PostgreSQL/PostGIS, QGIS

## Get the stats data

The VeloBike stats data are published is under non-commercial use license.
See the special repository with datasets: [github.com/urbica/velodata/](https://github.com/urbica/velodata/)
