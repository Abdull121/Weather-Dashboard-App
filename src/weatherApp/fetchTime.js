const currentTime = document.querySelector("#time");
const currentDate = document.querySelector("#date");

export async function fetchWorldTime(timeZoneName, UnixtimeZone) {



  try {


    
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${timeZoneName}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    //  console.log(result.datetime);

    // console.log(realTime(result.unixtime, UnixtimeZone))

     realTime(result.unixtime, UnixtimeZone);
    formatDate(result.datetime);

    // convertTime12to24(localTime);

    //convert unix time to real time

    function realTime(unixTimestamp, unixtimeZone) {
      // Create a new Date object with the Unix timestamp in UTC
      const dateUTC = new Date(unixTimestamp * 1000);
  
      // Get the UTC hours and minutes
      const hoursUTC = dateUTC.getUTCHours();
      const minutesUTC = dateUTC.getUTCMinutes();
  
      // Calculate the local time by adding the timezone offset
      let localHours = hoursUTC + unixtimeZone / 3600; // Convert seconds to hours
      const localMinutes = minutesUTC;
  
      // Adjust for 24-hour time if necessary
      if (localHours >= 24) {
          localHours -= 24;
      } else if (localHours < 0) {
          localHours += 24;
      }
  
      // Add leading zero if hours or minutes are less than 10
      const formattedHours = localHours < 10 ? "0" + Math.floor(localHours) : Math.floor(localHours);
      const formattedMinutes = localMinutes < 10 ? "0" + localMinutes : localMinutes;
  
      // Format time in 24-hour format
      return (currentTime.innerHTML = `${formattedHours}:${formattedMinutes}`);
  }
  

  } catch (error) {
    console.error("Error:", error.message);
  }
}



function formatDate(datetimeString) {
  const date = new Date(datetimeString);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return (currentDate.innerHTML = formattedDate);
}