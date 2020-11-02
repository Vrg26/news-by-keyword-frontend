export class NewsApi {
  constructor(settings) {
    this.apiKey = settings.apiKey;
    this.url = settings.url;
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
