const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39853966-e469fabc3a3d91d6ce6cd4aef";

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

  }

  fetchHits() {
    // console.log(this);
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 20,
      page: this.page,
    })

    return fetch(`${BASE_URL}?key=${API_KEY}&${params}`)
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


// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "39853966-e469fabc3a3d91d6ce6cd4aef";

// const fetchImages = async (queryToFetch, pageToFetch) => {
//   const {data} = await axios({
//     params: {
//       key: API_KEY,
//       q: queryToFetch,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: 20,
//       page: pageToFetch,

//     }

//     return (`${BASE_URL}?key=${API_KEY}&${params}`)
//     .then(r => r.json())
//     .then(data => {
//       this.incrementPage();
//       return data;
//     });

//   })
// }

// export { fetchImages, pageLimit };