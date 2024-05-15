import { weatherConditions, windDirection } from "./weatherIcon.js";

const timeForecast = document.querySelector(".hourlyforecast");
const divImg = document.querySelector(".images");
const degree = document.querySelector(".degree");
const windIcon = document.querySelector(".navigation");

//  make two same function separately to display data  //1st function
// because first three card background color is different and last two card color is different
// first three card color is orange gradient last two is purple gradient so we make a two separate function
const displayForecast = (data) => {
  let weatherIcon = data.weather[0].main;
  let date_string = data.dt_txt;
  let dateObj = new Date(date_string);
  let formatted_time = dateObj.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <div class="w-[135px] h-[290px] orange rounded-[40px] -mt-5 py-5">
      <span class="text-[24px] font-bold px-8">${formatted_time}</span>
      <img src="${weatherConditions[weatherIcon]}" class="w-[70px] ml-9">
      <span class="text-[20px] font-bold">${Math.floor(
        data.main.temp_max
      )}°C</span>
      <img src="${
        windDirection[0]
      }" alt="direction-1" class="ml-9 my-2 rotate-[${data.wind.deg}deg]">
      <span class="text-[20px] font-bold">${Math.floor(
        data.wind.speed * 3.6
      )}km/h</span>
    </div>
  `;
};
//2nd function
// last two card background color is purple gradient
const displaySecondForecast = (data) => {
  let weatherIcon = data.weather[0].main;
  let date_string = data.dt_txt;
  let dateObj = new Date(date_string);
  let formatted_time = dateObj.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <div class="w-[135px] h-[290px] purple rounded-[40px] -mt-5 py-5">
      <span class="text-[24px] font-bold px-8">${formatted_time}</span>
      <img src="${weatherConditions[weatherIcon]}" class="w-[70px] ml-9">
      <span class="text-[20px] font-bold">${Math.floor(
        data.main.temp_max
      )}°C</span>
      <img src="${
        windDirection[0]
      }" alt="direction-1" class="ml-9 my-2 rotate-[${data.wind.deg}deg]">
      <span class="text-[20px] font-bold">${Math.floor(
        data.wind.speed * 3.6
      )}km/h</span>
    </div>
  `;
};

export const hourlyForecast = (data) => {
  var uniqueWeatherTime = [];
  const filterTime = data.list.filter((forecastTime) => {
    const weatherTime = new Date(forecastTime.dt_txt).getTime();
    if (!uniqueWeatherTime.includes(forecastTime)) {
      return uniqueWeatherTime.push(forecastTime);
    }
  });
  // console.log(filterTime)
  timeForecast.classList.add("hourly");

  // divide the card in to two parts because of cards background color
  // slice the first three card background is orange gradient
  // total hourly card is 5 slice first three (0-3)
  const getTime = filterTime.slice(0, 3);
  // console.log(getTime)
  timeForecast.innerHTML = "";
  divImg.innerHTML = "";
  degree.innerHTML = "";
  windIcon.innerHTML = "";
  getTime.forEach((element) => {
    timeForecast.insertAdjacentHTML("beforeend", displayForecast(element));

    // console.log(element)
  });

  // last two card slice because background color is gradient purple
  // total hourly card is 5 slice last two card data (3-5)

  const getSecondTime = filterTime.slice(3, 5);

  getSecondTime.forEach((element) => {
    timeForecast.insertAdjacentHTML(
      "beforeend",
      displaySecondForecast(element)
    );

    // console.log(element)
  });
};
