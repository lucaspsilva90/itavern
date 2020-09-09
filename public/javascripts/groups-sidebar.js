// setup nav
const groupsBtn = document.getElementById("nav-btn-groups");
const groupsClose = document.getElementById("nav-close");
const aside = document.getElementsByTagName('aside')[0];

// show nav
groupsBtn.addEventListener("click", () => {
  if (aside.classList[0] == "show-sidebar") {
    aside.classList.remove("show-sidebar");
  } else {
    aside.classList.add("show-sidebar");
  }
});