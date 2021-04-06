let listItem = document.getElementById("list-item");
const submitBtn = document.getElementById("button-addon2");

const renderCities = (citiesFromLocalStorage) => {
  // For each city construct a list item and append to the list group
};

const getCurrentData = (opeApiData) => {
  // from object extract the data points you need for the return data
  return {
    name: "",
    date: "",
    iconURL: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    uvIndex: 0,
  };
};

const getForecastData = (opeApiData) => {
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

const renderCurrentCardComponent = (currentData) => {
  // from current data build the current card component
};

const renderForecastCardComponent = (forecastData) => {
  // from current data build the current card component
};

const fetchAllWeatherData = (cityName) => {
  // construct URL for http://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY} and store in variable called as weatherApiUrl
  const functionForJSON = (responseObject) => {
    // unless you have some logic here do that before you return
    return responseObject.json();
  };
  const functionForApplication = (dataFromServer) => {
    // whatever your application code is goes here
    // 1. from the dataFromServer get the lat and lon
    // 2. use lat lon to construct https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API_KEY} and store in variable called oneApiUrl

    const functionForJSON = (responseObject) => {
      // unless you have some logic here do that before you return
      return responseObject.json();
    };
    const functionForApplication = (dataFromServer) => {
      // whatever your application code is goes here
      // call a function getCurrentData() to get the current data from dataFromServer
      // getCurrentData()  and store in currentData
      // getForecastData() and store in forecastData
      // renderCurrentCardComponent(currentData);
      // renderForecastCardComponent(forecastData);
    };
    const functionToHandleError = (errorObject) => {
      // handle your error here according to your application
    };
    fetch(oneApiUrl)
      .then(functionForJSON)
      .then(functionForApplication)
      .catch(functionToHandleError);
  };
  const functionToHandleError = (errorObject) => {
    // handle your error here according to your application
  };
  fetch(weatherApiUrl)
    .then(functionForJSON)
    .then(functionForApplication)
    .catch(functionToHandleError);
};

// function called on load of the document
const onLoad = () => {
  const functionForJSON = (responseObject) => {
    // unless you have some logic here do that before you return
    return responseObject.json();
  };
  const functionForApplication = (dataFromServer) => {
    // whatever your application code is goes here
    const onLoadWeather = dataFromServer;
    const cityName = document.querySelector("#city-search").value;

    const cards = () => {
      const card = `<div class="weather-main-card"></div>
      <div class="card">
        <div class="card-body">
          <h3 class="card-title d-inline" id="city-name"> Birmingham - (${moment().format(
            "DD/MM/YYYY"
          )})</h3>
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
      </div>
      
      <div class="row">
      <h3 class="pt-3"> 5-Day Forecast </h3>
          <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment()
                  .add(1, "days")
                  .format("DD/MM/YYYY")}</h5>
                <p class="card-text"></p>
                 <ul class="list-unstyled">
                <li>Icon</li>
                <li class="pt-2">Temp: ${
                  onLoadWeather.daily[1].temp.day
                }°C </li>
                <li class="pt-2">Humidity: ${
                  onLoadWeather.daily[1].humidity
                }</li>
                </ul>  
                </p>
              </div>
            </div>
          </div>

          <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment()
                  .add(2, "days")
                  .format("DD/MM/YYYY")}</h5>
                <p class="card-text">
                  <ul class="list-unstyled">
                    <li>Icon</li>
                    <li class="pt-2">Temp: ${
                      onLoadWeather.daily[2].temp.day
                    }°C</li>
                    <li class="pt-2">Humidity: ${
                      onLoadWeather.daily[2].humidity
                    }</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment()
                  .add(3, "days")
                  .format("DD/MM/YYYY")}</h5>
                <p class="card-text">
                  <ul class="list-unstyled">
                    <li>Icon</li>
                    <li class="pt-2">Temp: ${
                      onLoadWeather.daily[3].temp.day
                    }°C</li>
                    <li class="pt-2">Humidity: ${
                      onLoadWeather.daily[3].humidity
                    }</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment()
                  .add(4, "days")
                  .format("DD/MM/YYYY")}</h5>
                <p class="card-text">
                  <ul class="list-unstyled">
                    <li>Icon</li>
                    <li class="pt-2">Temp: ${
                      onLoadWeather.daily[4].temp.day
                    }°C</li>
                    <li class="pt-2">Humidity: ${
                      onLoadWeather.daily[4].humidity
                    }</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${moment()
                  .add(5, "days")
                  .format("DD/MM/YYYY")}</h5>
                <p class="card-text">
                  <ul class="list-unstyled">
                    <li>Icon</li>
                    <li class="pt-2">Temp: ${
                      onLoadWeather.daily[5].temp.day
                    }°C</li>
                    <li class="pt-2">Humidity ${
                      onLoadWeather.daily[5].humidity
                    }</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>`;

      return card;
    };
    console.log(cards);

    $("#current-date").text(moment().format("DD-MM-YY"));
    $("#main-container").append(cards);
  };
  const functionToHandleError = (errorObject) => {
    // handle your error here according to your application
  };

  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Birmingham,%20GB&units=metric&appid=096b51f6d82cf2d709ac1ea8e159d2b8`;
  const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=52.4814&lon=-1.8998&exclude=minutely,hourly&units=metric&appid=096b51f6d82cf2d709ac1ea8e159d2b8`;

  fetch(oneApiUrl)
    .then(functionForJSON)
    .then(functionForApplication)
    .catch(functionToHandleError);

  // read from local storage amd store data in variable called citiesFromLocalStorage
  // if data is present call renderCities and pass the data from local storage
  // renderCities(citiesFromLocalStorage)
  // get the last city name from citiesFromLocalStorage and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

// function called when the form is submitted
const onSubmit = () => {
  const cityNameH3 = document.getElementById("city-name");
  const cityName = document.querySelector("#city-search").value;
  const currentDate = moment().format("DD/MM/YYYY");
  cityNameH3.textContent = cityName;
  // get city name and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

const onClick = () => {
  console.log("click");
  // get city name from the list item that was clicked and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

$(listItem).click(onClick);

$(submitBtn).click(onSubmit);

$(document).ready(onLoad);
