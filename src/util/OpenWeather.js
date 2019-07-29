const apiKey = '2e47a0bee1e2a7d9c0b4cf08476d838c';
const baseUri = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUri = 'https://api.openweathermap.org/data/2.5/forecast';

const OpenWeather = {
  async getWeather(location) {
    let urlToFetch = OpenWeather.checkRequest(baseUri, location);
    return await fetch(urlToFetch)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.cod.toString() === "404") {
          return {cod: jsonResponse.cod};
        } else if (jsonResponse.cod.toString === "400") {
          return {cod: jsonResponse.cod};
        } else if (jsonResponse.cod === 200) {
          const sunriseTime = new Date(jsonResponse.sys.sunrise * 1000);
          const sunsetTime = new Date(jsonResponse.sys.sunset * 1000);
          const sortTime = function(time) {
            if (time < 10) {
              return "0" + time;
            }
            return time;
          };
          return {
            cod: jsonResponse.cod,
            name: jsonResponse.name + ", " + jsonResponse.sys.country,
            main: jsonResponse.weather[0].main,
            temp: Math.round((jsonResponse.main.temp) - 273.15),
            sunrise: sortTime(sunriseTime.getHours())+":"+sortTime(sunriseTime.getMinutes()),
            sunset: sortTime(sunsetTime.getHours())+":"+sortTime(sunsetTime.getMinutes()),
            icon: "https://openweathermap.org/img/w/"+jsonResponse.weather[0].icon+".png",
            windSpeed: jsonResponse.wind.speed,
            windDeg: jsonResponse.wind.deg
          };
        };
      });
  },

  getForecast(location) {
    let urlToFetch = OpenWeather.checkRequest(forecastUri, location);
    return fetch(urlToFetch)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.cod === "404") {
          return {cod: jsonResponse.cod};
        } else if (jsonResponse.cod.toString() === "200") {
          let item;
          let fifteenHours = [];
          let days = [];
          let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          for (let i = 0; i < jsonResponse.list.length; i++) {
            const item = jsonResponse.list[i];

            // Take item if it's a midday
            if (item.dt_txt.substr(11, 2) === "12") {
              const date = new Date(item.dt * 1000);
              const weekDay = weekDays[date.getDay()];
              days.push({
                id: item.dt,
                weekDay: weekDay,
                temp: Math.round((item.main.temp) - 273.15),
                icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                main: item.weather[0].main
              });
            }
          }

          for (item=0; item<5; item++) {
            const date = new Date(jsonResponse.list[item].dt * 1000);
            let hours = date.getHours();
            if (hours < 10) {
              hours = `0${hours}:00`;
            } else {
              hours = hours.toString()+":00";
            }
            fifteenHours.push({
              id: jsonResponse.list[item].dt,
              main: jsonResponse.list[item].weather[0].main,
              icon: `https://openweathermap.org/img/w/${jsonResponse.list[item].weather[0].icon}.png`,
              hours: hours,
              temp: Math.round((jsonResponse.list[item].main.temp) - 273.15)
            });
          }
          return {days: days, fifteenHours: fifteenHours};
        };
      });
  },

  checkRequest(url, location) {
    if (location[0] === "?") {
      return url + location + "&appid=" + apiKey;
    } else {
      return url + "?q=" + location + "&appid=" + apiKey;
    }
  }
};

export default OpenWeather;
