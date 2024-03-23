const timeForecast =  document.querySelector(".hourlyforecast")
const displayForecast = (data)=>{

    let date_string = data.dt_txt;
      let dateObj = new Date(date_string);
      let formatted_time = dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    return `
                
 
                    <div class=" w-[135px] h-[290px] bg-[#373636] rounded-[40px] -mt-5 pt-5">
                        <span class=" text-[24px] font-bold z-40 px-8 ">${formatted_time}</span>
                    </div>

                    
                   
                    
    
    `

}


export const hourlyForecast = (data)=>{
    var  uniqueWeatherTime =[];
   const filterTime = data.list.filter((forecastTime)=>{
        const weatherTime = new Date(forecastTime.dt_txt).getTime()
        if(!uniqueWeatherTime.includes(forecastTime)){
            return  uniqueWeatherTime.push(forecastTime)
            
             
    
          }

    })
    // console.log(filterTime)

    const getTime =  filterTime.slice(0,5)
    // console.log(getTime)
    timeForecast.innerHTML=""
    getTime.forEach(element => {
      
        timeForecast.insertAdjacentHTML("beforeend",displayForecast(element) )
  
  console.log(element)
        
  
  
      });
    
}