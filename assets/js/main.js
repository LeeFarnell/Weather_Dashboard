const apiKey = "096b51f6d82cf2d709ac1ea8e159d2b8";

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

      createAllCards(cityName);
    }
  };

  ul.on("click", onClick);

  $("#city-list").append(ul);
};

const transformCurrentData = (response, name) => {
  const current = response.current;

  return {
    cityName: name,
    temperature: current.temp,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
    uvIndex: current.uvi,
    date: moment.unix(current.dt).format("DD/MM/YY"),
    icon: current.weather[0].icon,
  };
};

const transformForecastData = (response) => {
  return {
    date: moment.unix(response.dt).format("DD/MM/YY"),
    icon: response.weather[0].icon,
    temperature: response.temp.day,
    humidity: response.humidity,
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

  createAllCards(cityName);
};

const createAllCards = async (cityName) => {
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  const response = await fetchWeatherData(weatherApiUrl);

  const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

  const fiveDayResponse = await fetchWeatherData(oneApiUrl);

  const fiveDayArray = fiveDayResponse.daily.map(transformForecastData);

  $("#forecast-cards").empty();

  fiveDayArray.slice(1, 6).forEach(fiveDayCard);

  const currentData = transformCurrentData(fiveDayResponse, response.name);

  mainCard(currentData);
};

const uvIndexClass = (uvIndex) => {
  if (uvIndex < 3) {
    return "p-2 bg-success text-white rounded";
  } else if (uvIndex > 3 && uvIndex < 6) {
    return "p-2 bg-warning text-white rounded";
  } else {
    return "p-2 bg-danger text-white rounded";
  }
};

const mainCard = (weatherData) => {
  $("#current-weather").empty();

  const card = `<div class="card-body b-2">
  <h3 class="card-title d-inline" id="city-name"> ${weatherData.cityName} (${
    weatherData.date
  }) </h3> <img src="http://openweathermap.org/img/w/${weatherData.icon}.png" />
  <ul class="list-unstyled">
    <li class="pt-3">Current Temperature: ${weatherData.temperature}°C</li>
    <li class="pt-3">Humidity: ${weatherData.humidity}</li>
    <li class="pt-3">Wind Speed: ${weatherData.windSpeed}</li>
    <li class="pt-3">UV Index: <span class="${uvIndexClass(
      weatherData.uvIndex
    )}">${weatherData.uvIndex}</span></li>
  </ul>
</div>`;

  $("#current-weather").append(card);
};

const fiveDayCard = (forecastData) => {
  const card = `
  <div class="card">
    <div class="card-body bg-primary text-light ">
      <h5 class="card-title">${forecastData.date}</h5>
      <p class="card-text">
        <ul class="list-unstyled">
          <li><img src="http://openweathermap.org/img/w/${forecastData.icon}.png" /> </li>
          <li class="pt-2">Temp: ${forecastData.temperature}°C</li>
          <li class="pt-2">Humidity: ${forecastData.humidity} </li>
        </ul>
      </p>
    </div>
  </div>
</div>`;

  $("#forecast-cards").append(card);
};

const onLoad = () => {
  buildCityList();
};

$(document).ready(onLoad);
$("#search-form").on("submit", onSubmit);
