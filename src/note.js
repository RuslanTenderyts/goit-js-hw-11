// чорновик

import  axios from 'axios'


export default class NewsApiService {
  constructor() {
    this.searchQuery ='';
    this.currentPage = 1;
    this.perPage = 8;
    this.totalPages = 0;
  }

  fetchCarts() {
    const BASE_URL = 'https://pixabay.com/api/'
    const KEY = '32847765-3ae84158b7384b51403b1da0b';
    const options =`image_type=photo&orientation=horizontal&safesearch=tru&per_page=${this.perPage}`
      
    return axios
                .get(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&page=${this.currentPage}&${options}`)
                .then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                  return response.json();
                })
                .then(({hits, totalHits}) => {
                  if(!totalHits){
                    throw new Error(response.statusText);
                  }
                  this.totalPages = Math.floor(totalHits / this.perPage);
                  this.currentPage += 1;
                  return hits;
        })
   
}

  resetPage() {
    this.currentPage = 1;
  }
  
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


