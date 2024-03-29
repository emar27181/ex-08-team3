const nameForm = document.getElementById("name-form");
const passwordForm = document.getElementById("password-form");

const beforeSubmit = (event) => {
  if (window.confirm("本当に変更しますか？")) {
    event.submit();
  } else {
    event.preventDefault();
  }
};

nameForm.addEventListener("submit", beforeSubmit);
passwordForm.addEventListener("submit", beforeSubmit);

const eye = document.querySelector("i");
const clairvoyance = require("./src/clairvoyance");

eye.addEventListener("click", () => {
  clairvoyance(eye);
});
