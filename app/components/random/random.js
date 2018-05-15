/* eslint-disable no-undef */

const $ = window.$;

export default function random() {
  $(document).on('click', '.random__refresh', function (e) {
    e.preventDefault();
    const data = testCardsdata;
    const card = $(this).parents('.random').find('.random__card');
    card.addClass('is-hidden');
    setTimeout(() => {
      for (let i = 0; i < card.length; i += 1) {
        const images = data[i].images;
        const title = data[i].title;
        const name = data[i].name;
        const desc = data[i].desc;
        const current = card.eq(i);
        current.find('.swiper-wrapper').empty();
        for (let j = 0; j < images.length; j += 1) {
          const slide = `<div class="swiper-slide"><div class="slider__slide"><img src="${images[i]}"></div></div>`;
          current.find('.swiper-wrapper').append(slide);
        }
        current.find('.slidecard__title').html(title);
        current.find('.slidecard__name').html(name);
        current.find('.slidecard__desc').html(desc);
      }
      card.find('.js-slider').trigger('refresh');
      card.removeClass('is-hidden');
    }, 300);
  });
}
/* eslint-enable no-undef */
