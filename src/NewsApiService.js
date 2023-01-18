import  axios from 'axios'


export default class NewsApiService {
  constructor() {
    this.searchQuery ='';
    this.page = 1;
    this.perPage = 10;
    this.totalPages = 0;
    this.totalHits = 0;
  }

  async fetchCarts() {
    const BASE_URL = 'https://pixabay.com/api/'
    const KEY = '32847765-3ae84158b7384b51403b1da0b';
    const params = {
      params: {
        key : KEY,
        q : this.searchQuery,
        page : this.page,
        'per_page' : this.perPage,
        safesearch : 'tru',
        orientation : 'horizontal',
        'image_type' : 'photo',
      }
    }
          
    const response = await axios
      .get(`${BASE_URL}`, params);
          const { hits, totalHits } = response.data;
          if (!totalHits) {
            throw new Error(response.statusText);
          }
          this.totalHits = totalHits;
          this.totalPages = Math.floor(this.totalHits / this.perPage);
          this.page += 1;
    return hits;
   
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



