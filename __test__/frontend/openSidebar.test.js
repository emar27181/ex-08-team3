/**
 * @jest-environment jsdom
 */

const openSidebar = require("../../public/src/openSidebar");

describe("change class of aside", () => {
  it("open sidebar", () => {
    expect.assertions(1);
    document.body.innerHTML = '<aside class="close"></aside>';
    openSidebar();
    const sidebar = document.querySelector("aside");
    expect(sidebar.getAttribute("class")).toStrictEqual("open");
  });

  it("close sidebar", () => {
    expect.assertions(1);
    document.body.innerHTML = '<aside class="open"></aside>';
    openSidebar();
    const sidebar = document.querySelector("aside");
    expect(sidebar.getAttribute("class")).toStrictEqual("close");
  });
});
