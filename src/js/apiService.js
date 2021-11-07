const myKeY = "24010057-253ecdb46e51cee64944dea92";
const BASE_URL = `https://pixabay.com/api/?`;
export default class NewApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      image_type: "photo",
      orientation: "horizontal",
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: myKeY,
    });
    const url = `${BASE_URL}${searchParams}`;

    const response = await fetch(url);
    const dataImages = await response.json();

    return await dataImages.hits;

    // return fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.increasePage();
    //     return data.hits;
    //   });
  }

  increasePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
