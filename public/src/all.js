const openSidebar = require("./openSidebar");

const contentBody = document.getElementById("content-body");
const button = document.getElementById("sidebar-disp");
// const Employee = require("../../src/channels/all.model");

contentBody.scrollIntoView(false);

button.addEventListener("click", () => {
  openSidebar();
});

