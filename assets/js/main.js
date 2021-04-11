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

  console.log(data);
};

const onLoad = () => {
  buildCityList();
};

$(document).ready(onLoad);
$("#search-form").on("submit", onSubmit);
