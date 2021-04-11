const apiKey = "096b51f6d82cf2d709ac1ea8e159d2b8";
// const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

const fetchWeatherData = (cityName) => {
  const functionForJSON = (responseObject) => {
    return responseObject.json();
  };
  const functionForApplication = (dataFromServer) => {
    console.log(dataFromServer);
  };
  const functionToHandleError = (errorObject) => {
    console.log("error");
  };

  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  fetch(weatherApiUrl)
    .then(functionForJSON)
    .then(functionForApplication)
    .catch(functionToHandleError);
};

const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const buildCityList = () => {
  $("#city-list").empty();

  const cities = getLocalStorage();

  const ul = $("<ul>").addClass("list-group");

  const liToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item")
      .attr("data-city", city)
      .text(city);
    ul.append(li);
  };

  cities.map(liToUl);

  const onClick = (event) => {
    const target = $(event.target);
    if (target.is("li")) {
      const cityName = target.data("city");
      fetchWeatherData(cityName);
    }
  };

  ul.on("click", onClick);

  $("#city-list").append(ul);
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);

  const cities = getLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  buildCityList();
  $("#input-city").val("");

  fetchWeatherData(cityName);
};

const weatherData = {
  cityName: "CITY NAME",
  temperature: 0,
  humidity: 0,
  windSpeed: 0,
};

const currentWeatherCard = (data) => {
  const card = `<div class="card-body b-2">
  <h3 class="card-title d-inline" id="city-name">${weatherData.cityName}</h3>
  <ul class="list-unstyled">
    <li class="pt-3">Current Temperature: ${weatherData.temperature}°C</li>
    <li class="pt-3">Humidity: ${weatherData.humidity}</li>
    <li class="pt-3">Wind Speed:${weatherData.windSpeed}</li>
    <li class="pt-3">UV Index:</li>
  </ul>
</div>`;

  $("#current-weather").append(card);
};

const onLoad = () => {
  buildCityList();
  currentWeatherCard();
};

$(document).ready(onLoad);
$("#search-form").on("submit", onSubmit);
