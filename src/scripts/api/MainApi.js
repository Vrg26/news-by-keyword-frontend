export default class MainApi {
  constructor(settings) {
    this.settings = settings;
  }

  signup(email, password, name) {
    return fetch(this.settings.baseUrl + 'signup', {
      method: 'POST',
      body: JSON.stringify({
        email, password, name
      }),
      headers: this.settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        throw err;
      })
  }

  signin(email, password) {
    return fetch(this.settings.baseUrl + "signin",{
      method: "POST",
      credentials:"include",
      withCredentials: true,
      body: JSON.stringify({
        email, password,
      }),
      headers: this.settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        throw err;
      });
  }

  removeArticle(id) {
    return fetch(this.settings.baseUrl + 'articles/' + id, {
      method: 'DELETE',
      credentials: 'include',
      withCredentials: true,
      "Content-Type": "application/json",
      headers: this.settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`${res.status}`);
      })
      .catch((err) => {
        throw err;
      });
  }

  createArticle(article){
    return fetch(this.settings.baseUrl + "articles", {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(article),
      "Content-Type": "application/json",
      headers: this.settings.headers,
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(res.message);
      })
      .catch((err) => {
        throw err;
      })
  }

  getArticles() {
    return fetch(this.settings.baseUrl + 'articles', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      "Content-Type": "application/json",
      headers: this.settings.headers,
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.message)
      })
      .catch((err) => {
        throw err;
      });
  }

  getUserData() {
    return fetch(this.settings.baseUrl + 'users/me', {
      method: "GET",
      credentials:"include",
      withCredentials: true,
      "Content-Type": "application/json",
      headers: this.settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        throw err;
      });
  }

  logout() {
    return fetch(this.settings.baseUrl + 'logout', {
      method: 'GET',
      credentials: "include",
      withCredentials: true,
      "Content-Type": "application/json",
      headers: this.settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
