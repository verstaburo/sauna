// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';
import maps from '../map/map';

const $ = window.$;

export default function popups() {
  $('.js-fancybox-popup').fancybox({
    afterLoad() {
      freeze();
      maps('popupmap');
    },
    afterClose: unfreeze,
    smallBtn: false,
    buttons: false,
    touch: false,
  });

  $(document).on('click', '.popup__close', () => {
    $.fancybox.close();
  });

  function checkPopupColsWidth() {
    if ($('.popup__cols_scrollable:visible').length) {
      const container = $('.popup__cols_scrollable:visible');
      const viewWidth = container.width();
      const scrollWidth = container[0].scrollWidth;
      if (scrollWidth > viewWidth) {
        container.addClass('dragscroll');
      } else {
        container.removeClass('dragscroll');
      }
    }
  }

  checkPopupColsWidth();

  $(window).on('resize', checkPopupColsWidth);
  $(document).on('click', '.popup__tab-link', () => {
    setTimeout(() => {
      checkPopupColsWidth();
    }, 100);
  });

  $(document).on('click', '.popup__control', function (e) {
    e.preventDefault();
    const control = $(this).attr('data-control');
    const controlText = $(this).siblings('.popup__controls-text');
    const valueText = controlText.text().split(' ');
    let value = parseInt(valueText[0], 10);
    if (control === 'minus') {
      value -= 1;
      if (value < 0) {
        value = 0;
      }
    } else {
      value += 1;
    }
    const finalText = `${value} ${valueText[1]}`;
    controlText.text(finalText);
  });
}
