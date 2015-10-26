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

/* BASE STATEMENTS */
var orign = Requests.QueryString("orign"),
    paramFrom = Requests.QueryString("from"),
    noSplash = Requests.QueryString("no-splash"),
    l = detectLang(), //setting the language
    pState = {stateId: "total"}, //prevous state
    cState = {stateId: "total"}, //current state
    interval, isKeynote = false,
    isMobile = window.innerWidth < 700 ? true : false,
    //isMobile = true,
    m = "calendar", //"explore", //mode: explore | demo
    currentSlide = 0, //current scene in the siquence
    slidesSpeed = 12000; //demo-mode speed in milliseconds

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


var demoMode = d3.select("#demoMode"),
    exploreMode = d3.select("#exploreMode"),
    calendarMode = d3.select("#calendarMode"),
    demoModeBtn = d3.select("#demoModeBtn"),
    exploreModeBtn = d3.select("#exploreModeBtn"),
    calendarModeBtn = d3.select("#calendarModeBtn"),
    aboutExploreBtn = d3.select("#about-mode-explore-btn"),
    aboutDemoBtn = d3.select("#about-mode-demo-btn"),
    aboutCalendarBtn = d3.select("#about-mode-calendar-btn"),
    fullscreenBtn = d3.select("#fullscreen"),
    aboutBtn = d3.select("#about-btn"),
    aboutScreen = d3.select("#about-screen"),
    aboutGoBtn = d3.select("#about-go-btn");

    aboutGoBtn.on('click', function(){
      aboutScreen.style("display", "none");

        //yaMetrika
        //if(yaCounter31411338) yaCounter31411338.reachGoal('splash');
      });

      //applying the lang labels on various blocks
      d3.select("#logo-link").text(lang.logoLink[l]);
      d3.select("#about-title").text(lang.aboutTitle[l]);
      d3.select("#about-description").text(lang.aboutDescription[l]);
      d3.select("#about-modes-description").text(lang.aboutModes[l]);
      d3.select("#about-credits-"+l).style("display", "block");

      // *** DEBUG ***
//      d3.select("#debug").text("isMobile: " + isMobile);

      d3.select("#debug").text("m: " + isMobile + " w: " + window.innerWidth + " h: " + window.innerHeight);



          var mapArea = d3.select("#map"),
              panelStates = d3.select("#states-panel"),
              menuStates = d3.select("#states-menu"),
              btnStates = d3.select("#states-btn"),
              tooltip = d3.select("#tooltip"),
              panelContent = d3.select("#content-panel"),
              legendBlock = d3.select("#legend-panel")
              title = d3.select("#title").text("");

  var input_format = d3.time.format("%Y-%m-%d %H:%M:%S");
  var output_format = d3.time.format("%d.%m");
  //2015-05-01 01:27:30

  var arc = d3.svg.arc()
    .innerRadius(18)
    .outerRadius(20)
    .startAngle(0);


function getAboutScreen(btn,close) {
  //btn - text on the GO button, close - true/false - close button on right corner
  aboutScreen.style("display", "block");
  if(btn)
    d3.select("#about-go-btn").text(lang[btn][l]);
}

if(orign === "afisha" || orign === "afisha/") {
  fullscreenBtn.style("visibility", "visible");
  aboutBtn.style("visibility", "hidden");
}

if(orign === "afisha" || orign === "afisha/" || paramFrom == "afisha/" ||  paramFrom == "afisha" || noSplash) {
  //do nothing
} else {
  //getting splash screen
  getAboutScreen('start');
}


