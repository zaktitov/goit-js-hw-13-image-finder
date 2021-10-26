const myKeY = "24010057-253ecdb46e51cee64944dea92";
const BASE_URL = `https://pixabay.com/api/?`;
export default class NewApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${myKeY}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.increasePage();
        return data.hits;
        
      });
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
