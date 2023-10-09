import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import axios from 'axios';
import NewApiService from './api-service';
import createMarkup from './createMarkup';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


const refs = {
  searchForm: document.querySelector('.search-form'),
  hitsContainer: document.querySelector('.js-hits-container'),
  loadMoreBtn: document.querySelector('.load-more'),
  target: document.querySelector('.js-guard'),
}
const {searchForm, hitsContainer, loadMoreBtn, target} = refs;


const newsApiService = new NewApiService();

let currentPage = 499;
let options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach((entry) => {
    // console.log(entry);
    if(entry.isIntersecting){
      currentPage += 1;
      onLoadMore(currentPage)
      .then((hits) => {
        hitsContainer.insertAdjacentHTML('beforeend', createMarkup(hits));
        if(data.page === data.totalHits){
          observer.unobserve(target);
        }

      })
      .catch((err) => console.log(err));
    }
  })
}


searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch (e) {
  e.preventDefault();

  clearContainer();
  newsApiService.query = e.currentTarget.searchQuery.value.trim().toLowerCase();
  newsApiService.resetPage()
  newsApiService.fetchHits()
  .then(appendHitsMarkup)
  .catch((err) => console.log(err));
}

function onLoadMore () {
  newsApiService.fetchHits()
  .then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  hitsContainer.insertAdjacentHTML('beforeend', createMarkup(hits));
  observer.observe(target);
}

function clearContainer() {
  hitsContainer.innerHTML = '';
}


const fetchHits = async (query, page) => {
  try {
    Loading.circle('Loading', {
      svgColor: '#2596be',
    });

    const data = await fetchHits(per_page, page);
    Loading.remove();
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderImages(data);

    lightbox.refresh();

    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    if (data.totalHits >= page * per_page) {
      loadMoreBtn.classList.remove('unvisible');
    }

    if (data.totalHits <= page * per_page) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results"
      );
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong!');
  }
};



