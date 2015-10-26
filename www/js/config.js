
var lang = {
  logoLink: { ru: "Анализ и визуализация", en: "Data analysis and visualisation"},
  bikeStation: { ru: "Велостанция", en: "Bike share station"},
  totalRides: { ru: "поездок всего", en: "total rides"},
  localRidesPercent: { ru: "внутри района", en: "inside the district"},
  localRidesPercent: { ru: "внутри района", en: "inside the district"},
  averageDuration: { ru: "среднее время поездки", en: "average duration"},
  stationsCount: { ru: "станций", en: "docking stations"},
  perDay: { ru: "поездок в день", en: "per day"},
  capacity: { ru: "вместимость", en: "station capacity"},
  roundtripsCount: { ru: "возвраты на ту же станцию", en: "percent of roundtrips" },
  uniqueUsers: { ru: "уникальные пользователи", en: "unique users"},
  startTime: { ru: "начало работы станции", en: "date start"},
  explore: { ru: "Иследование", en: "Explore"},
  demo: { ru: "Презентация", en: "Keynote"},
  calendar: { ru: "Календарь", en: "Calendar"},
  aboutTitle: { ru: "Статистика проката велосипедов в Москве", en: "Moscow bike share stats"},
  aboutDescription: {
    ru: "Urbica Design проанализировала статистику работы городского велопроката в 2015 году для Департамента транспорта Москвы. Данные о 812 000 поездок на 300 станциях проката были проанализированы и изучены по каждому направлению поездок в нескольких тематических срезах.",
    en: "Urbica Design analyzed the performance statistics of the city bicycle rental in 2015 for the Department of Transport of Moscow. Data on 812 000 rides at 300 rental stations were studied and analyzed taking into account each ride direction and thematic segments. The detailed analysis identified main schemes of how bicycles were used in different districts of the city and explicitly showed the dependency of weather conditions on the use of a bicycle by various categories of riders."
  },
  aboutModes: {
    ru: "Данные представлены в трёх режимах:",
    en: "The data are represented in three modes:"
  },
  back: {
    ru: "Обратно к проекту",
    en: "Back to the project"
  },
  start: {
    ru: "Старт",
    en: "Start"
  }
};

var menu = [
  { class: "header", title: { ru: "Велостанции", en: "Docking stations"}},
  { class: "state", stateId: "total", title: { ru: "Общая статистика", en: "Total stats"}},
  { class: "state", stateId: "in_out", title: { ru: "Отправления/Прибытия", en: "Departures/Arrivals"}},
  { class: "state", stateId: "roundtrips", title: { ru: "Возврат на ту же станцию", en: "Roundtrips"}},
  { class: "state", stateId: "unique", title: { ru: "Уникальные пользователи", en: "Unique users"}},
  { class: "header", title: { ru: "Районы", en: "Districts"}},
  { class: "state", stateId: "districts_local", title: { ru: "Поездки внутри района", en: "Local rides"}},
  { class: "state", stateId: "districts_traffic", title: { ru: "Трафик между районами", en: "Traffic between districts"}},
  { class: "header", title: { ru: "Маршруты", en: "Directions"}},
  { class: "state", stateId: "fares", title: { ru: "Тарифы", en: "Fares"}},
  { class: "state", stateId: "duration", title: { ru: "Продолжительность", en: "Duration"}},
  { class: "state", stateId: "top_user", title: { ru: "Супер-пользователь", en: "Super user"}},
  { class: "state", stateId: "top_bikes", title: { ru: "Cупер-велосипед", en: "Super bike"}}
]

