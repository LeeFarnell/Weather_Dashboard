let listItem = document.getElementById("list-item");
const submitBtn = document.getElementById("button-addon2");
const apiKey = "096b51f6d82cf2d709ac1ea8e159d2b8";

const functionForJSON = (responseObject) => {
  // unless you have some logic here do that before you return
  return responseObject.json();
};

const functionToHandleError = (errorObject) => {
  // handle your error here according to your application
};

const renderCities = (citiesFromLocalStorage) => {
  // For each city construct a list item and append to the list group
};

function generateMainCard(currentWeather, uvi) {
  const dateFromCard = moment(currentWeather.dt * 1000).format("DD/MM/YYYY");
  const card = `<div class="weather-main-card"></div>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title d-inline" id="city-name"> ${currentWeather.name} - (${dateFromCard})</h3>
      <ul class="list-unstyled">
        <li class="pt-3"> Current Temperature: ${currentWeather.temp}°C </li>
        <li class="pt-3"> Humidity: ${currentWeather.humidity} </li>
        <li class="pt-3"> Wind Speed: ${currentWeather.wind_speed} </li>
        <li class="pt-3"> UV Index: ${uvi} </li>
        
      </ul>
    </div>
  </div>`;

  return card;
}

const getCurrentData = (dataFromServer) => {
  // from object extract the data points you need for the return data
  return {
    name: dataFromServer.name,
    date: moment().format("DD/MM/YYYY"),
    iconURL: `http://openweathermap.org/img/w/${dataFromServer.weather[0].icon}.png`,
    temperature: dataFromServer.main.temp,
    humidity: dataFromServer.main.humidity,
    windSpeed: dataFromServer.wind.speed,
    uvIndex: 0,
  };
};

const getForecastData = (openApiData) => {
  // iterate and construct the return data array
  return [
    {
      date: "",
      iconURL: "",
      temperature: "",
      humidity: "",
    },
  ];
};

const renderCurrentCardComponent = (data) => {
  // from current data build the current card component

  $("#main-container").empty();

  const card = `<div class="weather-main-card"></div>
      <div class="card">
        <div class="card-body">
          <h3 class="card-title d-inline" id="city-name"> Birmingham - (${moment().format(
            "DD/MM/YYYY"
          )})</h3> <img src="http://openweathermap.org/img/w/${
    onLoadWeather.current.weather[0].icon
  }.png" />
          <ul class="list-unstyled">
            <li class="pt-3"> Current Temperature: ${
              onLoadWeather.current.temp
            }°C </li>
            <li class="pt-3"> Humidity: ${onLoadWeather.current.humidity} </li>
            <li class="pt-3"> Wind Speed: ${
              onLoadWeather.current.wind_speed
            } </li>
            <li class="pt-3"> UV Index: ${onLoadWeather.current.uvi} </li>
            
          </ul>
        </div>
      </div>`;

  $("#main-container").append(card);
};

const renderForecastCardComponent = (forecastData) => {
  // from current data build the current card component
};

const fetchAllWeatherData = (cityName) => {
  // construct URL for http://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY} and store in variable called as weatherApiUrl
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},%20GB&units=metric&appid=${apiKey}`;

  const getCurrentWeather = (currentWeatherResponse) => {
    // whatever your application code is goes here
    // 1. from the dataFromServer get the lat and lon
    const currentWeather = currentWeatherResponse;
    const cityLat = currentWeather.coord.lat;
    const cityLon = currentWeather.coord.lon;

    // 2. use lat lon to construct https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API_KEY} and store in variable called oneApiUrl
    const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

    $("#current-date").text(moment().format("DD-MM-YY"));
    // $("#main-container").empty();

    const getOneCallWeather = (oneCallResponse) => {
      const oneCallWeather = oneCallResponse;
      // whatever your application code is goes here
      // call a function getCurrentData() to get the current data from oneCallResponse
      // getCurrentData()  and store in currentData
      // getForecastData() and store in forecastData
      // renderCurrentCardComponent(currentData);
      // renderForecastCardComponent(forecastData);
      console.log(oneCallResponse);
      let uvi = oneCallResponse.current.uvi;

      /* const mainCard = generateMainCard(currentWeather, uvi); */
      /* $("#main-container").append(mainCard); */
      const next5Days = oneCallResponse.daily.slice(1, 6);
      console.log(next5Days);
      //Now generate the forecast cards
      //loop over all days and generate card for each and append to bottom row
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

// function called on load of the document
const onLoad = () => {
  //Get weather and set time
  fetchAllWeatherData("Birmingham");

  $("#current-date").text(moment().format("DD-MM-YY"));
};

// function called when the form is submitted
const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#city-search").val();

  const cities = getLocalStorageCities();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  localStorageCities();

  $("#city-search").val("");
  // get city name and store in variable called cityName
  // fetchAllWeatherData(cityName);
};

const onClick = () => {
  console.log("click");
  // get city name from the list item that was clicked and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

const getDataCityName = (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");

    renderAllCards(cityName);
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

$(listItem).click(onClick);

$(submitBtn).click(onSubmit);

$(document).ready(onLoad);
