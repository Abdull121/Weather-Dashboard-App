const fivDaysDiv = document.querySelector(".forecast");
const div = document.querySelectorAll(".div")
import {weatherConditions} from './weatherIcon.js'
import {hourlyForecast} from './hourlyforecast.js'
const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";

// const lat =31.5497;
// const lon = 74.3436;
const fiveDaysWeather = (weatherItem)=>{

    console.log(weatherItem)


      let weatherMain = weatherItem[2][1]

    
  
  return` 
            
            <li class="flex justify-evenly items-center text-center lg:gap-[4vw] gap-[16vw] max-sm:gap-[10vw] ">
            <img src="${weatherConditions[weatherMain] }" class = "w-[60px]">
                <span class="font-semibold text-[24px] max-sm:text-[22px]">${Math.round(weatherItem[1])}°C</span>
                <span class="font-semibold text-[20px] max-sm:text-[18px]">${weatherItem[0]}</span>
            </li>
            

`
}

  export const getForecast = async(lat,lon)=>{
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    var  uniqueWeather =[];
   const response = await fetch(url);
   const data = await response.json();
    console.log(data)
    hourlyForecast(data)


    for (let i=0; i<5; i+=data.cnt) {
      // calculate average temp
      let AverageTemp = 0;
      for (let j=i; j<i+data.cnt; j++ ){
          AverageTemp += data.list[j]["main"]["temp"];
          
      }
      AverageTemp = AverageTemp / data.cnt;
      console.log(AverageTemp)
    }

    const filter =  data.list.filter((forecast)=>{
      
      const forecastDate = new Date(forecast.dt_txt).getDate()
    
      
      if(!uniqueWeather.includes(forecastDate)){
        return  uniqueWeather.push(forecastDate)
        
         

      }
      
           
        

    })
    // console.log(filter)
    
   const fivDaysDate = filter.slice(0,5)
   
   
   

   fivDaysDiv.innerHTML=`<h2 class=" font-bold mb-5 text-[32px]">5 Days Forecast:</h2>`
   div.forEach((element)=>{
      element.style.display="none"
    
   })
    
    console.log(fivDaysDate)
    
    // fivDaysDate.forEach(element => {
      
    //   fivDaysDiv.insertAdjacentHTML("beforeend",fiveDaysWeather(element) )


      


    // });

    function calculateMaxTemperatures(forecastData) {
      const temperatures = [];
      const dates = [];
      const weather = [];
  
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
  
      // Iterate through the forecast data
      forecastData.list.forEach(forecast => {
          // Extract date from forecast timestamp (YYYY-MM-DD)
          const date = forecast.dt_txt.split(' ')[0];
  
          // Get maximum temperature for the day
          const temperature = forecast.main.temp_max;
  
          // Get weather information for the day
          const weatherInfo = [
              forecast.weather[0].id,
              forecast.weather[0].main,
              forecast.weather[0].description,
              forecast.weather[0].icon
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
          const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
          return [
              formattedDate,
              temperatures[index],
              weather[index]
          ];
      });
  
      return nextFiveDaysData;
  }
  
  // Example usage:
  
  
  const maxTemperatures = calculateMaxTemperatures(data);
  console.log(maxTemperatures);
  
  
  
  
  

  maxTemperatures .forEach(element => {
      
    fivDaysDiv.insertAdjacentHTML("beforeend",fiveDaysWeather(element) )


    


  });
  


  


    


  
  

}

  