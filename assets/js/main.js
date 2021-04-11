const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  console.log(localStorageData);
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);

  getLocalStorage();
};
$("#search-form").on("submit", onSubmit);
