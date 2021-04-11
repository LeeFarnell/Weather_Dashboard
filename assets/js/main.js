const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const buildCityList = () => {};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);

  const cities = getLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));
};

const onLoad = () => {
  buildCityList();
  console.log("Loaded");
};

$(document).ready(onLoad);
$("#search-form").on("submit", onSubmit);
