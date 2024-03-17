import * as fetchTime from './fetchTime.js'
import * as fetchWeather from './fetchWeatehr.js'



fetchWeather.weatherData()

const lat = 37.75
const lon = -122.37
const api = "544e0f69c9cccccab9abd812d7fa8bb8"

const getUv = async ()=>{

    const url = `http://api.openweathermap.org/v3/uvi/${lat},${lon}/current.json?appid=${api}`;
        const response = await fetch(url);
         data = await response.json();
         console.log(data)

}
getUv()



// addEventListener("load",()=>{
//     fetchTime.fetchWorldTime("lahore")
   

// })





//1710551486

//1710594667



