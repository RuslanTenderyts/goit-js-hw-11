import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './NewsApiService'

;
const refs= {
    searchForm : document.querySelector('.search-form'),
    carts : document.querySelector('.country-list'),
    galleryCarts : document.querySelector('.gallery'),
    loadMoreBtn : document.querySelector('.load-more')
}

const newsApiService = new NewsApiService();

refs.loadMoreBtn.classList.add('is-hidden')

refs.searchForm.addEventListener('submit', onSeacrh);
refs.loadMoreBtn.addEventListener('click', fetchCarts);



function onSeacrh(evt) {
    evt.preventDefault();

    if (!evt.currentTarget.elements.searchQuery.value.trim()) {
        return  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    clearGallery();

    newsApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
    newsApiService.resetPage();
    fetchCarts(); 
   
}

function fetchCarts() {
    hideBtn();
    newsApiService.fetchCarts()
        .then(hits => {
          appendCartsOfGallery(hits)
          showBtn()
        })
        .catch(err => Notify.failure("Sorry, there are no images matching your search query. Please try again."));

      
            
}

function showBtn() {
  if ((newsApiService.page - 1) > newsApiService.totalPages){
   return Notify.info("We're sorry, but you've reached the end of search results.");
  }
    refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

function createMarkupOfCart(hits) {
    const markup = hits.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
        }) => `<div class="photo-card ">
        <a 
          class="gallery__link" 
          href="${largeImageURL}"
          >
        <img 
          class="gallery__image"
          src="${webformatURL}" 
          alt="${tags}" 
          title="${tags}" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>`).join('');

    return markup;
}

function appendCartsOfGallery(carts) {
    refs.galleryCarts.insertAdjacentHTML('beforeend', createMarkupOfCart(carts))
};

function clearGallery() {
    refs.galleryCarts.innerHTML = ''; 
}


let gallery = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});