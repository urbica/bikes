
var states = [
  {
    "label": { "en": "Total departures", "ru": "Общая статистика"},
    "state": "total",
    "layers": [
      { "id": "velobike_stations_labels",
        "filter": ["all", [">=","departures", 500]],
        "layout": {
          "text-field": "{departures}"
        }
      },
      { "id": "velobike_directions",
        "paint": {
          "line-color": "#8f8"
        }
      },
      { "id": "velobike_circle_0",
        "filter": ["all", [">","departures", 0], ["<","departures", 1000]],
        "paint": {
          "circle-radius": 5,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_1",
        "filter": ["all", [">=","departures", 1000], ["<","departures", 2000]],
        "paint": {
          "circle-radius": 10,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_2",
        "filter": ["all", [">=","departures", 2000], ["<","departures", 3000]],
        "paint": {
          "circle-radius": 14,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_3",
        "filter": ["all", [">=","departures", 3000], ["<","departures", 4000]],
        "paint": {
          "circle-radius": 17,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_4",
        "filter": ["all", [">=","departures", 4000], ["<","departures", 5000]],
        "paint": {
          "circle-radius": 20,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_5",
        "filter": ["all", [">=","departures", 5000], ["<","departures", 6000]],
        "paint": {
          "circle-radius": 22,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_6",
        "filter": ["all", [">=","departures", 6000], ["<","departures", 7000]],
        "paint": {
          "circle-radius": 24,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_7",
        "filter": ["all", [">=","departures", 7000], ["<","departures", 8000]],
        "paint": {
          "circle-radius": 26,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_8",
        "filter": ["all", [">=","departures", 8000], ["<","departures", 9000]],
        "paint": {
          "circle-radius": 28,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_9",
        "filter": ["all", [">=","departures", 9000], ["<","departures", 10000]],
        "paint": {
          "circle-radius": 30,
          "circle-color": "#8f8"
        }
      },
      { "id": "velobike_circle_10",
        "filter": ["all", [">=","departures", 10000]],
        "paint": {
          "circle-radius": 32,
          "circle-color": "#8f8"
      }
    }]
  },

];
