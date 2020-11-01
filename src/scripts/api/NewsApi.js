export class NewsApi {
  constructor(settings) {
    this.settings = settings;
    this.apiKey = 'a08a8902585d44f0bacdac1ecec45df1';
    this.url = 'https://nomoreparties.co/news/v2/everything?';
  }
  getNews(props) {
    return fetch(`${this.url}q=${props.keyWord}
    &from=${this.getDate()}
    &language=ru&sortBy=popularity&pageSize=100&apiKey=${this.apiKey}`)
      .then((res)=>{
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        throw err;
      });
  }
  getDate() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 7);
    return newDate.toISOString();
  }
}
