/**
 * @jest-environment jsdom
 */

const clairvoyance = require("../../public/src/clairvoyance");

describe("clairvoyance password", () => {
  it("visible", () => {
    expect.assertions(2);
    document.body.innerHTML =
      '<input id="employee-password" type="password" /><span class="clairvoyance"><i class="bi bi-eye"></i></span>';
    const eye = document.querySelector("i");
    clairvoyance(eye);
    const pass = document.getElementById("employee-password");
    expect(pass.getAttribute("type")).toStrictEqual("text");
    expect(eye.getAttribute("class")).toStrictEqual("bi bi-eye");
  });

  it("hidden", () => {
    expect.assertions(2);
    document.body.innerHTML =
      '<input id="employee-password" type="text" /><span class="clairvoyance"><i class="bi bi-eye-fill"></i></span>';
    const eye = document.querySelector("i");
    clairvoyance(eye);
    const pass = document.getElementById("employee-password");
    expect(pass.getAttribute("type")).toStrictEqual("password");
    expect(eye.getAttribute("class")).toStrictEqual("bi bi-eye-fill");
  });
});