var keynote = [
//  37.609367701865324,"lat":55.76494759216348
  { stateId: "total",
    description: { ru: "Общее число поездок с каждой станции в период с 1 мая по 30 сентября",
                    en: "The total number of rides during the period from 1 May to 30 September is 812 372 rides"
                  },
    flyTo: {
      center: [37.609367701865324,55.76494759216348],
      zoom: 10,
      speed: 0.2
    }
  },
  { stateId: "total",
    description: {
      ru: "Самая популярная станция: №100 около станции метро Парк Культуры",
      en: "The most popular station: No. 100 near the Park Kultury underground station of Moscow"
    },
    flyTo: {
      center: [37.59328099999999, 55.73519400000001],
      zoom: 14,
      speed: 0.3
    }
  },
  { stateId: "in_out",
    description: { ru: "Cоотношение числа прибытий и отправлений с каждой конкретной станции. Если число больше 100% – это означает, что с этого места чаще уезжали, чем оставляли там велосипеды",
                    en: "The ratio of arrivals and departures from each specific station. If the number is more than 100%, it means that the place has been left more frequently than arrived at"
                  },
    flyTo: {
      zoom: 14,
      speed: 0.1
    }
  },
  { stateId: "in_out",
    description: {
      ru: "Лидер по числу прибытий, относительно отправлений — станция на Ломоносовском проспекте",
      en: "The leading station by the number of arrivals in reference to departures is the station at the Lomonosov avenue" },
    flyTo: {
      center: [37.541315543087904, 55.6957973274063],
      speed: 0.4
    }
  },
  { stateId: "in_out",
    description: { ru: "А по числу отправлений — станция перед входом в Парк Горького",
                    en: "As for the number of departures, the leader is the station at the entrance of the Gorky Park"
                  },
    flyTo: {
      center: [37.6055867713105, 55.732109221083476],
      zoom: 15,
      speed: 0.5
    }
  },
  { stateId: "in_out",
  description: { ru: "А по числу отправлений — станция перед входом в Парк Горького",
                  en: "As for the number of departures, the leader is the station at the entrance of the Gorky Park"
                },
    flyTo: {
      center: [37.6055867713105, 55.732109221083476],
      speed: 0.3,
      zoom: 12
    }
  },
  { stateId: "roundtrips",
    description: {
      ru: "Процент поездок, закончившихся на этой станции. Как правило это поездки с целью прогулок.",
      en: "The percentage of rides with the last stop at this station. As a rule, these rides are taken for outing"
    },
    flyTo: {
      center: [37.62071537484522,55.75728875946979],
      zoom: 12,
      speed: 0.3
    }
  },
  { stateId: "roundtrips",
    description: {
      ru: "По числу поездок с возвратом на ту же станцию лидируют станции проката, в дальних районах рядом с парками. Например, рядом Битцевским парком",
      en: "The leading stations by the number of rides with a return to the same station are the stations in far districts near the parks, for example, near the Bitsevsky Park"
    },
    flyTo: {
      center: [37.575850209685086,55.64369946443202],
      zoom: 13,
      speed: 0.4
    }
  },
  { stateId: "unique",
    description: {
      ru: "Процент новых пользователей на каждой станции. Чем больше новых пользователей, тем эта станция более «туристическая». Чем меньше это значение — тем больше регулярных велосипедистов на этой станции",
      en: "The percentage of new riders at each station. The more new riders there are, the more “touristic” the station is. The lower the number is, the more regular riders there are at this station"
    },
    flyTo: {
      center: [37.60076942807282,55.749247018139016],
      zoom: 12,
      speed: 0.3,
      pitch: 30
    }
  },
  { stateId: "districts_local",
    description:  {
      ru: "Доля поездок, начавшихся и завершившихся в одном и том же районе",
      en: "The percentage of rides with the departure and arrival at the same neighbourhood"
    },
    flyTo: {
      center: [37.60076942807282,55.749247018139016],
      zoom: 10,
      speed: 0.3
    }
  },
  { stateId: "district",
    district: 131,
    description: {
      ru: "Хамовники — один из районов-лидеров по числу поездок внутри района. Территория Хамовников ограничена набережной Москвы-реки с трёх сторон",
      en: "Khamovniki is one of the leading districts by the number of rides within the district. The area of Hamovniki is bounded from the three sides by the Moskva River embankment"
    },
    flyTo: {
      center: [37.578176748146944,55.7316247850149],
      zoom: 12,
      speed: 0.3,
      bearing: -44
    }
  },
  { stateId: "district",
    district: 130,
    description: {
      ru: "В Останкинском районе наибольший процент локальных поездок",
      en: "The highest percentage of local rides is concentrated in Ostankino district"
    },
    flyTo: {
      center: [37.63108673855038,55.832194072098446],
      zoom: 11,
      speed: 0.3,
      bearing: 0
    }
  },
  { stateId: "districts_traffic",
    description: {
      ru: "Наиболее активный трафик между районами наблюдается в центре города",
      en: "The most active traffic between the districts is occurred in the center of the city"
    },
    flyTo: {
      center: [37.61466612802937, 55.75161291168811],
      zoom: 12,
      speed: 0.3,
      bearing: 0
    }
  },
  { stateId: "fares",
    description: {
      ru: "Распределение маршрутов велопроката по тарифам. Карта иллюстрирует по каким маршрутам больше всего катаются пользователи с тем или иным тарифом.",
      en: "Distribution of routes by the fare type. The map shows the routes that passed by the largest number of riders with a certain fare — «Day», «Month» or «Season» "
    },
    flyTo: {
    center: [37.62027956993725,55.74390510679672],
    zoom: 10,
    speed: 0.1
    }
  },
  { stateId: "duration",
    description: {
      ru: "Распределение маршрутов поездок по продолжительности.",
      en: "Distribution of routes by the ride duration. Average ride duration is 33 minutes"
    },
    flyTo: {
    center: [37.62027956993725,55.74390510679672],
    zoom: 12,
    speed: 0.1
    }
  },
  { stateId: "top_user",
    description: {
      ru: "Самый активный пользователь, сделал 1114 поездок с суммарным временем поездок 17 162 минуты (это почти 12 суток).",
      en: "Most active rider made 1114 rides with the total ride time is 17 162 minutes (it is about 12 days)"
    },
    flyTo: {
    center: [37.6369005460804, 55.76967154832707],
    zoom: 11,
    speed: 0.3
    }
  },
  { stateId: "top_user",
    description: {
      ru: "Самый активный пользователь, сделал 1114 поездок с суммарным временем поездок 17 162 минуты (это почти 12 суток)",
      en: "The most popular bicycle is the number 2222. It has driven for 11 days – during this time 2222 could get to China from Moscow"
    },
    flyTo: {
    center: [37.60860659628409, 55.70441322377411],
    zoom: 10,
    speed: 0.1
    }
  },
  { stateId: "top_bikes",
    description: {
        ru: "Это аппарат под номером 2222. Суммарно за сезон он проехал 11 дней – за это время 2222 мог бы доехать из Москвы до Китая.",
        en: "The most popular bicycle is the number 2222. It has driven for 11 days – during this time 2222 could get to China from Moscow"
      },
    flyTo: {
    center: [37.60860659628409, 55.70441322377411],
    zoom: 10,
    speed: 0.1,
    pitch: 10
    }
  }
];

