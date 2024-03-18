import * as fetchTime from './fetchTime.js'
import * as fetchWeather from './fetchWeatehr.js'



fetchWeather.weatherData()
const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";

const lat =31.5497;
const lon = 74.3436;

const getforcast = async()=>{
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
   const response = await fetch(url);
   const data = await response.json();
    console.log(data)

}

getforcast();



// addEventListener("load",()=>{
//     fetchTime.fetchWorldTime("lahore")
   

// })





//1710551486

//1710594667



