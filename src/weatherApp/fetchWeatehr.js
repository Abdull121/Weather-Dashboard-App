import * as fetchTime from './fetchTime.js'
import * as fiveDaysForecast from './5daysForecast.js'
import {weatherConditions} from './weatherIcon.js'

const defaultSearch =  document.querySelector("#default-search")
const  cityName = document.querySelector("#cityname")
const  searchBox =  document.querySelector(".input")
const weatherImg =  document.querySelector(".weatherImg")
//global variable for access the fetch data
let data;



const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";


export const weatherData = ()=>{
    
    const getWeather = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
         data = await response.json();
        

      }
          searchBox.addEventListener("submit",async (e)=>{
            e.preventDefault();
            console.log("event default work")
           await getWeather(defaultSearch.value);
            console.log(data)
            
            
            if(data.name=== searchVal(defaultSearch .value)){
                cityName.innerHTML=data.name
                fetchTime.fetchWorldTime(defaultSearch .value)
                defaultSearch.value="";
                document.querySelector('#degree').innerHTML = `${Math.floor(data.main.temp)}°C`
                
                document.querySelector('#feelslike').innerHTML = `${Math.floor(data.main.feels_like)}°C`
                document.querySelector('.humidity').innerHTML = data.main.humidity
                document.querySelector('.windSpeed').innerHTML = `${Math.floor(data.wind.speed*3.6)}km/h`
                document.querySelector('.pressure').innerHTML = `${data.main.pressure}hpa`
                document.querySelector('.visibility').innerHTML = `${data.visibility/1000} km`


                // sunrise(data.sys.sunrise)
                
                document.querySelector(".sunset").innerHTML= sunset(data.sys.sunset, data.timezone )
                document.querySelector(".sunrise").innerHTML= sunset(data.sys.sunrise, data.timezone )


                // access and show weather icons from weatherIcon.js
                const weatherMain = data.weather[0].main;
                weatherImg.src = weatherConditions[weatherMain];
                document.querySelector(".weatherName").innerHTML = weatherMain;

                // call fiveDays Forecasting
                
                fiveDaysForecast.getForecast(data.coord.lat,data.coord.lon )


                
                
                

            }
            
            else{
                window.alert("please enter a valid city name")
            }


          });
      
      
      
       //function that convert first letter to  Capital for search input value
         let searchVal =  function capitalizeFirstLetter(string) {
            return string[0].toUpperCase() + string.slice(1);
        }






        function sunset(unixTimestamp, timezone) {
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
        
       
        
          
       
              

           
            
            
        



        

    
      
      
      
}

 
  


   
   
   // fetchTime.fetchWorldTime(defaultSearch.value)
  

//   







// getWeather("stockholm")