//handling resize events
window.addEventListener('resize', function(event){
  // do stuff here
  var isM = window.innerWidth < 700 ? true : false;

  if(isM != isMobile) {
    //changeState(pState);
    isMobile = isM;
    d3.select("#debug").text("isMobile: " + isMobile);
    if(isMobile)
    {
      panelStates.style("visibility","hidden");
      btnStates.style("visibility","visible");

    } else {
      panelStates.style("visibility","visible");
      btnStates.style("visibility","hidden");
    }
  }

});



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

        aboutBtn.on('click', function(){
          //aboutScreen.style("display", "block");
          getAboutScreen('back');
          if(isKeynote) changeMode("explore");
        });



    demoModeBtn.on('click', function(d){ changeMode("demo"); });
    exploreModeBtn.on('click', function(d){ changeMode("explore"); });
    calendarModeBtn.on('click', function(d){ changeMode("calendar"); });

    aboutExploreBtn.on('click', function(d){
      changeMode("explore");
      aboutScreen.style("display", "none");
    })
      .text(lang.explore[l]);
    aboutDemoBtn.on('click', function(d){
      changeMode("demo");
      aboutScreen.style("display", "none");
    })
      .text(lang.demo[l]);
    aboutCalendarBtn.on('click', function(d){
      changeMode("calendar");
      aboutScreen.style("display", "none");
    })
    .text(lang.calendar[l]);

    if(!m) changeMode("explore");
      else changeMode(m);

    btnStates.on('click', function() {
      panelContent.style("visibility", "hidden");
      panelStates.style("visibility", "visible");
      btnStates.style("visibility", "hidden");
      //if(isKeynote)
    });

    if(isMobile) {
      btnStates.style("visibility", "visible");
      panelStates.style("visibility", "hidden");
    }

    function getMenu() {
        menuStates.text("");
        menu.forEach(function(s,i) {

          var item = menuStates.append("div");
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

          if(!isMobile)
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

      //console.log(JSON.stringify(map.getCenter()) + '/' + map.getBearing());

      if(isKeynote) changeMode("explore");

      map.featuresAt(e.point, { radius: 10}, function (err, features) {
        if (err) throw err
        //
        if(features.length>0) {
          //if the object is station
          if(features[0].properties.code) {
            changeState({stateId: 'station', station: features[0].properties.code });
            getPanelContent({station: features[0].properties });
          }

          //if the object is the district
          if(features[0].properties.district_rides) {
            changeState({stateId: 'district', district: features[0].properties.id });
            getPanelContent({district: features[0].properties });
          }

      } else {
        getPanelContent();
        }
      });
    });


    function changeMode(mode) {

      //yandex Metrika
      //if(yaCounter31411338) yaCounter31411338.reachGoal(mode);

      if(mode === "demo") {
        if(!isKeynote) {
          interval = setInterval(getSlides, slidesSpeed);
          if(isMobile) btnStates.style("visibility", "hidden");
          demoMode.attr("class", "mode-selected");
          exploreMode.attr("class", "mode");
          isKeynote = true;
          panelContent.style("visibility", "visible");
          getSlides();
        } else {
          //changeMode("explore");
        }
        panelStates.style("visibility", "hidden");
        panelContent.style("visibility", "visible");
        demoMode.attr("class", "mode-selected");

      } else {

        clearInterval(interval);

        demoModeBtn.text(""); //remove loader
        if(map) map.stop(); //stop animation;

        panelContent.style("visibility", "hidden");
        if(isMobile)
          {
            btnStates.style("visibility", "visible");
          } else {
            panelStates.style("visibility", "visible");
          }
        isKeynote = false;
        demoMode.attr("class", "mode");

      }

      if(mode=="calendar") {
        calendarMode.attr("class", "mode-selected");
        d3.select("#calendar-screen").style("display","block");
      } else {
        calendarMode.attr("class", "mode");
        d3.select("#calendar-screen").style("display","none");
      }

      if(mode=="explore") {
        exploreMode.attr("class", "mode-selected");
      } else {
        exploreMode.attr("class", "mode");
      }
    }

    function getLoader() {
      //demoModeBtn
      demoModeBtn.text("");
      var demoLoader = demoModeBtn.append("svg").attr("width", 60).attr("height", 60);


      var loader = demoLoader.append("path")
          .datum({endAngle: 2*Math.PI})
          .attr("class", "loader")
          .attr("transform", "translate(30,30)")
          .attr("d", arc);

          loader.transition()
              .duration(slidesSpeed)
              .ease("linear")
              .call(arcTween, 0);

    }

    function arcTween(transition, newAngle) {
      transition.attrTween("d", function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
    }


    function changeState(state) {

      //logging current state
      //cState = state;

      //managing panels visibility
      if(isKeynote) {
        //demo mode showing descriptions in content panel
        //console.log('demo state');
        panelStates.style("visibility","hidden");
        btnStates.style("visibility", "hidden");
        panelContent.style("visibility","visible");
      } else {
        if(!state.station && !state.district) {
          //console.log('no-item state');
          //the state without item iD (station/district)
          //if(!isMobile)

          panelContent.style("visibility","hidden");

          if(isMobile) {
            //console.log('isMobile');
            btnStates.style("visibility", "visible");
            panelStates.style("visibility","hidden");
          } else {
            btnStates.style("visibility", "hidden");
            panelStates.style("visibility","visible");
          }


        } else {
          //station or district — showing the content panel
          //console.log('item state');
          panelStates.style("visibility","hidden");
          panelContent.style("visibility","visible");
        }

      }

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

            if(isMobile)
              title.text(s['menu-label'][l]);
                else
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
          panelContent.text("");
          panelContent.append("div").attr("class", "description").text(state.description[l]);
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
        //code);
      }

    }

    function getSlides() {
      getLoader();
      if(currentSlide >= (keynote.length)) currentSlide = 0;
      changeState(keynote[currentSlide]);
      currentSlide += 1;
    }

    function getPanelContent(item) {
      if(item) {
        panelContent.text("");
        if(!isMobile) {
        panelContent.append("div").attr("id", "closeBtn").on('click', function () {
          changeState(pState);
          });
        }

        if(item.station) {

          var i = idx[item.station.code],
              startTime = input_format.parse(stations[i].start),
              startTimeOutput = output_format(startTime);

              title.text(lang.bikeStation[l] + " #" + item.station.code);

                var panelParamTotal = panelContent.append("div").attr("class", "param"),
                    panelParamAverage = panelContent.append("div").attr("class", "param"),
                    panelParamRoundtrips = panelContent.append("div").attr("class", "param"),
                    panelParamUnique = panelContent.append("div").attr("class", "param"),
                    panelParamStartTime = panelContent.append("div").attr("class", "param-advanced"),
                    panelParamCapacity = panelContent.append("div").attr("class", "param-advanced"),
                    //panelParamSubwayDistance = panelContent.append("div").attr("class", "param"),
                    panelParamHours = panelContent.append("div"),
                    panelParamDays = panelContent.append("div");


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

          var panelParamTotalRides = panelContent.append("div").attr("class", "param"),
              panelParamLocalRidesPercent = panelContent.append("div").attr("class", "param"),
              panelParamAverageDuration = panelContent.append("div").attr("class", "param"),
              panelParamStationsCount = panelContent.append("div").attr("class", "param");

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
