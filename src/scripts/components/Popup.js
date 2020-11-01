import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent{
  constructor(...args) {
    super(...args);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setContent = this.setContent.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }
  setContent(content){
    this.domElement.append(content);
    this._setHandlers();
  }
  clearContent(){
    const content = this.domElement.querySelector('.popup__content');
    this.domElement.removeChild(content);
  }
  open () {
    this.domElement.classList.add('popup_show')
  }
  close(){
    this.domElement.classList.remove('popup_show');
    this.clearContent();
  }
  _setHandlers(){
    const closeButton = this.domElement.querySelector('.popup__close');
    const overlay = this.domElement.querySelector('.overlay');
    overlay.addEventListener('click', this.close);
    closeButton.addEventListener('click', this.close);
  }
}
