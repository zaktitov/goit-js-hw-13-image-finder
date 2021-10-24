import { debounce } from "lodash";
import API from "./fetchCountries.js";
import countries from "../templates/countries";
import card from "../templates/country";
import { refs } from "./refss";
import showNotice from "./pnotify.js";

const { ul, article, input } = refs;

input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  let searchQuery = e.target.value;

  if (searchQuery !== "") {
    API.fetchCountries(searchQuery)
      .then(countryCard)
      .catch((error) => console.log(error));
  } else {
    ul.innerHTML && article.innerHTML === "";
  }
}

function countryCard(country) {
  if (country.length === 1) {
    article.innerHTML = card(country);
    ul.innerHTML = "";
  } else if (country.length > 1 && country.length < 11) {
    ul.innerHTML = countries(country);
    article.innerHTML = "";
  } else if (country.length > 10) {
    showNotice();
  }
}

// fetch("https://restcountries.com/v2/name/peru").then((response) =>
//   console.log(response.json())
// );
