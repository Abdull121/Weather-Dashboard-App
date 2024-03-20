const fivDaysDiv = document.querySelector(".forecast");
const div = document.querySelectorAll(".div")
import {FiveDaysWeather} from './weatherIcon.js'
const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";

// const lat =31.5497;
// const lon = 74.3436;
const fiveDaysWeather = (weatherItem)=>{

      let weatherMain = weatherItem.weather[0].main;
      let date_string = weatherItem.dt_txt;
      let dateObj = new Date(date_string);
      let formatted_date = dateObj.toLocaleString('en-US', {weekday:'short',day:'numeric',     month:'short'})

  
  return` 
            
            <li class="flex justify-evenly items-center text-center lg:gap-[4vw] gap-[16vw] max-sm:gap-[10vw] ">
                <img src="${FiveDaysWeather[weatherMain]}">
                <span class="font-semibold text-[24px] max-sm:text-[22px]">${Math.floor(weatherItem.main.temp)}°C</span>
                <span class="font-semibold text-[20px] max-sm:text-[18px]">${formatted_date}</span>
            </li>
            

`
}

  export const getForecast = async(lat,lon)=>{
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    var  uniqueWeather =[];
   const response = await fetch(url);
   const data = await response.json();
    console.log(data)

    const filter =  data.list.filter((forecast)=>{
      
      const forecastDate = new Date(forecast.dt_txt).getDate()
      if(!uniqueWeather.includes(forecastDate)){
        return  uniqueWeather.push(forecastDate)
         

      }
      
           
        

    })
   const fivDaysDate = filter.slice(0,5)
   
   
   

   fivDaysDiv.innerHTML=`<h2 class=" font-bold mb-5 text-[32px]">5 Days Forecast:</h2>`
   div.forEach((element)=>{
      element.style.display="none"
    
   })
    
    console.log(fivDaysDate)
    
    fivDaysDate.forEach(element => {
      
      fivDaysDiv.insertAdjacentHTML("beforeend",fiveDaysWeather(element) )


      


    });





}

// getForecast();