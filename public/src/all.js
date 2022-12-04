const openSidebar = require("./openSidebar");

const contentBody = document.getElementById("content-body");
const button = document.getElementById("sidebar-disp");

contentBody.scrollIntoView(false);

button.addEventListener("click", () => {
  openSidebar();
});
