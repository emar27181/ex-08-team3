const openSidebar = require("./src/openSidebar");

const button = document.getElementById("sidebar-disp");

button.addEventListener("click", () => {
  openSidebar();
});
