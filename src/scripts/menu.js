;(function() {
  let fixedNavbar = document.querySelector(".fixed-navbar");
let hamburger = document.querySelector(".hamburger-menu-link");

fixedNavbar.addEventListener('wheel', ()=>{
  return false;
});

hamburger.addEventListener("click", function(e) {
  e.preventDefault();
  fixedNavbar.style.display = "block";
  document.body.classList.add("locked");
});

//Нажатие на бургер close and esc

let menuClose = document.querySelector(".menu-fixed__close");

menuClose.addEventListener("click", function() {
  fixedNavbar.style.display = "none";
  document.body.classList.remove("locked");
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    fixedNavbar.style.display = "none";
    document.body.classList.remove("locked");
  }
});

//Нажатие на ссылки nav-fixed

let fixedNavbarItem = document.querySelectorAll(".fixed-navbar__item"),
  fixedNavbarItemLength = fixedNavbarItem.length;

for (let i = 0; i < fixedNavbarItemLength; i++) {
  fixedNavbarItem[i].addEventListener("click", function(e) {
    e.preventDefault();
    fixedNavbar.style.display = "none";
    document.body.classList.remove("locked");
  });
}

})()



