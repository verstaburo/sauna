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

  $(document).on('click', '.popup__close, .callform__close', () => {
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

  $(document).on('change', '.popup__label input', function () {
    const checked = $(this).prop('checked');
    const text = $(this).siblings('.popup__label-text').text();
    const id = $(this).attr('data-id');
    const filters = $(this).parents('form').find('.popup__filters');
    const color = $(this).attr('data-color');
    const hiddenFilter = $(this).parents('form').find('.popup__filter.is-hidden');
    if (checked) {
      filters.removeClass('is-empty');
      hiddenFilter
        .clone(true)
        .insertAfter(hiddenFilter)
        .removeClass('is-hidden')
        .addClass(`popup__filter_${color}`)
        .attr('data-id', id)
        .find('.popup__filter-text')
        .text(text);
    } else {
      filters.find(`[data-id="${id}"]`).remove();
      if (!filters.find('[data-id]').length) {
        filters.addClass('is-empty');
      }
    }
  });

  $(document).on('click', '.popup__filter-close', function (e) {
    e.preventDefault();
    const id = $(this).parent().attr('data-id');
    const target = $(this).parents('form').find(`input[data-id="${id}"]`);
    target
      .prop('checked', false)
      .change();
  });

  $(document).on('click', '.popup__filters [data-reset]', function (e) {
    e.preventDefault();
    const target = $(this).parents('form').find('input[data-id]');
    target
      .prop('checked', false)
      .change();
  });

  $(document).on('click', '.popup__reset', function (e) {
    e.preventDefault();
    const target = $(this).parents('form').find('input');
    target
      .prop('checked', false)
      .change();
    $(this).parents('form').find('.popup__count-icon').removeClass('popup__count-icon_active');
  });

  $(document).on('click', '.popup__count-icon', function () {
    const index = parseInt($(this).attr('data-count'), 10);
    const inputs = $(this).parents('.popup__count').find('input');
    const icons = $(this).parents('.popup__count').find('.popup__count-icon');
    let flag = true;
    inputs.each(function () {
      const count = parseInt($(this).val(), 10);
      if (index <= count && flag) {
        $(this).prop('checked', true).change();
        flag = false;
      }
    });
    icons.removeClass('popup__count-icon_active');
    icons.each(function () {
      const currentIndex = parseInt($(this).attr('data-count'), 10);
      console.log(currentIndex);
      if (currentIndex <= index) {
        $(this).addClass('popup__count-icon_active');
      }
    });
  });

  $(document).on('click', '.popup__count input', function () {
    const icons = $(this).parents('.popup__count').find('.popup__count-icon');
    const iconsLength = icons.length;
    let count = $(this).val();
    if (isNaN(count)) {
      if (count === 'max') {
        count = iconsLength;
      } else {
        count = 0;
      }
    } else {
      count = parseInt(count, 10);
    }
    icons.removeClass('popup__count-icon_active');
    icons.each(function () {
      const currentIndex = parseInt($(this).attr('data-count'), 10);
      console.log(currentIndex);
      if (currentIndex <= count) {
        $(this).addClass('popup__count-icon_active');
      }
    });
    $(this).prop('checked', true).change();
  });

  $(document).on('click', '.callform__button', function (e) {
    e.preventDefault();
    let err = 0;
    const $this = $(this);
    const form = $this.parents('.callform__form');
    const input = form.find('.callform__input');
    input.each(function () {
      if ($(this).val() === '') err += 1;
    });
    if (err < 1) {
      form.submit();
    }
  });
}
