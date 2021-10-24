const baseURL = `https://restcountries.com/v2`;

function fetchCountries(searchQuery) {
  return fetch(`${baseURL}/name/${searchQuery}`).then((response) =>
    response.json()
  );
}

export default{ fetchCountries };
