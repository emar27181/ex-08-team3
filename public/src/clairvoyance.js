const clairvoyance = (eye) => {
  const passwordInput = document.getElementById("employee-password");
  const inputType = passwordInput.getAttribute("type");

  if (inputType === "password") {
    passwordInput.setAttribute("type", "text");
    eye.setAttribute("class", "bi bi-eye");
  } else {
    passwordInput.setAttribute("type", "password");
    eye.setAttribute("class", "bi bi-eye-fill");
  }
};

module.exports = clairvoyance;
