const apiKey = "096b51f6d82cf2d709ac1ea8e159d2b8";

const functionForJSON = (responseObject) => {
  return responseObject.json();
};

const functionToHandleError = (errorObject) => {
  // handle your error here according to your application
};

const renderCurrentCardComponent = (onLoadWeather, cityName) => {
  $("#main-container").empty();

  const iconUrl = `http://openweathermap.org/img/w/${onLoadWeather.current.weather[0].icon}.png`;

  const card = `<div class="weather-main-card"></div>
    <div class="card">
      <div class="card-body">
        <h3 class="card-title d-inline" id="city-name">
          ${cityName} - (${moment().format("DD/MM/YYYY")})
        </h3>
        <img src="${iconUrl}" />
        <ul class="list-unstyled">
          <li class="pt-3">
            Current Temperature: ${onLoadWeather.current.temp}°C
          </li>
          <li class="pt-3">
            Humidity: ${onLoadWeather.current.humidity}
          </li>
          <li class="pt-3">
            Wind Speed: ${onLoadWeather.current.wind_speed}
          </li>
          <li class="pt-3">
            UV Index: ${onLoadWeather.current.uvi}
          </li>
        </ul>
      </div>
    </div>`;

  $("#main-container").append(card);
};

const renderForecastCardComponent = (forecastData) => {
  // from current data build the current card component
};

const fetchAllWeatherData = (cityName) => {
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},%20GB&units=metric&appid=${apiKey}`;

  const getCurrentWeather = (currentWeather) => {
    const cityLat = currentWeather.coord.lat;
    const cityLon = currentWeather.coord.lon;

    const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

    const getOneCallWeather = (oneCallResponse) => {
      renderCurrentCardComponent(oneCallResponse, currentWeather.name);
      renderForecastCardComponent(oneCallResponse.daily.slice(1, 6));
    };

    fetch(oneApiUrl)
      .then(functionForJSON)
      .then(getOneCallWeather)
      .catch(functionToHandleError);
  };

  fetch(weatherApiUrl)
    .then(functionForJSON)
    .then(getCurrentWeather)
    .catch(functionToHandleError);
};

const onLoad = () => {
  localStorageCities();
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#city-search").val();

  const cities = getLocalStorageCities();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  localStorageCities();

  $("#city-search").val("");

  fetchAllWeatherData(cityName);
};

const getDataCityName = (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");

    fetchAllWeatherData(cityName);
  }
};

const getLocalStorageCities = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const localStorageCities = () => {
  $("#recent-history").empty();

  const cities = getLocalStorageCities();

  const ul = $("<ul>").addClass("list-group");

  const liToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item")
      .attr("data-city", city)
      .text(city);

    ul.append(li);
  };

  cities.forEach(liToUl);

  ul.on("click", getDataCityName);

  $("#recent-history").append(ul);
};

$("#search-form").submit(onSubmit);

$(document).ready(onLoad);
