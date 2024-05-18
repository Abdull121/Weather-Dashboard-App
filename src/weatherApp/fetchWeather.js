import * as fetchTime from "./fetchTime.js";
import * as fiveDaysForecast from "./5daysForecast.js";
import { weatherConditions } from "./weatherIcon.js";


const defaultSearch = document.querySelector("#default-search");
const cityName = document.querySelector("#cityname");
const searchBox = document.querySelector(".input");
const weatherImg = document.querySelector(".weatherImg");
const animate = document.querySelectorAll(".animation");
const loading = document.querySelector(".loading");

const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";

var data;
var timezoneName;
export const weatherData = () => {
  const getWeather = async (city) => {
    //loader
    loading.style.display = "grid";
    animate.forEach((e) => {
      e.classList.remove("fade-in");
      e.style.display = "none";
    });

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok or invalid url");
      }


      data = await response.json();

      
      
      

      // Update the UI with the weather data
      //  console.log(data)
      cityName.innerHTML = data.name;

      document.querySelector("#degree").innerHTML = `${Math.floor(
        data.main.temp
      )}°C`;
      document.querySelector("#feelslike").innerHTML = `${Math.floor(
        data.main.feels_like
      )}°C`;
      document.querySelector(".humidity").innerHTML = data.main.humidity;
      document.querySelector(".windSpeed").innerHTML = `${Math.floor(
        data.wind.speed * 3.6
      )}km/h`;
      document.querySelector(
        ".pressure"
      ).innerHTML = `${data.main.pressure}hpa`;
      document.querySelector(".visibility").innerHTML = `${
        data.visibility / 1000
      } km`;
      document.querySelector(".sunset").innerHTML = sunset(
        data.sys.sunset,
        data.timezone
      );
      document.querySelector(".sunrise").innerHTML = sunset(
        data.sys.sunrise,
        data.timezone
      );

      const weatherMain = data.weather[0].main;
      weatherImg.src = weatherConditions[weatherMain];
      document.querySelector(".weatherName").innerHTML = weatherMain;

      // Call fiveDays Forecasting
      fiveDaysForecast.getForecast(data.coord.lat, data.coord.lon);

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

      // Assuming the offset received from the API
      timezoneName = getTimezoneName(data.timezone);
      // console.log(timezoneName);

      //delay the loader
      setTimeout(() => {
        loading.style.display = "none";
      }, 1500);

      setTimeout(() => {
        animate.forEach((e) => {
          e.style.display = "block";
          e.classList.add("fade-in");
        });
      }, 1500);
    } catch (error) {
      console.log(error);

      loading.style.display = "none";
      animate.forEach((e) => {
        e.classList.add("fade-in");
        e.style.display = "block";
      });

      window.alert("Enter a correct City Name!");
      console.error("ERROR" + error.message);
    }
  };

  //Set default value and update UI on window load
  window.onload = async function () {
    document.body.style.display = "block";
    await getWeather("lahore");
    await fetchTime.fetchWorldTime(timezoneName, data.timezone);
  };

  searchBox.addEventListener("submit", async (e) => {
    e.preventDefault();
    defaultSearch.blur();
    //   console.log("event default work");

    await getWeather(defaultSearch.value);

    fetchTime.fetchWorldTime(timezoneName, data.timezone);

    defaultSearch.value = "";
  });
};

// function convert unix time to actual time
export function sunset(unixTimestamp, timezone) {
  // Create a new Date object with the Unix timestamp in UTC
  const dateUTC = new Date(unixTimestamp * 1000);

  // Get the UTC hours and minutes
  const hoursUTC = dateUTC.getUTCHours();
  const minutesUTC = dateUTC.getUTCMinutes();

  // Calculate the local time by adding the timezone offset
  const localHours = hoursUTC + timezone / 3600; // Convert seconds to hours
  const localMinutes = minutesUTC;

  // Adjust for 24-hour time if necessary
  const adjustedHours = localHours >= 24 ? localHours - 24 : localHours;

  // Determine AM/PM and format hours
  const period = adjustedHours >= 12 ? "PM" : "AM";
  const formattedHours = adjustedHours % 12 || 12; // Adjust for 12-hour format

  // Add leading zero if minutes less than 10
  const formattedMinutes =
    localMinutes < 10 ? "0" + localMinutes : localMinutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
}
