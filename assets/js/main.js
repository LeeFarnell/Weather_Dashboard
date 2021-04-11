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
      console.log(cityName);
    }
  };

  ul.on("click", onClick);

  $("#city-list").append(ul);
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#input-city").val();
  console.log(cityName);

  const cities = getLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  buildCityList();
  $("#input-city").val("");
};

const onLoad = () => {
  buildCityList();
};

$(document).ready(onLoad);
$("#search-form").on("submit", onSubmit);
