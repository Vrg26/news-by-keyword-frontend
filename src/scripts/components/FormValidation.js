export class FormValidation {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.submitButton = this.form.querySelector('button');
    this.setEventListeners();
  }
  isValid(input){
    input.setCustomValidity("");

    if(input.validity.valueMissing) {
      input.setCustomValidity("Поле обязательное для заполнения");
      return false;
    }
    if(input.validity.tooShort || input.validity.tooLong){
      input.setCustomValidity("количество символов должно быть от 2 до 30 ");
      return false;
    }
    if(input.validity.typeMismatch && input.type === 'email'){
      input.setCustomValidity("Неправильный формат email");
      return false;
    }
    if(input.type === 'password'){
      if(input.value.length < 8 || input.value.length > 30){
        input.setCustomValidity("Длина пароля должна быть от 8 до 30");
        return false;
      }
    }

    return input.checkValidity();
  }

  setSubmitButtonState() {
    let isValidFrom = this.inputs.every(this.isValid)
    if (isValidFrom) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.remove('button_disabled');
    }
    else {
      this.submitButton.classList.add('button_disabled');
      this.submitButton.setAttribute('disabled', true);
    }
  }

  resetErrors() {
    const errorElem = Array.from(this.form.querySelectorAll('.popup__error'));
    errorElem.forEach(elem => {
      elem.textContent = "";
    })
  }

  checkFieldValid(input) {
    const inputCountainer = input.parentNode;
    const errorElem =inputCountainer.querySelector('.popup__error');
    this.isValid(input);
    errorElem.textContent = input.validationMessage;
  }

  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      this.checkFieldValid(event.target);
      this.setSubmitButtonState();
    });
  }

}
