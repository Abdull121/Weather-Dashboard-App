import * as fetchWeather from "./fetchWeather.js";
import * as currentLocation from "./currentlocation.js";
const darkMode = document.querySelector(".darkmode");
const toggleBtn = document.querySelector(".toggle");

darkMode.style.color = "white";

currentLocation.currentLocation();

fetchWeather.weatherData();

let flag = false;

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("bg");
  toggleBtn.classList.toggle("border");
  document.body.classList.toggle("search-field");
  document.body.classList.toggle("cardColor");
  document.body.classList.toggle("icon-color");
  document.body.classList.toggle("hourly-orange");
  document.body.classList.toggle("hourly-purple");

  if (!flag) {
    darkMode.innerHTML = "Light Mode";
    darkMode.style.color = "black";

    flag = true;
  } else {
    flag = false;
    darkMode.innerHTML = "Dark Mode";
    darkMode.style.color = "white";
  }
});
