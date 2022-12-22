const openSidebar = require("./openSidebar");

const button = document.getElementById("sidebar-disp");

button.addEventListener("click", () => {
  openSidebar();
});
