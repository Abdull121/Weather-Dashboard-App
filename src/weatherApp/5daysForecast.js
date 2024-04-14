const fivDaysDiv = document.querySelector(".forecast");
const div = document.querySelectorAll(".div");
import { weatherConditions } from "./weatherIcon.js";
import { hourlyForecast } from "./hourlyforecast.js";
const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";

const fiveDaysWeather = (weatherItem) => {
  let weatherMain = weatherItem[2][1];

  return ` 
            
            <li class="flex justify-evenly items-center text-center lg:gap-[4vw] gap-[16vw] max-sm:gap-[10vw] ">
            <img src="${weatherConditions[weatherMain]}" class = "w-[60px]">
                <span class="font-semibold text-[24px] max-sm:text-[22px]">${Math.round(
                  weatherItem[1]
                )}°C</span>
                <span class="font-semibold text-[20px] max-sm:text-[18px]">${
                  weatherItem[0]
                }</span>
            </li>
            

`;
};

export const getForecast = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data)
  hourlyForecast(data);

  fivDaysDiv.innerHTML = `<h2 class=" font-bold mb-5 text-[32px]">5 Days Forecast:</h2>`;

  function calculateMaxTemperatures(forecastData) {
    const temperatures = [];
    const dates = [];
    const weather = [];

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Iterate through the forecast data
    forecastData.list.forEach((forecast) => {
      // Extract date from forecast timestamp (YYYY-MM-DD)
      const date = forecast.dt_txt.split(" ")[0];

      // Get maximum temperature for the day
      const temperature = forecast.main.temp_max;

      // Get weather information for the day
      const weatherInfo = [
        forecast.weather[0].id,
        forecast.weather[0].main,
        forecast.weather[0].description,
        forecast.weather[0].icon,
      ];

      // If the date is not today and not yet in the dates array, add it and store the temperature and weather
      if (date !== today && dates.indexOf(date) === -1) {
        dates.push(date);
        temperatures.push(temperature);
        weather.push(weatherInfo);
      } else if (date !== today) {
        // If the date is already in the dates array, update the temperature and weather if the temperature is higher
        const index = dates.indexOf(date);
        if (temperature > temperatures[index]) {
          temperatures[index] = temperature;
          weather[index] = weatherInfo;
        }
      }
    });

    // Sort the dates array
    dates.sort();

    // Take only the first five elements (next five days)
    const nextFiveDays = dates.slice(0, 5);

    // Create a new array with the formatted dates, corresponding temperatures, and weather information
    const nextFiveDaysData = nextFiveDays.map((date, index) => {
      // Convert date to the desired format "Tue, 19 Sep"
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
      return [formattedDate, temperatures[index], weather[index]];
    });

    return nextFiveDaysData;
  }

  const maxTemperatures = calculateMaxTemperatures(data);

  maxTemperatures.forEach((element) => {
    fivDaysDiv.insertAdjacentHTML("beforeend", fiveDaysWeather(element));
  });
};
