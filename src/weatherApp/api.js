const apiKey = "xxxxxxxxxxxxxxxxxxxx";
 export const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
     return  data;


  }

  
