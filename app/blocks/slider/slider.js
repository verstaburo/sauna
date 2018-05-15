/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  const mySlider = new Swiper('.js-slider', {
    loop: true,
    speed: 700,
    slidesPerView: 1,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
    roundLengths: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
    },
  });

  $(document).on('refresh', '.js-slider', () => {
    for (let i = 0; i < mySlider.length; i += 1) {
      mySlider[i].update();
    }
  });

  const myMultiSlider = new Swiper('.js-multislider', {
    speed: 700,
    slidesPerView: 4,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
    roundLengths: true,
    resistanceRatio: 0,
    freeMode: true,
    freeModeMomentumRatio: 0.2,
    freeModeMomentumBounce: false,
    breakpoints: {
      1020: {
        slidesPerView: 'auto',
      },
    },
  });

  const myScrollSlider = new Swiper('.js-scrollslider', {
    speed: 700,
    slidesPerView: 'auto',
    roundLengths: true,
    resistanceRatio: 0,
    freeMode: true,
    freeModeMomentumRatio: 0.2,
    freeModeMomentumBounce: false,
  });

  const popupSlider = new Swiper('.js-popupslider', {
    speed: 700,
    slidesPerView: 'auto',
    roundLengths: true,
    resistanceRatio: 0,
    freeMode: true,
    freeModeMomentumRatio: 0.2,
    freeModeMomentumBounce: false,
  });

  $(document).on('refresh', '.js-popupslider', () => {
    for (let i = 0; i < popupSlider.length; i += 1) {
      popupSlider[i].update();
      console.log(1);
    }
  });
}
/* eslint-enable no-unused-vars */
