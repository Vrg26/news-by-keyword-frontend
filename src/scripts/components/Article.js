import BaseComponent from './BaseComponent';

export default class Article extends BaseComponent {
  constructor(domElement, dateConverter, api, isSavedArticles,objArticle,keyWord) {
    super(domElement);
      this.keyWord = keyWord;
      this.isSavedArticles = isSavedArticles;
      this.api = api;
      this.dateConverter = dateConverter;
      this.id = objArticle._id;
      this.title = objArticle.title;
      this.text = objArticle.description;
      this.date = objArticle.publishedAt;
      this.source = objArticle.source.name;
      this.link = objArticle.url;

      if(/^https?:\/\/+/gi.test(objArticle.urlToImage)){
        this.image = objArticle.urlToImage;
      } else {
        this.image = 'https://toko.ua/images/no_photo.png';
      }
      this.renderIcon = this.renderIcon.bind(this);
      this.activateHint = this.activateHint.bind(this);
      this.disabledHint = this.disabledHint.bind(this);
      this.saveArticle = this.saveArticle.bind(this);
      this.removeArticle = this.removeArticle.bind(this);
  }
  create(isLoggedIn, saved){
    const divArticle = document.createElement('div');
    divArticle.classList.add('articles__card');
    divArticle.append(this.domElement.content.cloneNode(true));
    divArticle.querySelector('.articles__picture').src = this.image;
    divArticle.querySelector('.articles__date').textContent = this.dateConverter(this.date);
    divArticle.querySelector('.articles__title').textContent = this.title;
    divArticle.querySelector('.articles__text').textContent = this.text;

    divArticle.querySelector('.articles__source').textContent = this.source;
    divArticle.querySelector('.articles__content').href = this.link;
    const keyWordContainer = divArticle.querySelector('.articles__keyword');
    if(keyWordContainer){
      keyWordContainer.textContent = this.keyWord;
    }

    this.domElement = divArticle;
    this.button = this.domElement.querySelector('.articles__button');
    this.hint = this.domElement.querySelector('.articles__hint');
    this.renderIcon(isLoggedIn, saved);
    return this.domElement;
  }
  activateHint(){
    this.hint.style.display = 'block';
  }
  disabledHint(){
    this.hint.style.display = 'none';
  }

  removeArticle() {
    this.api.removeArticle(this.id)
      .then(() => {
        this.remove();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  saveArticle() {
    const article = {
      keyword: this.keyWord,
      title: this.title,
      text: this.text,
      date: this.date,
      source: this.source,
      link: this.link,
      image: this.image,
    }
    this.button.removeEventListener('mouseover', this.activateHint);
    this.button.removeEventListener('mouseout', this.disabledHint);
    this.api.createArticle(article)
      .then((data) => {
        if (data && data !== "TypeError: Failed to fetch") {
          this.button.classList.add('articles__button_saved');
          this.button.removeEventListener('click', this.saveArticle);

        }
      })
      .catch((err) => {
        console.error(err);
        this.button.addEventListener('mouseenter', this.activateHint);
        this.button.addEventListener('mouseleave', this.disabledHint);
      })
  }
  renderIcon(login, saved){
    if(login && saved){
      this.button.classList.add('articles__button_saved');
      this.button.removeEventListener('mouseover', this.activateHint);
      this.button.removeEventListener('mouseout', this.disabledHint);
      return;
    }
    this.button.addEventListener('mouseenter', this.activateHint);
    this.button.addEventListener('mouseleave', this.disabledHint);

    if(this.isSavedArticles){
      this.hint.textContent = 'Удалить';
      this.button.addEventListener('click', this.removeArticle);
      return ;
    }
    if(login){
      this.hint.textContent = 'Сохранить';
      this.button.addEventListener('click', this.saveArticle);
    }
    else {
      this.hint.textContent = 'Войдите, чтобы сохранить статьи';
      this.button.removeEventListener('click', this.saveArticle);
    }
  }
  remove(){
    this.button.removeEventListener('click',  this.saveArticle);
    this.button.removeEventListener('click', this.removeArticle);
    this.button.removeEventListener('mouseover', this.activateHint);
    this.button.removeEventListener('mouseout', this.disabledHint);
    this.domElement.remove();
  }
}
