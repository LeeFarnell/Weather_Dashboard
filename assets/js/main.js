const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);
};
$("#search-form").on("submit", onSubmit);
