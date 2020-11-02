import BaseComponent from './BaseComponent';

export default class ArticlesList extends BaseComponent {
  constructor(createArticle,...args) {
    super(...args);
    this.isLoggedIn = false;
    this.articles = [];
    this.usersArticles = [];
    this.articlesRendered = [];
    this.createArticle = createArticle;
    this.startIndexToDraw = 0;
    this.numArticlesToDraw = 3;
    this.domElement.style.display = 'none';
    this.buttonShowMore = this.domElement.querySelector('.result__show-more');
    this.containerArticles = this.domElement.querySelector('.articles');
    this.resultContent = this.domElement.querySelector('.result__content');
    this.resultError = this.domElement.querySelector('.result__error');
    this.errorTitle = this.resultError.querySelector('.result__title');
    this.resultNotFound = this.domElement.querySelector('.result__not-found');
    this.resultLoad = this.domElement.querySelector('.result__load');
    this.renderResults = this.renderResults.bind(this);
    this.setEventListeners();
  }
  renderResults(){
    let lastIndex = this.startIndexToDraw + this.numArticlesToDraw > this.articles.length
      ? this.articles.length
      : this.startIndexToDraw + this.numArticlesToDraw;
    for(this.startIndexToDraw; this.startIndexToDraw < lastIndex; this.startIndexToDraw++){
      let isSaved = this.usersArticles.some((item) => item.link === this.articles[this.startIndexToDraw].url);
      const article = this.createArticle(this.articles[this.startIndexToDraw],this.keyWord);
      this.containerArticles.appendChild(article.create(this.isLoggedIn, isSaved));
      this.articlesRendered.push(article);
    }
    this.showButtonMore();
  }
  renderUsersArticles() {
    this.usersArticles.sort((a,b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      return a>b ? -1 : a<b ? 1 : 0;
    });
    this.usersArticles.forEach((item) => {
      const {_id, title, text, date, source, link, image} = item;
      const article = this.createArticle({
        _id,
        title,
        description: text,
        publishedAt:date,
        source:{
          name: source
        },
        url: link,
        urlToImage:image,
      }, item.keyword);
      this.containerArticles.appendChild(article.create(this.isLoggedIn));
    });
    this.showResultContent();
  }
  showResultContent(){
    this.domElement.style.display = 'block';
    if(this.resultLoad.classList.contains('result__load_show')){
      this.resultLoad.classList.remove('result__load_show');
    }
    if(this.resultError.classList.contains('result__error_show')){
      this.resultError.classList.remove('result__error_show');
    }
    if(!this.resultContent.classList.contains('result__content_show')){
      this.resultContent.classList.add('result__content_show');
    }
    if(this.resultNotFound.classList.contains('result__not-found_show')){
      this.resultNotFound.classList.remove('result__not-found_show');
    }
  }
  showResultError(err){
    this.domElement.style.display = 'block';

    this.resultError.classList.remove('result__error_show');
    this.resultNotFound.classList.remove('result__not-found_show');

    if(this.resultContent.classList.contains('result__content_show')){
      this.resultContent.classList.remove('result__content_show');
    }

    if(this.resultLoad.classList.contains('result__load_show')){
      this.resultLoad.classList.remove('result__load_show');
    }

    switch (err) {
      case 404:
        this.resultNotFound.classList.add('result__not-found_show');
        break;
      case 429:
        this.errorTitle = 'Вы привысили допустимое число запросов, попробуйте позже';
        this.resultError.classList.add('result__error_show');
        break;
      default:
        this.errorTitle = 'Ошибки случаются и вот сейчас тот самый случай';
        this.resultError.classList.add('result__error_show');
        break;
    }
  }
  showResultLoad(){
    this.domElement.style.display = 'block';
    this.resultLoad.classList.add('result__load_show');
    if(this.resultContent.classList.contains('result__content_show')){
      this.resultContent.classList.remove('result__content_show');
    }
    if(this.resultNotFound.classList.contains('result__not-found_show')){
      this.resultNotFound.classList.remove('result__not-found_show');
    }
  }
  setArticles(articles, keyWord){
    this.clearArtiles();
    this.articles = articles;
    this.keyWord = keyWord;
    this.startIndexToDraw = 0;
    if(this.articles.length === 0){
      this.showResultError(404);
      return;
    }
    this.renderResults();
    this.showResultContent();
  }
  showButtonMore() {
    if(this.articles.length === this.articlesRendered.length){
      this.buttonShowMore.classList.add('button_hidden');
    }
    else if(this.buttonShowMore.classList.contains('button_hidden')){
      this.buttonShowMore.classList.remove('button_hidden')
    }
  }
  clearArtiles(){
    this.domElement.style.display = 'none';
    this.startIndexToDraw = 0;
    this.articles = [];
    this.articlesRendered.forEach((item) => item.remove());
    this.articlesRendered = [];
  }
  setEventListeners() {
    if(this.buttonShowMore){
      this.buttonShowMore.addEventListener('click', this.renderResults);
    }
  }
}
