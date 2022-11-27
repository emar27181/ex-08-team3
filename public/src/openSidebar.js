const openSidebar = () => {
  const sidebar = document.querySelector("aside");

  if (sidebar.getAttribute("class") === "open") {
    sidebar.setAttribute("class", "close");
  } else {
    sidebar.setAttribute("class", "open");
  }
};

module.exports = openSidebar;
