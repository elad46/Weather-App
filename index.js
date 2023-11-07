let time = document.getElementsByClassName("clock")[0];
let latitude = 0;
let longitude = 0;
let days = document.getElementsByClassName("weather-day");
let images = document.querySelectorAll("img");
let picture = {
    0: "Images/sunny.svg",
    1: "Images/cloudy.svg",
    2: "Images/cloudy.svg",
    3: "Images/cloudy.svg",
    45: "Images/snowy.svg",
    48: "Images/snowy.svg",
    51: "Images/rainy.svg",
    53: "Images/rainy.svg",
    55: "Images/rainy.svg",
    56: "Images/rainy-2.svg",
    57: "Images/rainy-2.svg",
    61: "Images/rainy-2.svg",
    63: "Images/rainy-2.svg",
    65: "Images/rainy-2.svg",
    66: "Images/rainy-2.svg",
    67: "Images/rainy-2.svg",
    71: "Images/snowy.svg",
    73: "Images/snowy.svg",
    75: "Images/snowy.svg",
    77: "Images/snowy.svg",
    80: "Images/rainy-2.svg",
    81: "Images/rainy-2.svg",
    82: "Images/rainy-2.svg",
    85: "Images/snowy.svg",
    86: "Images/snowy.svg",
    95: "Images/stormy.svg",
    96: "Images/stormy.svg",
    99: "Images/stormy.svg",
  };



  
async function myLocation() {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();
  latitude = data.latitude;
  longitude = data.longitude;
}

async function getWeather() {
  await myLocation();
  let response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=7"
  );
  let data = await response.json();
  for (let i = 0; i < 7; i++) {
    max = data.daily.temperature_2m_max[i];
    min = data.daily.temperature_2m_min[i];
    days[i].innerHTML +=
      "<strong>" + min + "&deg" + "🌙" + " " + max + "&deg;" + "🌞";
    days[i].querySelector("img").setAttribute("src", picture[data.daily.weathercode[i]] )
  }
}
getWeather();

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  time.innerHTML = timeString
}
setInterval(updateClock, 1000);
updateClock();