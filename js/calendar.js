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

var l = detectLang();

var calendarModes = [
  { id: "totals", ru: "Поездки по дням", en: "Total rides",
    title: {
      ru: "Общее число поездок по дням",
      en: "Rides stats by day"
    }
  },
  { id: "percents", ru: "Поездки, %", en: "Rides, %",
    title: {
      ru: "Соотношение тарифов",
      en: "Fare types shares"
    }
  },
  { id: "durations", ru: "Продолжительность", en: "Duration",
    title: {
      ru: "Среднее время поездки",
      en: "Average duration"
    }
  },
];

var calendarLegend = [
  { id: "day", ru: "тариф «День»", en: "fare «Day»" },
  { id: "month", ru: "тариф «Месяц»", en: "fare «Month»" },
  { id: "season", ru: "тариф «Сезон»", en: "fare «Season»" },
  { id: "temp", ru: "температура, C°", en: "temperature, C°" },
  { id: "rain", ru: "дождь", en: "rainy day", rounded: true }
];



/* BASE STATEMENTS */
var calendarTitle = d3.select("#calendar-title");
var calendarCurrent = 'totals',
    format = d3.time.format("%Y-%m-%d"),
    label_format = d3.time.format("%d.%m"),
    seasonStart = format.parse("2015-05-01"),
    seasonEnd = format.parse("2015-10-01"),
    allDays = ((seasonEnd.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)),
    minTemp = 15, maxTemp = 15, maxTotal = 0, maxDuration = 0,
    offset = 40;

var calendarWidth, calendarHeight, areaHeight,areaWidth, tickWidth;

//var tooltip = d3.select("#tooltip");

var calendarData = [];

//building legend block
calendarLegend.forEach(function(cl) {

  var ll = d3.select("#calendar-legend").append("div").attr("class", "calendar-legend-item"),
      lb = ll.append("span").attr("class", "calendar-legend-bullet bullet-"+cl.id),
      lt = ll.append("span").attr("class", "calendar-legend-label").text(cl[l]);

});

//building modes block
calendarModes.forEach(function (cm,i) {
  d3.select("#calendar-modes").append("div")
    .text(cm[l])
    .attr("class", "calendar-mode")
    .attr("id", "calendar-mode-"+cm.id)
    .on('click', function(d){
      changeCalendarMode(cm.id);
    });
  });




function changeCalendarMode(mode) {
  calendarModes.forEach(function (cm,i) {
    if(cm.id == mode) {
      d3.select("#"+cm.id).style("visibility", "visible");
      d3.select("#calendar-mode-"+cm.id).attr("class", "calendar-mode-selected");
      calendarTitle.text(cm.title[l]);
      calendarCurrent = cm.id;
    } else {
      d3.select("#"+cm.id).style("visibility", "hidden");
      d3.select("#calendar-mode-"+cm.id).attr("class", "calendar-mode");
    }
  });
}


//window on resize end event

var rsTimer = null;
window.onresize = function(){
    if(rsTimer) window.clearTimeout(rsTimer);
    rsTimer = window.setTimeout(resizeDone,500);
}


function resizeDone(){
    //You next step here
    buildCalendar();
    changeCalendarMode(calendarCurrent);
    //console.log('resize end');
}



d3.tsv("./data/days.csv", function(d) {
  calendarData.push({
    rides_total: +d.rides_total,
    ride_date: format.parse(d.ride_date),
    ride_date_label: label_format(format.parse(d.ride_date)),
    rides_day: +d.rides_day,
    rides_month: +d.rides_month,
    rides_season: +d.rides_season,
    duration_average: +d.duration_average,
    duration_day: +d.duration_day,
    duration_month: +d.duration_month,
    duration_season: +d.duration_season,
    clouds: d.clouds,
    rain: d.newdata_rain,
    temp: +d.temp
  });

//  var dride = format.parse(d.rides_day);
//  day_label.push(label_format(dride));
//  totals.push({ total: +d.rides_total, day: +d.rides_day, month: +d.rides_month, season: +d.rides_season });
//  durations.push({average: +d.duration_average, day: +d.duration_day, month: +d.duration_month, season: +d.duration_season });
//  temp.push(+d.temp);
//  rain.push(d.newdata_rain);
//  idx.push(d.ride_date);

  if(+d.temp > minTemp) minTemp = +d.temp;
  if(+d.temp > maxTemp) maxTemp = +d.temp;
  if(+d.rides_total > maxTotal) maxTotal = +d.rides_total;
  if(+d.duration_day > maxDuration) maxDuration = +d.duration_day;
  if(+d.duration_month > maxDuration) maxDuration = +d.duration_month;
  if(+d.duration_season > maxDuration) maxDuration = +d.duration_season;

}, function(error, rows) {
  buildCalendar();
  changeCalendarMode('totals');
});

