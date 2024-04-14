import * as fetchTime from './fetchTime.js'
import * as fiveDaysForecast from './5daysForecast.js'
import {weatherConditions} from './weatherIcon.js'



const defaultSearch =  document.querySelector("#default-search")
const  cityName = document.querySelector("#cityname")
const  searchBox =  document.querySelector(".input")
const weatherImg =  document.querySelector(".weatherImg")







const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";


export const weatherData = () => {
    const getWeather = async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
  
      // Update the UI with the weather data
      cityName.innerHTML = data.name;
      
      document.querySelector('#degree').innerHTML = `${Math.floor(data.main.temp)}°C`;
      document.querySelector('#feelslike').innerHTML = `${Math.floor(data.main.feels_like)}°C`;
      document.querySelector('.humidity').innerHTML = data.main.humidity;
      document.querySelector('.windSpeed').innerHTML = `${Math.floor(data.wind.speed * 3.6)}km/h`;
      document.querySelector('.pressure').innerHTML = `${data.main.pressure}hpa`;
      document.querySelector('.visibility').innerHTML = `${data.visibility / 1000} km`;
      document.querySelector(".sunset").innerHTML = sunset(data.sys.sunset, data.timezone);
      document.querySelector(".sunrise").innerHTML = sunset(data.sys.sunrise, data.timezone);
  
      const weatherMain = data.weather[0].main;
      weatherImg.src = weatherConditions[weatherMain];
      document.querySelector(".weatherName").innerHTML = weatherMain;
  
      // Call fiveDays Forecasting
      fiveDaysForecast.getForecast(data.coord.lat, data.coord.lon);
    };
  
    //Set default value and update UI on window load
    window.onload = async function() {
        document.body.style.display="block"
        fetchTime.fetchWorldTime("lahore");
       await getWeather("lahore");
      
      
    };
  
    searchBox.addEventListener("submit", async (e) => {
      e.preventDefault();
      defaultSearch.blur();
      console.log("event default work");
      fetchTime.fetchWorldTime(defaultSearch.value);
      
      await getWeather(defaultSearch.value);
      defaultSearch.value = "";
      
    });
  
    let searchVal = function capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1);
    };
  };
  

// function convert unix time to actual time
export function sunset(unixTimestamp, timezone) {
    // Create a new Date object with the Unix timestamp in UTC
    const dateUTC = new Date(unixTimestamp * 1000);
    
    // Get the UTC hours and minutes
    const hoursUTC = dateUTC.getUTCHours();
    const minutesUTC = dateUTC.getUTCMinutes();
    
    // Calculate the local time by adding the timezone offset
    const localHours = hoursUTC + (timezone / 3600); // Convert seconds to hours
    const localMinutes = minutesUTC;
    
    // Adjust for 24-hour time if necessary
    const adjustedHours = localHours >= 24 ? localHours - 24 : localHours;
    
    // Determine AM/PM and format hours
    const period = adjustedHours >= 12 ? "PM" : "AM";
    const formattedHours = adjustedHours % 12 || 12; // Adjust for 12-hour format
    
    // Add leading zero if minutes less than 10
    const formattedMinutes = localMinutes < 10 ? "0" + localMinutes : localMinutes;
    
    return`${formattedHours}:${formattedMinutes} ${period}`;
}

 