var states = [
  {
    "menu-label": { "en": "Total stats", "ru": "Общая статистика"},
    "label": { "en": "Total stats on each station", "ru": "Сколько взяли велосипедов на различных станциях"},
    "color": "background-image: linear-gradient(-90deg, #CCFF00 0%, #66FFFF 100%)",
    "state": "total",
    "legend": {
      "description": {
        "en": "Total stats",
        "ru": "Сколько взяли велосипедов на различных станциях"
      },
      "image": "legend-total.svg",
      "min": { "en": "358", "ru": "358"},
      "max": { "en":  "15040", "ru": "15040" }
    },
    "layers": [
      { "id": "velobike_stations_labels",
        "filter": ["all", [">","departures", 0]],
        "layout": {
          "text-field": "{departures}",
          "text-size": 12
        }
      },
      { "id": "velobike_stations_labels",
        "filter": ["all", [">","departures", 0]],
        "layout": {
          "text-field": "{departures}",
          "text-size": 12
        }
      },
      { "id": "velobike_directions",
        "paint": {
          "line-color": "#025b5b",
          "line-opacity": {"stops": [[9,0.05],[13,0.3],[17,0.5]]},
          "line-width": {"stops": [[9,0.2],[13,0.3],[17,2]]},
        }
      },
      { "id": "velobike_station_circle_1",
        "filter": ["all", [">=","departures", 0], ["<","departures", 1000]],
        "paint": {
          "circle-radius": {"stops": [[10,2.5],[13,10],[17,20]]},
          "circle-color": "#025b5b",
          "circle-opacity": 0.6
        }
      },
      { "id": "velobike_station_circle_2",
        "filter": ["all", [">=","departures", 1000], ["<","departures", 3000]],
        "paint": {
          "circle-radius": {"stops": [[10,4],[13,17],[17,34]]},
          "circle-color": "#027373",
          "circle-opacity": 0.6
        }
      },
      { "id": "velobike_station_circle_3",
        "filter": ["all", [">=","departures", 3000], ["<","departures", 6000]],
        "paint": {
          "circle-radius": {"stops": [[10,5.5],[13,22],[17,44]]},
          "circle-color": "#039997",
          "circle-opacity": 0.6
        }
      },
      { "id": "velobike_station_circle_4",
        "filter": ["all", [">=","departures", 6000], ["<","departures", 8000]],
        "paint": {
          "circle-radius": {"stops": [[10,6.5],[13,29],[17,58]]},
          "circle-color": "#04bfbc",
          "circle-opacity": 0.7
        }
      },
      { "id": "velobike_station_circle_5",
        "filter": ["all", [">=","departures", 8000]],
        "paint": {
          "circle-radius": {"stops": [[10,8.75],[13,35],[17,70]]},
          "circle-color": "#05f2ee",
          "circle-opacity": 0.8
        }
      }
    ]
  },
  {
    "menu-label": { "en": "Departures/Arrivals", "ru": "Прибытия/отправления"},
    "label": { "en": "Departures/Arrivals", "ru": "Где чаще забирали, а где чаще оставляли велосипеды"},
    "state": "in_out",
    "legend": {
      "description": { "en": "Total stats", "ru": "Соотношение общего числа исходящих поездок (отправления) к входящим. Чем больше это соотношение — тем более односторняя станция."},
      "image": "legend-inout.svg",
      "min": { "en": "76%", "ru": "76%"},
      "max": { "en":  "141%", "ru": "141%" }
    },
    "layers": [
      { "id": "velobike_stations_labels",
        "filter": ["all", [">","departures", 0]],
        "layout": {
          "text-field": "{in_out} %"
        },
        "paint": {
          "text-color": "#fff",
          "text-halo-width": 0
        }
      },
      { "id": "velobike_directions_1",
        "filter": ["all", [">","total", 50], [">=","oneway", 50], ["<","oneway", 102]],
        "paint": {
          "line-color": "#6666FF",
          "line-width": 0.7,
          "line-opacity": 0.2
        }
      },
      { "id": "velobike_directions_2",
        "filter": ["all", [">","total", 50], [">=","oneway", 102], ["<","oneway", 114]],
        "paint": {
          "line-color": "#C34BC5",
          "line-width": 0.7,
          "line-opacity": 0.2
        }
      },
      { "id": "velobike_directions_3",
        "filter": ["all", [">","total", 50], [">=","oneway", 114], ["<","oneway", 130]],
        "paint": {
          "line-color": "#FF4397",
          "line-width": 0.7,
          "line-opacity": 0.2
        }
      },
      { "id": "velobike_directions_4",
        "filter": ["all", [">","total", 50], [">=","oneway", 130], ["<","oneway", 156]],
        "paint": {
          "line-color": "#FF7370",
          "line-width": 0.7,
          "line-opacity": 0.2
        }
      },
      { "id": "velobike_directions_5",
        "filter": ["all", [">","total", 50], [">=","oneway", 156]],
        "paint": {
          "line-color": "#FFBC36",
          "line-width": 0.7,
          "line-opacity": 0.2
        }
      },
      { "id": "velobike_station_circle_1",
        "filter": ["all", ["<","in_out", 92]],
        "paint": {
          "circle-radius": {"stops": [[10,2.5],[13,10],[17,20]]},
          "circle-color": "#6666FF",
          "circle-opacity": 0.85
        }
      },
      { "id": "velobike_station_circle_2",
        "filter": ["all", [">=","in_out", 92], ["<","in_out", 98]],
        "paint": {
          "circle-radius": {"stops": [[10,4],[13,17],[17,34]]},
          "circle-color": "#C34BC5",
          "circle-opacity": 0.85
        }
      },
      { "id": "velobike_station_circle_3",
        "filter": ["all", [">=","in_out", 98], ["<","in_out", 102]],
        "paint": {
          "circle-radius": {"stops": [[10,5.5],[13,22],[17,44]]},
          "circle-color": "#FF4397",
          "circle-opacity": 0.85
        }
      },
      { "id": "velobike_station_circle_4",
        "filter": ["all", [">=","in_out", 102], ["<","in_out", 115]],
        "paint": {
          "circle-radius": {"stops": [[10,6.5],[13,29],[17,58]]},
          "circle-color": "#FF7370",
          "circle-opacity": 0.85
        }
      },
      { "id": "velobike_station_circle_5",
        "filter": ["all", [">=","in_out", 115]],
        "paint": {
          "circle-radius": {"stops": [[10,8.75],[13,35],[17,70]]},
          "circle-color": "#FFBC36",
          "circle-opacity": 0.85
        }
      }
    ]
  },
  {
  "menu-label": { "en": "Roundtrips", "ru": "Возврат на ту же станцию"},
  "label": { "en": "Roundtrips", "ru": "С каких станций чаще брали велосипеды и там же оставляли"},
  "state": "roundtrips",
  "legend": {
    "description": { "en": "Total stats", "ru": "Процент поездок, которые закончились на той же станции, откуда был взят велосипед."},
    "image": "legend-roundtrips.svg",
    "min": { "en": "7%", "ru": "7%"},
    "max": { "en":  "62%", "ru": "62%" }
  },
  "layers": [
    { "id": "velobike_stations_labels",
      "filter": ["all", [">=","departures", 500]],
      "layout": {
        "text-field": "{roundtrips} %"
      }
    },
    { "id": "velobike_directions",
      "paint": {
        "line-color": "#AF4400",
        "line-opacity": 0.3,
        "line-width": 0.4
      }
    },
    { "id": "velobike_station_circle_1",
      "filter": ["all", [">=","roundtrips", 0], ["<","roundtrips", 19]],
      "paint": {
        "circle-radius": {"stops": [[10,2.5],[13,10],[17,20]]},
        "circle-color": "#662314",
        "circle-opacity": 0.75
      }
    },
    { "id": "velobike_station_circle_3",
      "filter": ["all", [">=","roundtrips", 19], ["<","roundtrips", 22]],
      "paint": {
        "circle-radius": {"stops": [[10,5.5],[13,22],[17,44]]},
        "circle-color": "#BD381A",
        "circle-opacity": 0.8
      }
    },
    { "id": "velobike_station_circle_4",
      "filter": ["all", [">=","roundtrips", 22], ["<","roundtrips", 32]],
      "paint": {
        "circle-radius": {"stops": [[10,6.5],[13,29],[17,58]]},
        "circle-color": "#D93D16",
        "circle-opacity": 0.8
      }
    },
    { "id": "velobike_station_circle_5",
      "filter": ["all", [">=","roundtrips", 32]],
      "paint": {
        "circle-radius": {"stops": [[10,8.75],[13,35],[17,70]]},
        "circle-color": "#FF3300",
        "circle-opacity": 0.8
      }
    }
  ]
  },
  {
  "menu-label": { "en": "Unique rides", "ru": "Уникальные пользователи"},
  "label": { "en": "Unique rides", "ru": "Какие станции самые туристические"},
  "state": "unique",
  "legend": {
    "description": { "en": "Total stats", "ru": "Доля поездок с уникальным логином."},
    "image": "legend-unique.svg",
    "min": { "en": "21%", "ru": "21%"},
    "max": { "en":  "75%", "ru": "76%" }
  },
  "layers": [
    { "id": "velobike_directions",
      "paint": {
        "line-color": "#77591f",
        "line-opacity": 0.1,
        "line-width": 0.2

      }
    },
    { "id": "velobike_stations_labels",
      "filter": ["all"],
      "layout": {
        "text-field": "{unique_rides}%"
      }
    },
    { "id": "velobike_station_circle_1",
      "filter": ["all",[">=", "unique_rides", 21],["<", "unique_rides", 32]],
      "paint": {
        "circle-radius": {"stops": [[9,2.5],[13,10],[17,20]]},
        "circle-color": "#77591f",
        "circle-opacity": 0.5
      }
    },
    { "id": "velobike_station_circle_2",
      "filter": ["all",[">=", "unique_rides", 32],["<", "unique_rides", 43]],
      "paint": {
        "circle-radius": {"stops": [[9,4],[13,17],[17,34]]},
        "circle-color": "#805626",
        "circle-opacity": 0.5
      }
    },
    { "id": "velobike_station_circle_3",
      "filter": ["all",[">=", "unique_rides", 43],["<", "unique_rides", 54]],
      "paint": {
        "circle-radius": {"stops": [[9,5.5],[13,22],[17,44]]},
        "circle-color": "#b37d1b",
        "circle-opacity": 0.5
      }
    },
    { "id": "velobike_station_circle_4",
      "filter": ["all", [">=", "unique_rides", 54], ["<", "unique_rides", 65]],
      "paint": {
        "circle-radius": {"stops": [[9,6.5],[13,29],[17,58]]},
        "circle-color": "#cc981f",
        "circle-opacity": 0.5
      }
    },
    { "id": "velobike_station_circle_5",
      "filter": ["all", [">=", "unique_rides", 65]],
      "paint": {
        "circle-radius": {"stops": [[9,8.75],[13,35],[17,70]]},
        "circle-color": "#ffb700",
        "circle-opacity": 0.5
      }
    }
    ]
  },
  {
    "menu-label": { "en": "Stations count per 1 km²", "ru": "Станций на 1 км²"},
    "label": { "en": "Stations count per 1 km²", "ru": "Станций на 1 км²"},
    "state": "stations_grid",
    "hidden": true,
    "legend": {
      "description": { "en": "Total stats", "ru": "Число станций на квадратный километр."},
      "image": "legend-roundtrips.svg",
      "min": { "en": "358", "ru": "358"},
      "max": { "en":  "15040", "ru": "15040" }
    },
    "layers": [
      { "id": "grid_labels",
      "filter": ["all"],
      "layout": {
        "text-field": "{stations_count}"
        }
      },
      { "id": "velobike_grid_1",
        "filter": ["all", [">", "stations_count", 0], ["<=", "stations_count", 1]],
        "paint": {
          "fill-opacity": 0.3,
          "fill-color": "#8500F9",
          "stroke-width": 1
        }
      },
      { "id": "velobike_grid_2",
        "filter": ["all", [">", "stations_count", 1], ["<=", "stations_count", 2]],
        "paint": {
          "fill-opacity": 0.4,
          "fill-color": "#8500F9",
          "stroke-width": 1
        }
      },
      { "id": "velobike_grid_3",
        "filter": ["all", [">", "stations_count", 2], ["<=", "stations_count", 4]],
        "paint": {
          "fill-opacity": 0.5,
          "fill-color": "#8500F9",
          "stroke-width": 1
        }
      },
      { "id": "velobike_grid_4",
        "filter": ["all", [">", "stations_count", 4], ["<=", "stations_count", 6]],
        "paint": {
          "fill-opacity": 0.7,
          "fill-color": "#8500F9",
          "stroke-width": 1
        }
      },
      { "id": "velobike_grid_5",
        "filter": ["all", [">", "stations_count", 6]],
        "paint": {
          "fill-opacity": 0.9,
          "fill-color": "#8500F9",
          "stroke-width": 1
        }
      }
    ]
  },
  {
    "menu-label": { "en": "Local rides", "ru": "Поездки внутри района"},
    "label": { "en": "Local rides", "ru": "Какой район оказался самым велосипедным"},
    "state": "districts_local",
    "legend": {
      "description": { "en": "Total stats", "ru": "Доля поездок с возвратом велосипеда на станцию в этом же районе."},
      "image": "legend-local.svg",
      "min": { "en": "24%", "ru": "24%"},
      "max": { "en":  "85%", "ru": "85%" }
    },
    "layers": [
      { "id": "districts_labels",
      "filter": ["all"],
      "layout": {
        "text-field": "{name_en} {local_rides_percent}%",
        "text-size": 14,
        "text-offset": [0,0]
      },
      "paint": {
        "text-color": "#EEE",
        "text-opacity": {"stops": [[10,0.9],[14,1]]},
        "text-size": {"stops": [[10,12],[16,16]]}
      }
      },
      { "id": "velobike_districts_1",
        "filter": ["all", [">=", "local_rides_percent", 0], ["<", "local_rides_percent", 44]],
        "paint": {
          "fill-opacity": 0.3,
          "fill-color": "#005933",
          "stroke-width": 1
        }
      },
      { "id": "velobike_districts_2",
        "filter": ["all", [">=", "local_rides_percent", 44], ["<", "local_rides_percent", 65]],
        "paint": {
          "fill-opacity": 0.4,
          "fill-color": "#009957",
          "stroke-width": 1
        }
      },
      { "id": "velobike_districts_3",
        "filter": ["all", [">=", "local_rides_percent", 65]],
        "paint": {
          "fill-opacity": 0.5,
          "fill-color": "#00e682",
          "stroke-width": 1
        }
      }
    ]
  },
  {
    "menu-label": { "en": "Districts traffic", "ru": "Трафик между районами"},
    "label": { "en": "Districts traffic", "ru": "Какие районы лучше связаны"},
    "state": "districts_traffic",
    "legend": {
      "description": { "en": "Total stats", "ru": "Велотраик между районами."},
      "image": "legend-traffic.svg",
      "min": { "en": "<50", "ru": "<50"},
      "max": { "en":  "17387", "ru": "17387" }
    },
    "layers": [
      { "id": "districts_labels",
      "filter": ["all"],
      "layout": {
        "text-field": "{name_en}",
        "text-size": 14
        }
      },
      { "id": "velobike_districts_1",
        "filter": ["all", [">=", "total_rides", 0], ["<", "total_rides", 4000]],
        "paint": {
          "fill-opacity": 0.2,
          "fill-color": "#084d40"
        }
      },
      { "id": "velobike_districts_2",
        "filter": ["all", [">=", "total_rides", 4000], ["<", "total_rides", 10000]],
        "paint": {
          "fill-opacity": 0.2,
          "fill-color": "#0a665a",
          "stroke-width": 1
        }
      },
      { "id": "velobike_districts_3",
        "filter": ["all", [">=", "total_rides", 10000], ["<", "total_rides", 20000]],
        "paint": {
          "fill-opacity": 0.2,
          "fill-color": "#158c7e",
          "stroke-width": 1
        }
      },
      { "id": "velobike_districts_4",
        "filter": ["all", [">=", "total_rides", 20000], ["<", "total_rides", 40000]],
        "paint": {
          "fill-opacity": 0.2,
          "fill-color": "#1dbfaf",
          "stroke-width": 1
        }
      },
      { "id": "velobike_districts_5",
        "filter": ["all", [">=", "total_rides", 40000]],
        "paint": {
          "fill-opacity": 0.2,
          "fill-color": "#47ffed",
          "stroke-width": 1
        }
      },
      { "id": "velobike_districts_circle_1",
        "filter": ["all", [">=","total_rides",0],["<","total_rides",4000]],
        "paint": {
          "circle-radius": {"stops": [[10,2.5],[13,10],[17,20]]},
          "circle-color": "#084d40",
          "circle-opacity": 0.8
        }
      },
      { "id": "velobike_districts_circle_2",
        "filter": ["all", [">=","total_rides",4000],["<","total_rides",10000]],
        "paint": {
          "circle-radius": {"stops": [[10,4],[13,17],[17,34]]},
          "circle-color": "#0a665a",
          "circle-opacity": 0.8
        }
      },
      { "id": "velobike_districts_circle_3",
        "filter": ["all", [">=","total_rides",10000],["<","total_rides",20000]],
        "paint": {
          "circle-radius": {"stops": [[10,5.5],[13,22],[17,44]]},
          "circle-color": "#158c7e",
          "circle-opacity": 0.8
        }
      },
      { "id": "velobike_districts_circle_4",
        "filter": ["all", [">=","total_rides",20000],["<","total_rides",40000]],
        "paint": {
          "circle-radius": {"stops": [[10,6.5],[13,29],[17,58]]},
          "circle-color": "#1dbfaf",
          "circle-opacity": 0.8
        }
      },
      { "id": "velobike_districts_circle_5",
        "filter": ["all", [">=","total_rides",40000]],
        "paint": {
          "circle-radius": {"stops": [[10,8.75],[13,35],[17,70]]},
          "circle-color": "#47ffed",
          "circle-opacity": 0.8
        }
      },
      { "id": "velobike_districts_links_labels_small",
        "filter": ["all",[">=", "total_sum",1000],["<", "total_sum",5000]],
        "paint": {
          "text-color": "#fff",
          "text-opacity": { "stops": [[14,0],[18,1]]}
        },
        "layout": {
          "text-size": { "stops": [[13,10],[16,12]]},
          "text-field": "{total_sum}"
        }
      },
      { "id": "velobike_districts_links_labels",
        "filter": ["all",[">=", "total_sum",1000]],
        "paint": {
          "text-color": "#fff",
          "text-opacity": { "stops": [[10,0],[12,0.7],[13,1]]},
        },
        "layout": {
          "text-size": { "stops": [[11,12],[17,16]]},
          "text-field": "{total_sum}"
        }
      },
      { "id": "velobike_districts_links_1",
        "filter": ["all", [">=", "total_sum", 100], ["<", "total_sum", 1000]],
        "paint": {
          "line-opacity": 0.1,
          "line-width": 0.1,
          "line-color": "#ccc"
        }
      },
      { "id": "velobike_districts_links_2",
        "filter": ["all", [">=", "total_sum", 1000], ["<", "total_sum", 2000]],
        "paint": {
          "line-opacity": 0.2,
          "line-width": 1,
          "line-color": "#fff"
        }
      },
      { "id": "velobike_districts_links_3",
        "filter": ["all", [">=", "total_sum", 3000], ["<", "total_sum", 5000]],
        "paint": {
          "line-opacity": 0.2,
          "line-width": 2.5,
          "line-color": "#fff"
        }
      },
      { "id": "velobike_districts_links_4",
        "filter": ["all", [">=", "total_sum", 5000], ["<", "total_sum", 10000]],
        "paint": {
          "line-opacity": 0.2,
          "line-width": 8,
          "line-color": "#fff"
        }
      },
      { "id": "velobike_districts_links_5",
        "filter": ["all", [">", "total_sum", 10000]],
        "paint": {
          "line-opacity": 0.4,
          "line-width": 15,
          "line-color": "#fff"
        }
      }
    ]
  },
  {
      "menu-label": { "en": "Fares", "ru": "Тарифы"},
      "label": { "en": "Fares", "ru": "Каким был самый популярный тариф"},
      "state": "fares",
      "legend": {
        "description": { "en": "Total stats", "ru": "Маршруты у которых доля всех поездок больше половины, по тарифам."},
        "image": "legend-fares.svg",
        "min": { "en": "daily fare", "ru": "дневной"},
        "max": { "en":  "season fare", "ru": "сезонный" },
        "disclaimer": { "en": "Routes built automaticaly", "ru": "Так как GPS-данных у Велобайка нет, линии маршрутов построены автоматически и представляют собой некоторое усреднение."}
      },
      "layers": [
        { "id": "velobike_directions_1",
          "filter": ["all", [">","fares_season", 50]],
          "paint": {
            "line-color": "#ff7500",
            "line-width": {"stops":[[10,0.3],[17,3]]},
            "line-opacity": {"stops":[[10,0.2],[17,0.3]]}
          }
        },
        { "id": "velobike_directions_2",
          "filter": ["all", [">=","fares_month", 50]],
          "paint": {
            "line-color": "#ff00CC",
            "line-width": {"stops":[[10,0.5],[17,3]]},
            "line-opacity": {"stops":[[10,0.2],[17,0.3]]}
          }
        },
        { "id": "velobike_directions_3",
          "filter": ["all", [">=","fares_day", 50]],
          "paint": {
            "line-color": "#25baff",
            "line-width": {"stops":[[10,0.3],[17,3]]},
            "line-opacity": {"stops":[[10,0.2],[17,0.3]]}
          }
        }
      ]
  },
  {
    "menu-label": { "en": "Subway distance", "ru": "Расстояние до метро"},
    "label": { "en": "Subway distance", "ru": "Расстояние до метро"},
    "state": "all_routes_100",
    "legend": {
      "description": { "en": "Total stats", "ru": "Расстояние до ближайшего метро(по прямой, метры)."},
      "image": "legend-roundtrips.svg",
      "min": { "en": "7 m", "ru": "7 м"},
      "max": { "en":  "2540", "ru": "2540" }
    },
    "hidden": true,
    "layers": [
      { "id": "velobike_stations_labels",
        "filter": ["all"],
        "layout": {
          "text-field": "{subway_distance}"
        }
      },
      { "id": "velobike_directions_1",
        "filter": ["all", [">","total", 50], ["==", "is_roundtrip", 0]],
        "paint": {
          "line-color": "#ccc",
          "line-width": 0.2,
          "line-opacity": 0.1
        }
      },
      { "id": "velobike_directions_2",
        "filter": ["all", ["<","source_subway", 400], ["<","destination_subway", 400]],
        "paint": {
          "line-color": "#CC3300",
          "line-width": 0.5,
          "line-opacity": 0.5
        }
      },
      { "id": "velobike_station_circle_1",
        "filter": ["all", ["<=","subway_distance", 400]],
        "paint": {
          "circle-color": "#CC3300",
          "circle-radius": 10,
          "circle-opacity": 0.8
        }
      },
      { "id": "velobike_station_circle_2",
        "filter": ["all", [">","subway_distance", 400], ["<=","subway_distance", 800]],
        "paint": {
          "circle-color": "#CC3300",
          "circle-radius": 10,
          "circle-opacity": 0.4
        }
      },
      { "id": "velobike_station_circle_3",
        "filter": ["all", [">","subway_distance", 800], ["<=","subway_distance", 1200]],
        "paint": {
          "circle-color": "#CC3300",
          "circle-radius": 10,
          "circle-opacity": 0.2
        }
      },
      { "id": "velobike_station_circle_4",
        "filter": ["all", [">","subway_distance", 1200]],
        "paint": {
          "circle-color": "#CC3300",
          "circle-radius": 10,
          "circle-opacity": 0.1
        }
      }
      ]
    },
    {
      "menu-label": { "en": "Duration", "ru": "Время маршрута"},
      "label": { "en": "Duration", "ru": "Сколько в среднем длилась каждая поездка"},
      "state": "duration",
      "legend": {
        "description": { "en": "Total stats", "ru": "Среднее время поездки на каждом маршруте"},
        "image": "legend-duration.svg",
        "min": { "en": "< 30 мин", "ru": "<30 мин"},
        "max": { "en":  "> 120", "ru": "> 120 мин" }
      },
      "layers": [
        { "id": "velobike_directions_1",
          "filter": ["all", [">","average_duration", 0], ["<","average_duration", 30]],
          "paint": {
            "line-color": "#FFFF00",
            "line-width": 0.5,
            "line-opacity": 0.2
          }
        },
        { "id": "velobike_directions_2",
          "filter": ["all", [">=","average_duration", 30], ["<","average_duration", 60]],
          "paint": {
            "line-color": "#FF3300",
            "line-width": 0.5,
            "line-opacity": 0.3
          }
        },
        { "id": "velobike_directions_3",
          "filter": ["all", [">=","average_duration", 60], ["<","average_duration", 120]],
          "paint": {
            "line-color": "#E010DA",
            "line-width": 0.5,
            "line-opacity": 0.2
          }
        },
        { "id": "velobike_directions_4",
          "filter": ["all", [">=","average_duration", 120]],
          "paint": {
            "line-color": "#3B13FE",
            "line-width": 0.5,
            "line-opacity": 0.4
          }
        }
      ]
  },
  {
  "menu-label": { "en": "Super-user", "ru": "Супер-пользователь"},
  "label": { "en": "Super-user", "ru": "География поездок самого активного пользователя"},
  "state": "top_user",
  "legend": {
    "description": { "en": "Total stats", "ru": "Пользователь, который сделал 3106 поездки за весь сезон."},
    "image": "legend-topuser.svg",
    "min": { "en": "", "ru": ""},
    "max": { "en":  "1114 rides", "ru": "1114 поездки" }
  },
  "layers": [
    { "id": "top_user",
      "filter": ["all", ["==", "client", 2460]],
      "paint": {
        "line-color": "#FF0066",
        "line-opacity": 0.5,
        "line-width": 0.8
      }
    }]
  },
  {
  "menu-label": { "en": "Bike #2222", "ru": "Супер-велосипед"},
  "label": { "en": "Bike #2222", "ru": "Какой велосипед брали чаще всего"},
  "state": "top_bikes",
  "legend": {
    "description": { "en": "Total stats", "ru": "Велосипед — лидер по числу поездок. Его брали в прокат 558 раз за сезон."},
    "image": "legend-topbike.svg",
    "min": { "en": "", "ru": ""},
    "max": { "en":  "558 rides", "ru": "558 поездок" }
  },
  "layers": [
    { "id": "top_bike",
      "filter": ["all", ["==", "bike", 2222]],
      "paint": {
        "line-color": "#5599FF",
        "line-width": 0.7,
        "line-opacity": 0.7
      }
    }]
  },
  {
  "menu-label": { "en": "Selected station", "ru": "Cтанция проката"},
  "label": { "en": "Cтанция 100", "ru": "Cтанция проката"},
  "state": "station",
  "hidden": true,
  "legend": {
    "description": { "en": "Total stats", "ru": "Велосипед — лидер по числу поездок. Его брали в прокат 558 раз за сезон."},
    "image": "legend-station.svg",
    "min": { "en": "входящие", "ru": "входящие"},
    "max": { "en":  "исходящие", "ru": "исходящие" }
  },
  "layers": [
    { "id": "velobike_station_point",
      "paint": {
        "text-opacity": 1,
        "icon-opacity": 1,
        "text-color": "#FFF",
        "text-opacity": {"stops": [[11, 0],[15,0.8]] }
      }
    },
    { "id": "velobike_station_circle_1",
      "paint": {
        "text-opacity": 1,
        "text-color": "#FFF",
        "text-opacity": {"stops": [[11, 0],[15,0.8]] }
      }
    },
    { "id": "velobike_station_circle_1",
      "paint": {
        "circle-color": "#fff",
        "circle-radius": {"stops": [[9,2],[14,8],[17,12]]},
        "circle-opacity": 0.2
      }
    },
    { "id": "velobike_station_circle_2",
      "paint": {
        "circle-color": "#fff",
        "circle-radius": {"stops": [[9,2],[14,8],[17,12]]},
        "circle-opacity": {"stops": [[9,0],[14,0.3],[17,0.3]]},
      }
    },
    { "id": "velobike_directions_1",
      "filter": ["all", ["==", "source", 9999]],
      "paint": {
        "line-color": "#FFBC36",
        "line-width": {"stops": [[10,2],[17,4]]},
        "line-opacity": 0.6
      }
    },
      { "id": "velobike_directions_2",
        "filter": ["all", ["==", "source", 9999]],
        "paint": {
          "line-color": "#FFBC36",
          "line-width": {"stops": [[10,0.8],[17,1.5]]},
          "line-opacity": 0.4
      }
    },
    { "id": "velobike_directions_3",
      "filter": ["all", ["==", "destination", 9999]],
      "paint": {
        "line-color": "#6699FF",
        "line-width": {"stops": [[10,2],[17,4]]},
        "line-opacity": 0.4
      }
    },
      { "id": "velobike_directions_4",
        "filter": ["all", ["==", "destination", 9999]],
        "paint": {
          "line-color": "#6699FF",
          "line-width": {"stops": [[10,0.8],[17,1.5]]},
          "line-opacity": 0.3
      }
    }
  ]
  },
  {
  "menu-label": { "en": "Selected district", "ru": "Хамовники"},
  "label": { "en": "Район", "ru": "Хамовники"},
  "state": "district",
  "hidden": true,
  "legend": {
    "description": { "en": "Total stats", "ru": "Велосипед — лидер по числу поездок. Его брали в прокат 558 раз за сезон."},
    "image": "legend-district.svg",
    "min": { "en": "inside", "ru": "внутренние"},
    "max": { "en":  "outside", "ru": "внешние" }
  },
  "layers": [
    { "id": "districts_labels",
    "filter": ["all"],
    "layout": {
      "text-field": "{name_en}",
      "text-size": 14,
      "text-offset": [0,0]
      }
    },
    { "id": "velobike_districts_all",
      "filter": ["all"],
      "paint": {
        "fill-opacity": 0,
        "fill-color": "#6666FF",
        "stroke-width": 1
      }
    },
    { "id": "velobike_districts_1",
      "filter": ["all", ["==", "id", 131]],
      "paint": {
        "fill-opacity": 0,
        "fill-color": "#00BD6B",
        "stroke-width": 1
      }
    },
    { "id": "velobike_station_point",
      "paint": {
        "text-opacity": 1,
        "icon-opacity": 1,
        "text-color": "#FFF",
        "text-opacity": {"stops": [[13, 0],[15,1]] }
      }
    },
    { "id": "velobike_station_circle_1",
      "filter": ["all", ["==", "district", 131]],
      "paint": {
        "circle-color": "#CCC",
        "circle-radius": {"stops": [[9,2],[14,8],[17,12]]},
        "circle-opacity": 0.8
      }
    },
    { "id": "velobike_station_circle_0",
      "filter": ["all", ["!=", "district", 131]],
      "paint": {
        "circle-color": "#CCC",
        "circle-radius": {"stops": [[9,0.5],[14,3],[17,5]]},
        "circle-opacity": 0.5
      }
    },
      { "id": "velobike_directions_2",
        "filter": ["all", ["==", "source_district", 131], ["!=", "destination_district", 131]],
        "paint": {
          "line-color": "#FFBC36",
          "line-width": {"stops": [[10,0.3],[17,1]]},
          "line-opacity": 0.4
      }
    },
    { "id": "velobike_directions_3",
      "filter": ["all", ["==", "source_district", 131], ["==", "destination_district", 131]],
      "paint": {
        "line-color": "#00CD8B",
        "line-width": {"stops": [[10,0.5],[17,1]]},
        "line-opacity": 0.5
      }
    }
  ]
  }
];
