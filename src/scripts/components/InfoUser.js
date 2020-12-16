import BaseComponent from './BaseComponent';

export class InfoUser extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.userName = '';
    this.articles = [];
    this.keyWordsText = this.domElement.querySelector('.info__text');
    this.render = this.render.bind(this);
  }
  render(){
    this.domElement.querySelector('.info__subtitle')
      .textContent = `${this.userName} у вас ${this.articles.length} сохраненых статей`;
    const uniqueWords = this.getKeyWords();
    if(uniqueWords.length > 0){
      this.keyWordsText.innerHTML += `<span class="info__keyword">${uniqueWords[0]}</span>`
      if(uniqueWords.length> 1){
        this.keyWordsText.innerHTML += `, <span class="info__keyword">${uniqueWords[1]}</span>`
      }
      if(uniqueWords.length === 3){
        this.keyWordsText.innerHTML += `, <span class="info__keyword">${uniqueWords[2]}</span>`
      }
      if(uniqueWords.length> 3){
        this.keyWordsText.innerHTML += `и <span class="info__keyword">${uniqueWords.length - 2}-м другим</span>`
      }

    }

  }
  getKeyWords(){
    const keyWords = this.articles.map((item) => item.keyword);
    keyWords.sort((a,b) => {
     let countWordA = keyWords.reduce((sum, currentItem) => {

        if(a === currentItem){
          return sum + 1;
        }
       return sum;
      }, 0);

      let countWordB = keyWords.reduce((sum, currentItem) => {
        if(b === currentItem){
          return sum + 1;
        }
        return sum;
      }, 0);

      if(countWordA < countWordB){
        return 1;
      }
      else{
        return -1
      }
    }, 0);
    return Array.from(new Set(keyWords));
  }
}
