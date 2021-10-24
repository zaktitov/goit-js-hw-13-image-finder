export function fetchImages(parametr) {
  const myKEY = "24010057-253ecdb46e51cee64944dea92";

  let inputValue = `${parametr}`;

  const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    q: `${inputValue}`,
    page: 1,
    per_page: 12,
    key: `${myKEY}`,
  });

  searchParams.toString();

  const url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data.hits)
    .catch((error) => console.log(error));
}
