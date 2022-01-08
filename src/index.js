//Display current day & time
let now = new Date();
let dateTime = document.querySelector("#date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateTime.innerHTML = `${day} ${hours}:${minutes}`;

//Display city from search box
function citySearch(event) {
  event.preventDefault();
  let submitClick = document.querySelector("#city-search");
  let currentCity = document.querySelector(".currentCity");
  currentCity.innerHTML = submitClick.value;
}

//Display temp integer
function currentTemp(response) {
  let tempDisplay = document.querySelector("#temp-integer");
  tempDisplay.innerHTML = Math.round(response.data.main.temp);
}

//Fetch temperature of city from search box
function cityTemp() {
  let city = document.querySelector("#city-search").value;
  let apiKey = "d9d69bcfd71a3f130af2081484a0b61a";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let fullUrl = `${apiUrl}${city}&units=metric&appid=${apiKey}`;

  axios.get(fullUrl).then(currentTemp);
}

let currentCity = document.querySelector(".currentCity");
let form = document.querySelector("form");
form.addEventListener("submit", citySearch);
form.addEventListener("submit", cityTemp);

//Display city from Geolocation
function showCity(response) {
  let cityDisplay = document.querySelector(".currentCity");
  cityDisplay.innerHTML = response.data.name;
}

//Fetch current location
function findLocation(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "d9d69bcfd71a3f130af2081484a0b61a";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let fullUrl = `${apiUrl}&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(fullUrl).then(currentTemp);
  axios.get(fullUrl).then(showCity);
}

//Initiate navigator
function currentLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", currentLocation);
