import { fetchImages } from "./apiService";
import { refs } from "./refss";
import { debounce } from "lodash";
const { input, btn, ul } = refs;
import card from "../templates/card";

input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  let searchValue = e.target.value;
  console.log(searchValue);

  if (searchValue !== "") {
    fetchImages(searchValue).then(creatCard);
  } else {
    searchValue = "";
  }
}

function creatCard(image) {
  if (image.length === 12) {
    ul.innerHTML = card(image);
    console.log(123);
  }
}

// "https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ"
// export default{};

// import { debounce } from "lodash";
// import countries from "../templates/countries";
// import card from "../templates/country";
// import showNotice from "./pnotify.js";

// input.addEventListener("input", debounce(onSearch, 500));

// function onSearch(e) {
//   let searchQuery = e.target.value;

//   if (searchQuery !== "") {
//     API.fetchCountries(searchQuery)
//       .then(countryCard)
//       .catch((error) => console.log(error));
//   } else {
//     ul.innerHTML && article.innerHTML === "";
//   }
// }

// function countryCard(country) {
//   if (country.length === 1) {
//     article.innerHTML = card(country);
//     ul.innerHTML = "";
//   } else if (country.length > 1 && country.length < 11) {
//     ul.innerHTML = countries(country);
//     article.innerHTML = "";
//   } else if (country.length > 10) {
//     showNotice();
//   }
// }
