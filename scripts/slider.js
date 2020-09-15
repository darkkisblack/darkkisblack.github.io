
  /////SLIDER

let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");

let slideIndex = 1;

function showSlides(n) {
  let sliderItem = document.querySelectorAll(".slider__item"),
    sliderItemLength = sliderItem.length;

  if (n > sliderItemLength) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = sliderItemLength;
  }

  for (let i = 0; i < sliderItemLength; i++) {
    sliderItem[i].classList.remove("slider__item--active");
    sliderItem[slideIndex - 1].classList.add("slider__item--active");
  }
}

arrowRight.addEventListener("click", function(e) {
  e.preventDefault();
  showSlides((slideIndex += 1));
});

arrowLeft.addEventListener("click", function(e) {
  e.preventDefault();
  showSlides((slideIndex -= 1));
});

