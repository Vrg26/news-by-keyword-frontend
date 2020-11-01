import BaseComponent from './BaseComponent';

export default class From extends BaseComponent {
  constructor(validation,...args) {
    super(...args);
    this.createDomElement = this.createDomElement.bind(this);
    this.createDomElement(this.domElement);
    this._form = this.domElement.querySelector('form');
    this.validation = validation(this._form);
  }

  createDomElement(template) {
    const content = document.createElement('div');
    content.classList.add('popup__content');
    content.appendChild(template.content.cloneNode(true));
    this.domElement = content;
  }

  disableForm() {
    this._form.querySelectorAll('input').forEach((input) => {
      input.setAttribute("disabled", "true");
    })
    const button =  this._form.querySelector('button');
    button.setAttribute("disabled", "true");
    button.classList.add('button_disabled');

  }

  enableForm() {
    this._form.querySelectorAll('input').forEach((input) => {
      input.removeAttribute("disabled");
    })
    const button =  this._form.querySelector('button');
    button.removeAttribute("disabled");
    button.classList.remove('button_disabled');
  }


  setServerError(err) {
   const error = this.domElement.querySelector('.popup__error_center');
    if (err === 409) {
      error.textContent = 'Пользователь с данным email уже зарегистрирован';
    } else if (err.statusCode === 429) {
      error.textContent = 'Слишком много запросов';
    } else if (err === 'TypeError: Failed to fetch') {
      error.textContent = 'Отсутствует соединение с интернетом';
    } else if (err === 400) {
      error.textContent = 'Некорректный запрос';
    } else if (err === 401) {
      error.textContent = 'Нет такого пользователя';
    } else {
      error.textContent = 'Произошла ошибка';
    }
  }

  resetForm() {
    this._form.reset();
    this.validation.resetErrors();
    this.validation.setSubmitButtonState();
  }
}
