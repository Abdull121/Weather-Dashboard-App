const currentTime = document.querySelector("#time");
const currentDate = document.querySelector("#date");


export async function fetchWorldTime(city) {
  const apiKey = "wfxal1kHAqFexiHJPpanHA==Uxq6e0nKmM0orJPM";

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/worldtime?city=${city}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    formatDate(result.date);

    formatTime(result.datetime);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// change the date format
function formatDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(inputDate);
  const weekday = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  currentDate.innerHTML = `${weekday}, ${day} ${month}`;
}

 function formatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  currentTime.innerHTML = `${hours}:${minutes}`;
}