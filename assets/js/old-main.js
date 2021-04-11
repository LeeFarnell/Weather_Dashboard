const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Birmingham,%20GB&units=metric&appid=${apiKey}`;
const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=52.4814&lon=-1.8998&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

const functionForApplication = (dataFromServer) => {
  // whatever your application code is goes here

  const onLoadWeather = dataFromServer;

  console.log(onLoadWeather.current);

  const cards = () => {
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
              <li><img src="http://openweathermap.org/img/w/${
                onLoadWeather.daily[1].weather[0].icon
              }.png" /></li>
              <li class="pt-2">Temp: ${onLoadWeather.daily[1].temp.day}°C </li>
              <li class="pt-2">Humidity: ${onLoadWeather.daily[1].humidity}</li>
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
                  <li><img src="http://openweathermap.org/img/w/${
                    onLoadWeather.daily[2].weather[0].icon
                  }.png" /></li>
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
                  <li><img src="http://openweathermap.org/img/w/${
                    onLoadWeather.daily[3].weather[0].icon
                  }.png" /></li>
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
                  <li><img src="http://openweathermap.org/img/w/${
                    onLoadWeather.daily[4].weather[0].icon
                  }.png" /></li>
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
                  <li><img src="http://openweathermap.org/img/w/${
                    onLoadWeather.daily[5].weather[0].icon
                  }.png" /></li>
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

fetch(oneApiUrl)
  .then(functionForJSON)
  .then(functionForApplication)
  .catch(functionToHandleError);

fetch(weatherApiUrl)
  .then(functionForJSON)
  .then(functionForApplication)
  .catch(functionToHandleError);

// read from local storage amd store data in variable called citiesFromLocalStorage
// if data is present call renderCities and pass the data from local storage
// renderCities(citiesFromLocalStorage)
// get the last city name from citiesFromLocalStorage and store in variable called cityName
// fetchAllWeatherData(cityName)
