import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39853966-e469fabc3a3d91d6ce6cd4aef";

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

  }

  async fetchHits() {
    // console.log(this);
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: this.page,
    })

    return await fetch(`${BASE_URL}?key=${API_KEY}&${params}`)
    .then(response => response.json())
    .then(({hits}) => {
      this.incrementPage();
      return hits;
    });
  }

  incrementPage() {
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








// export async function fetchHits() {
  //   const BASE_URL = "https://pixabay.com/api/";
  //   const API_KEY = "39853966-e469fabc3a3d91d6ce6cd4aef";
  //   const params = new URLSearchParams({
  //     key: API_KEY,
  //     q: this.searchQuery,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     per_page: 20,
  //     page: this.page,
  //   });

  //   const url = (`${BASE_URL}?key=${API_KEY}&${params}`);
  //   const response = await axios.get(url);
  //   return response.data;
  // };


// import axios from 'axios';




// function fetchImages(page = 1) {
//   const BASE_URL = "https://pixabay.com/api/";;
//   const API_KEY = "39853966-e469fabc3a3d91d6ce6cd4aef";

//   const params = new URLSearchParams({
//     key: API_KEY,
//     q: queryToFetch,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     per_page: 20,
//     page: pageToFetch,

//   });


//   return fetch(`${BASE_URL}?key=${API_KEY}&${params}`).then((resp) => {
//     if(!resp.ok) {
//       throw new Error(`Fetch error with ${resp.status}: ${resp.statusText}`);
//     }
//     return resp.json();

//   });
// }
// export { fetchImages, pageLimit };