const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);

  const cities = getLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));
};
$("#search-form").on("submit", onSubmit);
