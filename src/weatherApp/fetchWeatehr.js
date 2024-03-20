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
                document.querySelector('.windSpeed').innerHTML = `${Math.floor(data.wind.speed)}km/h`
                document.querySelector('.pressure').innerHTML = `${data.main.pressure}hpa`
                document.querySelector('.visibility').innerHTML = `${data.visibility/1000} km`


                sunrise(data.sys.sunrise)
                sunset(data.sys.sunset)


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


          
        function sunrise (unixTimestamp){


            // E.g unixTimestamp = 1710594667; 

            const myDate = new Date(unixTimestamp* 1000); 
            const timeOnly  =  myDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            document.querySelector(".sunrise").innerHTML=timeOnly
            console.log(timeOnly); 
        }

        function sunset (unixTimestamp){


            // E.g unixTimestamp = 1710594667; 

            const myDate = new Date(unixTimestamp* 1000); 
            const timeOnly  =  myDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            document.querySelector(".sunset").innerHTML=timeOnly
            console.log(timeOnly); 
        }
    
      
      
      
}

 
  


   
   
   // fetchTime.fetchWorldTime(defaultSearch.value)
  

//   







// getWeather("stockholm")


