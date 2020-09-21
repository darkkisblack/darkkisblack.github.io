let carouselItems = document.querySelectorAll('.interactive-avatar'),
    carouselItemsLength = carouselItems.length,
    reviewsBlockItems = document.querySelectorAll('.reviews__item');

  for (let i = 0; i < carouselItemsLength; ++i) {
    carouselItems[i].addEventListener('click', function (e) {
      for (let j = 0; j < carouselItemsLength; ++j) {
        carouselItems[j].classList.remove('interactive-avatar--active');
        reviewsBlockItems[j].classList.remove('reviews__item--active');
      };
      e.currentTarget.classList.add('interactive-avatar--active');
      reviewsBlockItems[i].classList.add('reviews__item--active');
    });
  }


  //прокрутка слайдов//



