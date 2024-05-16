const currentTime = document.querySelector("#time");
const currentDate = document.querySelector("#date");



export async function fetchWorldTime(timeZoneName, UnixtimeZone) {



  try {

    setInterval(() => {
      
    }, 1000);

    
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${timeZoneName}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    //  console.log(result.datetime);

    realTime(result.unixtime, UnixtimeZone);

    const localTime = realTime(result.unixtime, UnixtimeZone);
    formatDate(result.datetime);

    convertTime12to24(localTime);

    //convert unix time to real time

    function realTime(unixTimestamp, unixtimeZone) {
      // Create a new Date object with the Unix timestamp in UTC
      const dateUTC = new Date(unixTimestamp * 1000);

      // Get the UTC hours and minutes
      const hoursUTC = dateUTC.getUTCHours();
      const minutesUTC = dateUTC.getUTCMinutes();

      // Calculate the local time by adding the timezone offset
      const localHours = hoursUTC + unixtimeZone / 3600; // Convert seconds to hours
      const localMinutes = minutesUTC;

      // Adjust for 24-hour time if necessary
      const adjustedHours = localHours >= 24 ? localHours - 24 : localHours;

      // Determine AM/PM and format hours
      const period = adjustedHours >= 12 ? "PM" : "AM";
      const formattedHours = adjustedHours % 12 || 12; // Adjust for 12-hour format

      // Add leading zero if minutes less than 10
      const formattedMinutes =
        localMinutes < 10 ? "0" + localMinutes : localMinutes;

      return `${formattedHours}:${formattedMinutes} ${period}`;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

//convert time to 24 hours format
function convertTime12to24(time12h) {
  // Split the time string into hours, minutes, and AM/PM
  const [time, modifier] = time12h.split(" ");

  // Split hours and minutes
  const [hours, minutes] = time.split(":");

  // Convert hours to 24-hour format
  let hours24 = parseInt(hours, 10);
  if (hours === "12") {
    hours24 = modifier === "AM" ? 0 : 12;
  } else {
    hours24 += modifier === "PM" ? 12 : 0;
  }

  // Format the time in 24-hour format
  const formattedTime = `${hours24.toString().padStart(2, "0")}:${minutes}`;
  return (currentTime.innerHTML = formattedTime);
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
