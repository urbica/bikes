var Requests = {
    QueryString : function(item){
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
};

//detecting language
function detectLang() {
    var tlang = "en";
    if(Requests.QueryString("l") === "ru" || Requests.QueryString("l") === "ru/") {
        tlang = "ru";
    } else {
        var dlang = navigator.language || navigator.userLanguage;
        if(dlang=="ru" || dlang=="ru-RU") tlang = "ru";
    }
    return tlang;
}

var orign = Requests.QueryString("orign");
var l = detectLang(); //setting the language
var pState = {stateId: "total"}; //prevous state
var cState = {stateId: "total"}; //current state
var interval, isKeynote = false,
    m = "explore", //mode: explore | demo
    currentSlide = 0, //current scene in the siquence
    slidesSpeed = 11500; //demo-mode speed in milliseconds

function toArray(_Object){
       var _Array = new Array();
       for(var name in _Object){
               _Array[name] = _Object[name];
       }
       return _Array;
}

var tooltip = d3.select("body")
	.append("div")
	.style("visibility", "hidden")
	.attr("id", "tooltip")
	.text("");



mapboxgl.accessToken = 'pk.eyJ1IjoibWluaWthcm1hIiwiYSI6IjBhYjUzYWE4NjY4ZjkwYjM5Y2JjZTkyMTEwMzZkNTA1In0.zDqI_pymt9GAXoZlyz5Hrw';
mapboxgl.util.getJSON('./styles/velobike.json', function (err, style) {
  if (err) throw err;

  d3.json("./data/stations_all.json", function(stations) {
    //statements
    //creating stations_index;
    var idx = [];
    stations.forEach(function(d,i){
      idx[d.code] = i;
    });

    var demoMode = d3.select("#demoMode"),
        exploreMode = d3.select("#exploreMode"),
        demoModeBtn = d3.select("#demoModeBtn"),
        exploreModeBtn = d3.select("#exploreModeBtn"),
        fullscreenBtn = d3.select("#fullscreen");

        if(orign === "afisha" || orign === "afisha/") {
          fullscreenBtn.style("visibility", "visible");
        }


    d3.select("#logoLink").text(lang.logoLink[l]);



    demoModeBtn.on('click', function(d){ changeMode("demo"); });
    exploreModeBtn.on('click', function(d){ changeMode("explore"); });

    var mapArea = d3.select("#map"),
        panelStates = d3.select("#states-panel"),
        tooltip = d3.select("#tooltip"),
        panel = d3.select("#content-panel"),
        panelContent = d3.select("#content-panel"),
        legendBlock = d3.select("#legend-panel")
        title = d3.select("#title").text("");

    var input_format = d3.time.format("%Y-%m-%d %H:%M:%S");
    var ourput_format = d3.time.format("%d.%m");
    //2015-05-01 01:27:30

    if(!m) changeMode("explore");
      else changeMode(m);

    function getMenu() {
        panelStates.text("");
        menu.forEach(function(s,i) {

          var item = panelStates.append("div");
          if (s.class == "header") {
            item
            .attr("class", "menu-header")
            .text(s.title[l]);
          } else {
          item
          .attr("class", "menu-item")
          .attr("id", s.stateId)
          .text(s.title[l])
          .on('click', function(e) {
            if(isKeynote) changeMode("explore");
            changeState({stateId: s.stateId});
           });
          }

        });
    }


        d3.select(".mapboxgl-ctrl-attrib").style("background", "#000");

    getMenu();

    // Set the global transition property in the stylesheet
    style.transition = {
      duration: 1000, //
      delay: 0
    };

    var map = new mapboxgl.Map({
      container: 'map',
      style: style,
      center: [37.622468, 55.753544],
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
  	bearing: 0
    });

    map.on('style.load', function () {
      changeState({stateId: "total"});
    });

    map.on('mousemove', function (e) {
      // query the map for the under the mouse
      map.featuresAt(e.point, { radius: 10,  includeGeometry: true }, function (err, features) {
        if (err) throw err
        //
        if(features.length>0) {
          d3.select(".mapboxgl-canvas").style({
            cursor: "pointer"
          });
          tooltip
            .style("top", (e.point.y+15)+"px")
            .style("left",(e.point.x+15)+"px")
            .style("visibility", "visible");

        if(features[0].properties.code) {
          if(l == "ru") {
            tooltip.text('#' + features[0].properties.code + ": " + features[0].properties['name']);
          } else {
            tooltip.text('Station #' + features[0].properties.code);
          }

        }
          if(features[0].properties.district_rides) {
              tooltip.text(features[0].properties['name_'+l]);
          }
      } else {
        d3.select(".mapboxgl-canvas").style({
          cursor: "-webkit-grab"
        });
        tooltip
          .style("visibility", "hidden");
        }
      })
    });

    map.on('click', function (e) {
      // query the map for the under the mouse

      if(isKeynote) changeMode("explore");

      map.featuresAt(e.point, { radius: 10}, function (err, features) {
        if (err) throw err
        //
        if(features.length>0) {
          //if the object is station
          if(features[0].properties.code) {
            changeState({stateId: 'station', station: features[0].properties.code });
            getPanel({station: features[0].properties });
          }

          //if the object is the district
          if(features[0].properties.district_rides) {
            changeState({stateId: 'district', district: features[0].properties.id });
            getPanel({district: features[0].properties });
          }

      } else {
        getPanel();
        }
      });
    });


    function changeMode(mode) {
      if(mode === "demo") {
        if(!isKeynote) {
          interval = setInterval(getSlides, slidesSpeed);
          map.flyTo({
                center: [37.609367701865324,55.76494759216348],
                zoom: 10,
                speed: 0.04
              })
          demoMode.attr("class", "mode-selected");
          exploreMode.attr("class", "mode");
        }
        panelStates.style("visibility", "hidden");
        isKeynote = true;
      } else {
        clearInterval(interval);
        panelContent.style("visibility", "hidden");
        panelStates.style("visibility", "visible");
        isKeynote = false;
        demoMode.attr("class", "mode");
        exploreMode.attr("class", "mode-selected");
      }
    }


    function changeState(state) {


      //setting visibility param
      panelContent.style("visibility","hidden");

      if(!state.station && !state.district) pState = state;

      map.batch(function (batch) {
        map.style.stylesheet.layers.forEach(function(maplayer,i) {
          //"velobike"
          if(maplayer.source == "velobike") {
            if(maplayer.id != "metro")
              batch.setLayoutProperty(maplayer.id, "visibility", "none");
          }
        });
      });

      if(state.flyTo) map.flyTo(state.flyTo);

      states.forEach(function(s,i){

        d3.select("#"+s.state).attr("class", "menu-item");
        d3.select("#"+s.state).style("backround", "none");
        if(i == (states.length-1)) d3.select("#"+s.state).style("border", "none");


        if(s.state == state.stateId) {
          title.text(s.label[l]);
            legendBlock.style("visibility", "visible").text("");
            if(s.legend) {
              var legendImageBlock = legendBlock.append("div");
                legendImageBlock.attr("class", "legend-block");
                legendImageBlock.append("div").attr("class","legend-min-value").text(s.legend.min[l]);

                var legendImage = legendImageBlock.append("div").attr("class","legend-image")
                    .append("img")
                    .attr("src", "img/"+s.legend.image);
                legendImageBlock.append("div").attr("class","legend-max-value").text(s.legend.max[l]);
          } else {
            legendBlock.style("visibility", "hidden");
            legendBlock.text("");
          }
          d3.select("#"+s.state).attr("class", "menu-item-selected");
          map.batch(function (batch) {

            //switching off all layers
            s.layers.forEach(function(layer,i){
              batch.setLayoutProperty(layer.id, "visibility", "visible");

              //setting the layer filter
              if(layer.filter) {
                  batch.setFilter(layer.id, layer.filter);
              }
              //setting layout properties of layer
              if(layer.layout) {
                Object.keys(layer.layout).forEach(function(key) {
                  batch.setLayoutProperty(layer.id, key, layer.layout[key]);
                });
              }

              //setting paint properties of layer
              if(layer.paint) {
                Object.keys(layer.paint).forEach(function(key) {
                  batch.setPaintProperty(layer.id, key, layer.paint[key]);
                });
              }

            });

            if(state.stateId == "districts_local") batch.setLayoutProperty("districts_labels", "text-field", "{name_"+l+ "} {local_rides_percent}%");
            if(state.stateId == "districts_traffic") batch.setLayoutProperty("districts_labels", "text-field", "{name_"+l+ "}");

          });
        }
      });


      if(state.description) {
        if(isKeynote) {
          panelContent.style("visibility","visible");
          panelContent.text("");
          panelContent.append("div").attr("class", "description").text(state.description);
        }
      }

      if(state.district) {

        map.batch(function (batch) {
//        batch.setFilter("velobike_station_point", ["all", ["==", "code", state.station]]);
          batch.setFilter("velobike_districts_all", ["all", ["!=", "id", state.district]]);
          batch.setFilter("velobike_districts_1", ["all", ["==", "id", state.district]]);
          batch.setFilter("velobike_station_point", ["all", ["==", "district", +state.district]]);
          batch.setFilter("velobike_station_circle_1", ["all", ["==", "district", +state.district]]);
          batch.setFilter("velobike_station_circle_0", ["all", ["!=", "district", +state.district]]);
          batch.setFilter("velobike_directions_2", ["all", ["==", "source_district", +state.district], ["!=", "destination_district", +state.district]]);
          batch.setFilter("velobike_directions_3", ["all", ["==", "source_district", +state.district], ["==", "destination_district", +state.district]]);
        });
      }

      if(state.station) {

        var code = stations[idx[state.station]].code;

        var scale2x = stations[idx[state.station]].departures/150,
            scale = stations[idx[state.station]].departures/200,
            circleScale = Math.sqrt(stations[idx[state.station]].departures/10);
            map.batch(function (batch) {
              batch.setFilter("velobike_station_point", ["all", ["==", "code", state.station]]);
              batch.setFilter("velobike_station_circle_1", ["all", ["==", "code", state.station]]);
              batch.setFilter("velobike_station_circle_2", ["all", ["!=", "code", state.station]]);
              batch.setPaintProperty("velobike_station_circle_1", "circle-radius", circleScale);
              batch.setFilter("velobike_directions_1", ["all", ["==", "source", code], [">=", "total", scale2x]]);
              batch.setFilter("velobike_directions_2", ["all", ["==", "source", code], [">=", "total", 0]]);
              batch.setFilter("velobike_directions_3", ["all", ["==", "destination", code], [">=", "total", scale2x]]);
              batch.setFilter("velobike_directions_4", ["all", ["==", "destination", code], [">=", "total", scale]]);
            });

        title.text("#"+ code +": " + stations[idx[code]].name);
        if(!state.flyTo) {
          map.flyTo({
            center: [stations[idx[code]].lon,stations[idx[code]].lat],
            //zoom: map.getZoom()< 14 ? map.getZoom()+1 : map.getZoom(),
            speed: 0.7
          });
        }
        //getPanel(code);
      }

    }

    function getSlides() {
      if(currentSlide >= (keynote.length)) currentSlide = 0;
      changeState(keynote[currentSlide]);
      currentSlide += 1;
    }

    function getPanel(item) {
      if(item) {
        panel.text("");
        panelContent.append("div").attr("id", "closeBtn").on('click', function () {
            if(!isKeynote) {
              changeState(pState);
              panelStates.style("visibility", "visible");
            }
          });
        panelStates.style("visibility", "hidden");
        panel.style("visibility","visible");


        if(item.station) {

          var i = idx[item.station.code],
              startTime = input_format.parse(stations[i].start),
              startTimeOutput = ourput_format(startTime);

              title.text(lang.bikeStation[l] + " #" + item.station.code);

                var panelParamTotal = panel.append("div").attr("class", "param"),
                    panelParamAverage = panel.append("div").attr("class", "param"),
                    panelParamRoundtrips = panel.append("div").attr("class", "param"),
                    panelParamUnique = panel.append("div").attr("class", "param"),
                    panelParamStartTime = panel.append("div").attr("class", "param"),
                    panelParamCapacity = panel.append("div").attr("class", "param"),
                    //panelParamSubwayDistance = panel.append("div").attr("class", "param"),
                    panelParamHours = panel.append("div"),
                    panelParamDays = panel.append("div");


                panelParamTotal
                  .append("div").attr("class", "value")
                  .text(stations[i].departures);

                panelParamTotal
                  .append("div").attr("class", "key")
                  .append("div").text(lang.totalRides[l]);

                panelParamAverage
                  .append("div").attr("class", "value")
                  .text(stations[i].average);

                panelParamAverage
                  .append("div").attr("class", "key")
                  .append("div").text(lang.perDay[l]);


                  panelParamRoundtrips
                    .append("div").attr("class", "value")
                    .text(Math.round(stations[i].roundtrips) + "%");

                  panelParamRoundtrips
                    .append("div").attr("class", "key")
                    .append("div").text(lang.roundtripsCount[l]);

                panelParamUnique
                  .append("div").attr("class", "value")
                  .text( Math.round(stations[i].unique_clients/stations[i].departures*100) + "%");

                panelParamUnique
                  .append("div").attr("class", "key")
                  .append("div").text(lang.uniqueUsers[l]);

                panelParamStartTime
                  .append("div").attr("class", "value")
                  .text(startTimeOutput);
                panelParamStartTime
                  .append("div").attr("class", "key")
                  .append("div").text(lang.startTime[l]);

                  panelParamCapacity
                    .append("div").attr("class", "value")
                    .text(stations[i].slots);

                  panelParamCapacity
                    .append("div").attr("class", "key")
                    .append("div").text(lang.capacity[l]);

                  //getHoursChart(code,panelParamHours);
                  //getDaysChart(code,panelParamDays);
                //panelParamDaysSvg = panelParamHours.append("svg");

        }

        if(item.district) {
          title.text(item.district['name_'+l]);

          var panelParamTotalRides = panel.append("div").attr("class", "param"),
              panelParamLocalRidesPercent = panel.append("div").attr("class", "param"),
              panelParamAverageDuration = panel.append("div").attr("class", "param"),
              panelParamStationsCount = panel.append("div").attr("class", "param");

              panelParamTotalRides
                .append("div").attr("class", "value")
                .text(item.district.total_rides);
              panelParamTotalRides
                .append("div").attr("class", "key")
                .append("div").text(lang.totalRides[l]);

              panelParamLocalRidesPercent
                .append("div").attr("class", "value")
                .text(item.district.local_rides_percent + "%");
              panelParamLocalRidesPercent
                .append("div").attr("class", "key")
                .append("div").text(lang.localRidesPercent[l]);

              panelParamAverageDuration
                .append("div").attr("class", "value")
                .text(item.district.average_duration);
              panelParamAverageDuration
                .append("div").attr("class", "key")
                .append("div").text(lang.averageDuration[l]);

              panelParamStationsCount
                .append("div").attr("class", "value")
                .text(item.district.stations_count);
              panelParamStationsCount
                .append("div").attr("class", "key")
                .append("div").text(lang.stationsCount[l]);





        }
      } else {
        panel.style("visibility","hidden");
        panelStates.style("visibility", "visible");
        changeState(pState);

      }

    }

var lineHours = d3.svg.line()
        .x(function(d,i) {
          var ang = -1*(360*((i)/24)-90)*(Math.PI/180);
          return 100+Math.cos(ang)*(d);
          })
        .y(function(d,i) {
          var ang = -1*(360*((i)/24)-90)*(Math.PI/180);
          return 100+Math.sin(ang)*(d);
        })
        .interpolate("basis");


  var lineDays = d3.svg.line()
      .x(function(d,i) {
        var ang = -1*(360*((i)/7)-90)*(Math.PI/180);
        return 100+Math.cos(ang)*(d);
      })
      .y(function(d,i) {
        var ang = -1*(360*((i)/7)-90)*(Math.PI/180);
        return 100+Math.sin(ang)*(d);
      })
      .interpolate("linear");


//changeState(pState);
function getHoursChart(code, parent) {
  var chart = parent.append("svg").attr("width",200).attr("height", 200),
      hours = stations[idx[code]].hours,
      totalFare = [], dayFare = [], monthFare = [], seasonFare = [];

      hours.forEach(function(d,i) {
        totalFare.push(100);
        dayFare.push(Math.round(d.d/d.t*100));
        monthFare.push(Math.round(d.m/d.t*100));
        seasonFare.push(Math.round(d.s/d.t*100));
      });


      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#aaa")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineHours(totalFare) + "Z"; });

      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#25baff")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineHours(dayFare) + "Z"; });

      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#ff00CC")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineHours(monthFare) + "Z"; });

      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#ff7500")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineHours(seasonFare) + "Z"; });



}


function getDaysChart(code, parent) {
  var chart = parent.append("svg").attr("width",200).attr("height", 200),
      hours = stations[idx[code]].days,
      totalFare = [], dayFare = [], monthFare = [], seasonFare = [];

      hours.forEach(function(d,i) {
        totalFare.push(100);
        dayFare.push(Math.round(d.d/d.t*100));
        monthFare.push(Math.round(d.m/d.t*100));
        seasonFare.push(Math.round(d.s/d.t*100));
      });


      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#aaa")
          .style("opacity", 2)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineDays(totalFare) + "Z"; });

      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#25baff")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineDays(dayFare) + "Z"; });

      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#ff00CC")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineDays(monthFare) + "Z"; });

      chart.append("svg:path")
          .attr("fill", "none")
          .style("stroke", "#ff7500")
          .style("opacity", 0.5)
          .style("stroke-width", 2)
          .attr("d", function(d) { return lineDays(seasonFare) + "Z"; });

}


    d3.select("body")
      .on("keydown", function() {
  		if(d3.event.keyCode==87) {
  			map.setPitch(map.getPitch()+5);
  		}
  		if(d3.event.keyCode==83) {
  			map.setPitch(map.getPitch()-5);
  		}
      });
  });



});
