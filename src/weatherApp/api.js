const apiKey = "544e0f69c9cccccab9abd812d7fa8bb8";
 export const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
     return  data;


  }

  