function buildCalendar() {

  d3.select("#calendar-chart").text('');

  //calculate page params
  tickWidth = Math.floor((window.innerWidth-(offset*2 + 60)) / allDays);
  tickWidth = tickWidth<4 ? 4 : tickWidth;//setting the minimum tick width (for small screens);//the width of day width
  calendarWidth = tickWidth*allDays + offset*2;
  calendarHeight = window.innerHeight > 400 ? window.innerHeight-150 : 200;
  areaHeight = calendarHeight - offset;
  areaWidth = tickWidth*allDays;

  var x = d3.time.scale()
    .domain([seasonStart, seasonEnd])
    .range([0, areaWidth]);

  var xAxis = d3.svg.axis()
    .scale(x);


var svg = d3.select("#calendar-chart").append("svg").attr("width", calendarWidth).attr("height", calendarHeight),
  calendar = svg.append("g")
    .attr("transform", "translate("+ offset + ","+offset/2+")"),
  calendarDays = calendar.append("g").attr("id", "days"),
  calendarTotals = calendar.append("g").attr("id", "totals")
  calendarPercent = calendar.append("g").attr("id", "percents")
  calendarDurations = calendar.append("g").attr("id", "durations"),
  calendarTemp = calendar.append("g").attr("id", "temp"),
  calendarHover = calendar.append("g").attr("id", "hover");


  yTotal = d3.scale.linear().domain([0,maxTotal]).range([areaHeight, 0]),
  yTotalBar = d3.scale.linear().domain([0,maxTotal]).range([0, areaHeight]),
  yTotalPercent = d3.scale.linear().domain([0,100]).range([areaHeight, 0]),
  yTotalPercentBar = d3.scale.linear().domain([0,100]).range([0, areaHeight]),
  yTemp = d3.scale.linear().domain([5,35]).range([areaHeight, 0]),
  yDurations = d3.scale.linear().domain([0,maxDuration+10]).range([areaHeight, 0]),
  yTotalAxis = d3.svg.axis().scale(yTotal).ticks(4).orient("left"),
  yPercentAxis = d3.svg.axis().scale(yTotalPercent).ticks(4).orient("left"),
  yDurationsAxis = d3.svg.axis().scale(yDurations).ticks(4).orient("left"),
  yTempAxis = d3.svg.axis().scale(yTemp).ticks(4).orient("right");

  var lineTotals = d3.svg.line()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      .y(function(d,i) { return yTotal(d.total); });

  var lineDurationSeason = d3.svg.line()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      .y(function(d,i) { return yDurations(d.duration_season); });

  var lineDurationMonth = d3.svg.line()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      .y(function(d,i) { return yDurations(d.duration_month); });

  var lineDurationDay = d3.svg.line()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      .y(function(d,i) { return yDurations(d.duration_day); });

  var lineTemp = d3.svg.line()
      .interpolate("cardinal")
      .x(function(d,i) { return i*tickWidth+tickWidth/2; })
      .y(function(d,i) { return yTemp(d.temp); });

  var areaDay = d3.svg.area()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      .y0(areaHeight)
      .y1(function(d) { return yTotal(d.day); });

  var areaDuration = d3.svg.area()
    .interpolate("basis")
    .x(function(d,i) { return i*tickWidth; })
    .y0(areaHeight)
    .y1(function(d) { return yTotal(d.day); });


var areaMonth = d3.svg.area()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      //.y0(areaHeight)
      .y0(function(d) {
        return yTotal(d.day); })
      .y1(function(d) { return yTotal(d.total - d.season); });


var areaSeason = d3.svg.area()
      .interpolate("basis")
      .x(function(d,i) { return i*tickWidth; })
      .y0(areaHeight)
      .y0(function(d) { return yTotal(d.day+d.month); })
      .y1(function(d) { return yTotal(d.total); });

  calendar.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+areaHeight+")")
    .call(xAxis);

  calendarTemp.append("g").attr("class", "y axis").call(yTempAxis).
  attr("transform", "translate("+areaWidth+",0)");
  calendarTotals.append("g").attr("class", "y axis").call(yTotalAxis);
  calendarPercent.append("g").attr("class", "y axis").call(yPercentAxis);
  calendarDurations.append("g").attr("class", "y axis").call(yDurationsAxis);

  calendarTemp.append("svg:path")
    .attr("class", "temp-path-bg")
    .attr("d", function(d) {
      return lineTemp(calendarData);
    });


  calendarTemp.append("svg:path")
    .attr("class", "temp-path-line")
    .attr("d", function(d) {
      return lineTemp(calendarData);
    });

  //absolute numbers

  calendarData.forEach(function(d,i) {

  if(d.rain) {
    calendarTemp
      .append("svg:circle")
      .attr("cx", tickWidth*i+tickWidth/2)
      .attr("cy", yTemp(d.temp))
      .attr("r",tickWidth/2)
      .attr("class", "rain-circle");

  }

  calendarTotals
      .append("rect")
      .attr("class", "bar-day")
      .attr("width", tickWidth-1)
      .attr("height", yTotalBar(d.rides_day))
      .attr("x",tickWidth*i)
      .attr("y", areaHeight-yTotalBar(d.rides_day))
//      .style("fill", "#00ccff")
      .style("opacity", 0.75);

  calendarTotals
    .append("rect")
    .attr("class", "bar-month")
    .attr("width", tickWidth-1)
    .attr("height", yTotalBar(d.rides_month))
    .attr("x",tickWidth*i)
    .attr("y", areaHeight-yTotalBar(d.rides_day+d.rides_month));

calendarTotals
  .append("rect")
  .attr("class", "bar-season")
  .attr("width", tickWidth-1)
  .attr("height", yTotalBar(d.rides_season))
  .attr("x",tickWidth*i)
  .attr("y", areaHeight-yTotalBar(d.rides_day+d.rides_month+d.rides_season));

calendarPercent
    .append("rect")
    .attr("class", "bar-day")
    .attr("width", tickWidth-1)
    .attr("height", yTotalPercentBar(d.rides_day/d.rides_total*100))
    .attr("x",tickWidth*i)
    .attr("y", areaHeight - yTotalPercentBar(d.rides_day/d.rides_total*100));

calendarPercent
  .append("rect")
  .attr("class", "bar-month")
  .attr("width", tickWidth-1)
  .attr("height", yTotalPercentBar(d.rides_month/d.rides_total*100)-0.5)
  .attr("x",tickWidth*i)
  .attr("y", yTotalPercentBar(d.rides_season/d.rides_total*100));

calendarPercent
  .append("rect")
  .attr("class", "bar-season")
  .attr("width", tickWidth-1)
  .attr("height", yTotalPercentBar(d.rides_season/d.rides_total*100)-0.5)
  .attr("x",tickWidth*i)
  .attr("y", 0);


  calendarDays
      .append("rect")
      .attr("width", tickWidth-1)
      .attr("height", areaHeight)
      .attr("x",tickWidth*i)
      .attr("class", function() {
        if(d.ride_date.getDay()>0 && d.ride_date.getDay()<6)
          return "bar-weekday";
          else return "bar-workday";
      });

  calendarHover
    .append("rect")
    .attr("class", "bar-hover")
    .attr("width", tickWidth-1)
    .attr("height", areaHeight)
    .attr("x",tickWidth*i)
    .style("fill", "#ffffff")
    .attr("y", 0)
    .on("mouseenter", function(e){
      var dl,ml,sl;
      //console.log(d);
      tooltip.text("");

      tooltip
        .append("div").attr("class", "tooltip-date").text(d.ride_date_label);

      tooltip
        .append("div")
        .attr("class", function(z){
          var s = "tooltip-date-clear";
          if(d.clouds) s = "tooltip-date-cloudy";
          if(d.rain) s = "tooltip-date-rainy";
          return s;
        })
        .text(d.temp + " C°");

      dl =  tooltip.append("div").attr("class","tooltip-value");
      ml =  tooltip.append("div").attr("class","tooltip-value");
      sl =  tooltip.append("div").attr("class","tooltip-value");

      dl.append("span").attr("class", "tooltip-value-bullet bullet-day")
      dl.append("span").attr("class", "tooltip-value-text").text(d.rides_day + " ("+Math.round(d.rides_day/d.rides_total*100)+" %)");
      dl.append("span").attr("class", "tooltip-value-duration").text(d.duration_day + "'");


      ml.append("span").attr("class", "tooltip-value-bullet bullet-month")
      ml.append("span").attr("class", "tooltip-value-text").text(d.rides_month + " ("+Math.round(d.rides_month/d.rides_total*100)+" %)");
      ml.append("span").attr("class", "tooltip-value-duration").text(d.duration_month + "'");

      sl.append("span").attr("class", "tooltip-value-bullet bullet-season")
      sl.append("span").attr("class", "tooltip-value-text").text(d.rides_season + " ("+Math.round(d.rides_season/d.rides_total*100)+" %)");
      sl.append("span").attr("class", "tooltip-value-duration").text(d.duration_season + "'");

      if(event.pageX < (window.innerWidth-150)) {
        //tooltip on the right
        tooltip
          .style("left",(event.pageX+10)+"px")
          .style("right", "auto");
      } else {
        //tooltip on the left
        tooltip
        .style("right",(window.innerWidth-(event.pageX-10))+"px")
        .style("left", "auto");
      }

      if(event.pageY < (window.innerHeight-200)) {
        //tooltip on the right
        tooltip
          .style("top",(event.pageY+10)+"px")
          .style("bottom", "auto");
      } else {
        tooltip
        .style("bottom",(window.innerHeight-(event.pageY-10))+"px")
        .style("top", "auto");
      }



      tooltip.style("visibility", "visible");
    })
    .on("mouseout", function(e){
      tooltip.style("visibility", "hidden").text("");
   });


});

  calendarDurations.append("svg:path")
      .attr("fill", "none")
      .attr("class", "path-season")
      .attr("d", function(d) { return lineDurationSeason(calendarData); });

  calendarDurations.append("svg:path")
      .attr("fill", "none")
      .attr("class", "path-month")
      .attr("d", function(d) { return lineDurationMonth(calendarData); });

  calendarDurations.append("svg:path")
      .attr("fill", "none")
      .attr("class", "path-day")
      .attr("d", function(d) { return lineDurationDay(calendarData); });

}

function dateToPixels(date, tick) {
  var d = format.parse(date),
      w = Math.floor((d.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24))*tick;
  return w;

}
