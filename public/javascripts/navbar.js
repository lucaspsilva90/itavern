//setup date
const date = (document.getElementById(
  "date"
).innerHTML = new Date().getFullYear());
// setup nav
const navBtn = document.getElementById("nav-btn");
const navbar = document.getElementById("navbar");
const navClose = document.getElementById("nav-close");
const body = document.getElementsByTagName('body')[0];
// show nav
navBtn.addEventListener("click", () => {
  navbar.classList.add("showNav");
  body.classList.add("body-overflow");
});
// close nav
navClose.addEventListener("click", () => {
  navbar.classList.remove("showNav");
  body.classList.remove("body-overflow");
});

setTimeout(()=>{
  //mascara de data pro campo inicioReuniao
  $("#inicio").mask("99/99/9999");
  //mascara para o campo cep
  $("#cep-create").mask('99999-999');
  $("#cep-edit").mask('99999-999');
})
