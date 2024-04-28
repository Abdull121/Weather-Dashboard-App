import * as fetchWeatherApi from './api.js'
import * as fetchTime from './fetchTime.js'
import * as fetchWeather from './fetchWeatehr.js'
import {weatherConditions} from './weatherIcon.js'
import * as fiveDaysForecast from './5daysForecast.js'

const cLocation= document.querySelector('.currentlocation')
const weatherImg =  document.querySelector(".weatherImg")
const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";
const url = "https://api.openweathermap.org/geo/1.0/reverse?"





const display = (data)=>{
    // console.log(data)
    const weatherMain = data.weather[0].main;

    document.querySelector('#degree').innerHTML = `${Math.floor(data.main.temp)}°C`
                        
    document.querySelector('#feelslike').innerHTML = `${Math.round(data.main.feels_like)}°C`
    document.querySelector('.humidity').innerHTML = data.main.humidity
    document.querySelector('.windSpeed').innerHTML = `${Math.round(data.wind.speed*3.6)}km/h`
    document.querySelector('.pressure').innerHTML = `${data.main.pressure}hpa`
    document.querySelector('.visibility').innerHTML = `${data.visibility/1000} km`
        
        
            // sunrise(data.sys.sunrise)
                        
                        document.querySelector(".sunset").innerHTML= fetchWeather.sunset(data.sys.sunset, data.timezone )
                        document.querySelector(".sunrise").innerHTML= fetchWeather.sunset(data.sys.sunrise, data.timezone )
    
                       
                        
                        // access and show weather icons from weatherIcon.js

                        weatherImg.src = weatherConditions[weatherMain];
                        document.querySelector(".weatherName").innerHTML = weatherMain;

                        // call fiveDays Forecasting
                        
                        fiveDaysForecast.getForecast(data.coord.lat,data.coord.lon )

  }
 
const getUserLocation= async (lat,long)=>{
 
    
    // latitude: 31.4640021
    // longitude: 74.4434867

    const apiUrl = `${url}lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`
    

  

    try{


        const response = await fetch(apiUrl)
        const locationData = await response.json()
        // console.log(locationData)
        const result = await fetchWeatherApi.getWeather(locationData[0].name)
    //      
        // console.log(result)
        display(result)
        
      
            document.querySelector("#cityname").innerHTML= result.name
        
        
        fetchTime.fetchWorldTime(result.name)
        

        
            
        
      

       
        


    }
    catch (error) {
        console.log(error)

    }

}

export const currentLocation=()=>{
    cLocation.addEventListener('click',()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( (position)=>{
                    // console.log(position)
                    const {latitude, longitude}= position.coords

                    
                   getUserLocation(latitude, longitude)
                   
                  
                },
    
                    (error)=>{
                        console.log(error)
                    },{ enableHighAccuracy: true })
        }
    })
}
