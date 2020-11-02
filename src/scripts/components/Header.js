import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent{
  constructor(...args) {
    super(...args);
    this.authText = this.domElement.querySelector('.header__auth-text');
    this.logoutIcon = this.domElement.querySelector('.header__logout-icon');
    this.authButton = this.domElement.querySelector('.header__auth');
    this.burger = this.domElement.querySelector('.header__burger');
    this.nav = this.domElement.querySelector('.header__nav');
    this.openMenu = this.openMenu.bind(this);
    this.burger.addEventListener('click', this.openMenu);

  }
  openMenu(){
    this.burger.classList.toggle('header__burger_active');
    this.nav.classList.toggle('header__nav_active');
    this.domElement.classList.toggle('header_active');
  }
  render(props){
    if(props.isLoggedIn){
      this.authText.textContent = props.userName;
      this.logoutIcon.classList.add('header__logout-icon_show');
      if(props.isMain){
        this.domElement.querySelector('.header__nav-links').innerHTML = `
            <li class="header__nav-item header__nav-item_active"><a href="#" class="header__nav-link">Главная</a></li>
            <li class="header__nav-item"><a href="./articles.html" class="header__nav-link">Сохранённые статьи</a></li>`
      }
      else{
        this.domElement.querySelector('.header__nav-links').innerHTML = `
        <li class="header__nav-item header__nav-item_black"><a href="./index.html" class="header__nav-link">Главная</a></li>
        <li class="header__nav-item header__nav-item_black header__nav-item_active"><a href="./articles.html" class="header__nav-link">Сохранённые статьи</a></li>`;
      }
    }
    else {
      this.authText.textContent = 'Авторизоваться';
      this.logoutIcon.classList.remove('header__logout-icon_show');
      this.domElement.querySelector('.header__nav-links').innerHTML = `
        <li class="header__nav-item header__nav-item_active"><a href="#" class="header__nav-link">Главная</a></li>`
    }
  }
}
