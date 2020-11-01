import '../pages/articles.css';
import Header from './components/Header';
import MainApi from './api/MainApi';
import ArticlesList from './components/ArticlesList';
import Article from './components/Article';
import dateConverter from './utils/dateConverter';
import { InfoUser } from './components/InfoUser';
const header = new Header(document.querySelector('.header'));
const articlesList = new ArticlesList(createArticle,document.querySelector('.result'));
const userInfo = new InfoUser(document.querySelector('.info'));
const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/',
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

function  createArticle(...args){
  return new Article(document.getElementById('article'), dateConverter, mainApi,true,...args);
}

function getUsersArticles() {
  mainApi.getArticles()
    .then((data) => {
      articlesList.usersArticles = data;
      articlesList.renderUsersArticles();
      userInfo.articles = data;
      userInfo.render();
    })
    .catch((err) =>{
      console.error(err);
    })
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

function checkAuth() {
  mainApi.getUserData()
    .then((data) => {
      if(data){
        header.render({isLoggedIn: true, userName: data.name, isMain: false})
        articlesList.isLoggedIn = true;
        header.authButton.addEventListener('click', handleLogout);
        userInfo.userName = data.name;
        getUsersArticles();
      }
      else{
        window.location.pathname = window.location.pathname.replace(
          "articles.html",
          "index.html"
        );
      }
    })
    .catch((err) => {
      console.log(err);
      window.location.pathname = window.location.pathname.replace(
        "articles.html",
        "index.html"
      );
    });
}
checkAuth();

