


export default function createMarkup(hits){
  return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
  <div class="photo-card">
  <div class="img_wrap">
      <a class="gallery_link" href="${largeImageURL}">
          <img class="photo" src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
      </a>
  </div>
  <div class="info">
      <p class="info-item">
      <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
      <b>Views: ${views}</b>
      </p>
      <p class="info-item">
      <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
      <b>Downloads: ${downloads}</b>
      </p>
  </div>
  </div>`).join('')
}