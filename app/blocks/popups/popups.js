// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-fancybox').fancybox({
    afterLoad: freeze,
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
}
