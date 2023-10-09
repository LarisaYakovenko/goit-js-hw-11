import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import axios from 'axios';
import NewApiService from './api-service';
import createMarkup from './createMarkup';
import {refs} from './refs';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


const {searchForm, hitsContainer, loadMoreBtn, target, gallery} = refs;


const newsApiService = new NewApiService();

let currentPage = 1;
let options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};
Notiflix.Report.info(
  'Enjoy looking at the photos'
);

let observer = new IntersectionObserver(onLoad, options);


function onLoad(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      newsApiService.fetchHits()
      .then((data) => {
        appendHitsMarkup(data);
        if (data.page === data.total_pages) {
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
  lightbox.refresh();
  Notiflix.Notify.success(`We found ${hits.total} images.`);
}

function clearContainer() {
  hitsContainer.innerHTML = '';
}







