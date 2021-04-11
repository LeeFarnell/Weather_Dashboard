const onSubmit = (event) => {
  event.preventDefault();
  console.log("Submit");
};
$("#search-form").on("submit", onSubmit);
