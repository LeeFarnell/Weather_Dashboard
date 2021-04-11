const apiKey = "096b51f6d82cf2d709ac1ea8e159d2b8";
// const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

const fetchWeatherData = async (weatherApiUrl) => {
  try {
    const response = await fetch(weatherApiUrl);

    const serverData = await response.json();

    return serverData;
  } catch (error) {
    console.log("error");
  }
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

  const onClick = async (event) => {
    const target = $(event.target);
    if (target.is("li")) {
      const cityName = target.data("city");

      const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

      const response = await fetchWeatherData(weatherApiUrl);

      const currentData = transformData(response);

      mainCard(currentData);
    }
  };

  ul.on("click", onClick);

  $("#city-list").append(ul);
};

const transformData = (response) => {
  return {
    cityName: response.name,
    temperature: response.main.temp,
    humidity: response.main.humidity,
    windSpeed: response.wind.speed,
    uvIndex: 0,
    date: moment.unix(response.dt).format("DD/MM/YY"),
    icon: response.weather[0].icon,
  };
};

const onSubmit = async (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);

  const cities = getLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  buildCityList();
  $("#input-city").val("");

  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  const data = await fetchWeatherData(weatherApiUrl);

  const currentData = transformData(data);

  mainCard(currentData);

  console.log(data);
  console.log(currentData);
};

const mainCard = (weatherData) => {
  $("#current-weather").empty();

  const card = `<div class="card-body b-2">
  <h3 class="card-title d-inline" id="city-name"> ${weatherData.cityName} (${weatherData.date}) </h3> <img src="http://openweathermap.org/img/w/${weatherData.icon}.png" />
  <ul class="list-unstyled">
    <li class="pt-3">Current Temperature: ${weatherData.temperature}°C</li>
    <li class="pt-3">Humidity: ${weatherData.humidity}</li>
    <li class="pt-3">Wind Speed: ${weatherData.windSpeed}</li>
    <li class="pt-3">UV Index: ${weatherData.uvIndex}</li>
  </ul>
</div>`;

  $("#current-weather").append(card);
};

const onLoad = () => {
  buildCityList();
};

$(document).ready(onLoad);
$("#search-form").on("submit", onSubmit);
