import '../pages/index.css';
import Popup from './components/Popup';
import Form from './components/Form';
import { FormValidation } from './components/FormValidation';
import MainApi from './api/MainApi';
import Header from './components/Header';
import { NewsApi } from './api/NewsApi';
import Article from './components/Article';
import ArticlesList from './components/ArticlesList';
import dateConverter from './utils/dateConverter';
import { mainApiSettings } from './constants/mainApiSettings';
import { newsApiSettings } from './constants/newsApiSettings';

const popup = new Popup(document.querySelector('.popup'));
const formSignin = new Form(createValidation,document.getElementById('form-sign-in'));
const formSignup = new Form(createValidation,document.getElementById('form-sign-up'));
const formSearch = document.querySelector('.cover__search');
const successSignUp = document.getElementById('success').content.cloneNode(true);
const header = new Header(document.querySelector('.header'));
const articlesList = new ArticlesList(createArticle,document.querySelector('.result'));
const mainApi = new MainApi(mainApiSettings);
const newsApi = new NewsApi(newsApiSettings);

function createValidation(...arg){
  return new FormValidation(...arg);
}
function  createArticle(...args){
  return new Article(document.getElementById('article'), dateConverter, mainApi, false,...args);
}

function getUsersArticles() {
  mainApi.getArticles()
    .then((data) => {
      articlesList.usersArticles = data;
    })
    .catch((err) =>{
      console.log(err);
    })
}

function handleSearchSubmit (event) {
  event.preventDefault();
  const form = event.target;
  let word = form.search.value;
  articlesList.showResultLoad();
  newsApi.getNews({keyWord: form.search.value})
    .then((data)=> {
      articlesList.setArticles(data.articles,word);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleSignUpSubmit (event) {
  event.preventDefault();
  formSignup.disableForm();
  const form = event.target;
  mainApi.signup(form.email.value, form.password.value, form.name.value)
    .then((data) => {
      if(data) {
        popup.clearContent();
        popup.setContent(successSignUp);
      }
    })
    .catch((err) => {
      formSignup.setServerError(err)
    })
    .finally( () => formSignup.enableForm());
}

function handleSignInSubmit(event) {
  event.preventDefault();
  formSignin.disableForm();
  const form = event.target;
  mainApi.signin(form.email.value, form.password.value)
    .then((data) => {
      if (data) {
        header.render({isLoggedIn: true, userName: data.name, isMain: true});
        articlesList.clearArtiles();
        articlesList.isLoggedIn = true;
        getUsersArticles();
        header.authButton.removeEventListener('click', openSigninForm);
        header.authButton.addEventListener('click', handleLogout);
        popup.close();
      }
    })
    .catch((err) => {
      formSignin.setServerError(err);
    })
    .finally( () => formSignin.enableForm())
}

function handleLogout() {
  mainApi.logout()
    .then(() => {
      header.render({isLoggedIn: false});
      articlesList.clearArtiles();
      articlesList.isLoggedIn = false;
      header.authButton.removeEventListener('click', handleLogout);
      header.authButton.addEventListener('click', openSigninForm);
    })
    .catch((err) => {
      return err;
    });
}

function openSigninForm () {
  popup.open();
  popup.setContent(formSignin.domElement);
  formSignin.resetForm();
}
function checkAuth() {
  mainApi.getUserData()
    .then((data) => {
      if(data){
        header.render({isLoggedIn: true, userName: data.name, isMain: true});
        articlesList.isLoggedIn = true;
        getUsersArticles();
        header.authButton.removeEventListener('click', openSigninForm);
        header.authButton.addEventListener('click', handleLogout);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
checkAuth();

header.authButton.addEventListener('click', openSigninForm);

formSignin.domElement.querySelector('.popup__next').addEventListener('click', () => {
  popup.clearContent();
  popup.setContent(formSignup.domElement);
  formSignup.resetForm();
});

successSignUp.querySelector('.popup__next').addEventListener('click', () => {
  popup.clearContent();
  popup.setContent(formSignin.domElement);
  formSignin.resetForm();
});

formSignup.domElement.querySelector('.popup__next').addEventListener('click', () => {
  popup.clearContent();
  popup.setContent(formSignin.domElement);
  formSignin.resetForm();
});

formSearch.addEventListener('submit', handleSearchSubmit);
formSignup.domElement.addEventListener('submit', handleSignUpSubmit);
formSignin.domElement.addEventListener('submit', handleSignInSubmit);
