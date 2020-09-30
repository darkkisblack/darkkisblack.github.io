;(function(){
  let teamItem = document.querySelectorAll(".team__item"),
  teamItemLength = teamItem.length;
let teamItemName = document.querySelectorAll(".name"),
  teamItemNameLength = teamItemName.length;

for (let i = 0; i < teamItemNameLength; i++) {
  teamItemName[i].addEventListener("click", function() {
    if (teamItemName[i].parentNode.classList.contains("team__item--active")) {
      teamItemName[i].parentNode.classList.remove("team__item--active");
    } else {
      for (let i = 0; i < teamItemLength; i++) {
        teamItem[i].classList.remove("team__item--active");
      }
      teamItemName[i].parentNode.classList.add("team__item--active");
    }
  });
}
})()
