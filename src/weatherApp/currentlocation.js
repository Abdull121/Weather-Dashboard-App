import * as fetchWeatherApi from "./api.js";
import * as fetchTime from "./fetchTime.js";
import * as fetchWeather from "./fetchWeatehr.js";
import { weatherConditions } from "./weatherIcon.js";
import * as fiveDaysForecast from "./5daysForecast.js";

const cLocation = document.querySelector(".currentlocation");
const weatherImg = document.querySelector(".weatherImg");
const animate = document.querySelectorAll(".animation");
const loading = document.querySelector(".loading");
const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";
const url = "https://api.openweathermap.org/geo/1.0/reverse?";

const display = (data) => {
  //  console.log(data.timezone)
  const weatherMain = data.weather[0].main;

  document.querySelector("#degree").innerHTML = `${Math.floor(
    data.main.temp
  )}°C`;

  document.querySelector("#feelslike").innerHTML = `${Math.round(
    data.main.feels_like
  )}°C`;
  document.querySelector(".humidity").innerHTML = data.main.humidity;
  document.querySelector(".windSpeed").innerHTML = `${Math.round(
    data.wind.speed * 3.6
  )}km/h`;
  document.querySelector(".pressure").innerHTML = `${data.main.pressure}hpa`;
  document.querySelector(".visibility").innerHTML = `${
    data.visibility / 1000
  } km`;

  // sunrise(data.sys.sunrise)

  document.querySelector(".sunset").innerHTML = fetchWeather.sunset(
    data.sys.sunset,
    data.timezone
  );
  document.querySelector(".sunrise").innerHTML = fetchWeather.sunset(
    data.sys.sunrise,
    data.timezone
  );

  // access and show weather icons from weatherIcon.js

  weatherImg.src = weatherConditions[weatherMain];
  document.querySelector(".weatherName").innerHTML = weatherMain;

  // call fiveDays Forecasting

  fiveDaysForecast.getForecast(data.coord.lat, data.coord.lon);
};

const getUserLocation = async (lat, long) => {
  const apiUrl = `${url}lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`;

  loading.style.display = "grid";
  animate.forEach((e) => {
    e.classList.remove("fade-in");
    e.style.display = "none";
  });

  try {
    const response = await fetch(apiUrl);
    const locationData = await response.json();
    // console.log(locationData)
    const result = await fetchWeatherApi.getWeather(locationData[0].name);
    //
    // console.log(result.timezone);
    display(result);

    document.querySelector("#cityname").innerHTML = result.name;

    const timeZoneName = getTimezoneName(result.timezone);

    fetchTime.fetchWorldTime(timeZoneName, result.timezone);

    //delay the loader
    setTimeout(() => {
      loading.style.display = "none";
    }, 300);

    setTimeout(() => {
      animate.forEach((e) => {
        e.style.display = "block";
        e.classList.add("fade-in");
      });
    }, 300);
  } catch (error) {
    loading.style.display = "none";
    animate.forEach((e) => {
      e.classList.add("fade-in");
      e.style.display = "block";
    });
    console.log(error);
  }
};

export const currentLocation = () => {
  cLocation.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position)
          const { latitude, longitude } = position.coords;

          getUserLocation(latitude, longitude);
        },

        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
    }
  });
};

//convert UnixTimezone to TimezoneName

function getTimezoneName(offsetInSeconds) {
  const offsetInHours = offsetInSeconds / 3600; // Convert seconds to hours

  // Define a mapping of common timezone offsets to timezone names
  const timezoneMap = {
    "-12": "Etc/GMT+12",
    "-11": "Etc/GMT+11",
    "-10": "Etc/GMT+10",
    "-9": "Etc/GMT+9",
    "-8": "Etc/GMT+8",
    "-7": "Etc/GMT+7",
    "-6": "Etc/GMT+6",
    "-5": "Etc/GMT+5",
    "-4": "Etc/GMT+4",
    "-3": "Etc/GMT+3",
    "-2": "Etc/GMT+2",
    "-1": "Etc/GMT+1",
    0: "Etc/GMT",
    1: "Etc/GMT-1",
    2: "Etc/GMT-2",
    3: "Etc/GMT-3",
    4: "Etc/GMT-4",
    5: "Etc/GMT-5",
    6: "Etc/GMT-6",
    7: "Etc/GMT-7",
    8: "Etc/GMT-8",
    9: "Etc/GMT-9",
    10: "Etc/GMT-10",
    11: "Etc/GMT-11",
    12: "Etc/GMT-12",
  };

  // Look up the timezone name based on the offset
  const timezoneName = timezoneMap[offsetInHours];

  return timezoneName;
}
