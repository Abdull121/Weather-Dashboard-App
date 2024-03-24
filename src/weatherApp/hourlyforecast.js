import { weatherConditions, windDirection } from './weatherIcon.js';

const timeForecast = document.querySelector(".hourlyforecast");
const divImg = document.querySelector(".images");
const degree = document.querySelector(".degree");
const windIcon = document.querySelector(".navigation");

const displayForecast = (data) => {
  let weatherIcon = data.weather[0].main;
  let date_string = data.dt_txt;
  let dateObj = new Date(date_string);
  let formatted_time = dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  return `
    <div class="w-[135px] h-[290px] bg-[#373636] rounded-[40px] -mt-5 py-5">
      <span class="text-[24px] font-bold px-8">${formatted_time}</span>
      <img src="${weatherConditions[weatherIcon]}" class="w-[70px] ml-9">
      <span class="text-[20px] font-bold">${Math.floor(data.main.temp_max)}°C</span>
      <img src="${windDirection[0]}" alt="direction-1" class="ml-9 my-2 rotate-[${data.wind.deg}deg]">
      <span class="text-[20px] font-bold">${Math.floor(data.wind.speed * 3.6)}km/h</span>
    </div>
  ` 
};



export const hourlyForecast = (data)=>{
    var  uniqueWeatherTime =[];
   const filterTime = data.list.filter((forecastTime)=>{
        const weatherTime = new Date(forecastTime.dt_txt).getTime()
        if(!uniqueWeatherTime.includes(forecastTime)){
            return  uniqueWeatherTime.push(forecastTime)
            
             
    
          }

    })
    // console.log(filterTime)
    timeForecast.classList.add("hourly")

    const getTime =  filterTime.slice(0,5)
    // console.log(getTime)
    timeForecast.innerHTML=""
    divImg.innerHTML=""
    degree.innerHTML=""
    windIcon.innerHTML=""
    getTime.forEach(element => {
      
        timeForecast.insertAdjacentHTML("beforeend",displayForecast(element) )
  
  console.log(element)
        
  
  
      });
    
}