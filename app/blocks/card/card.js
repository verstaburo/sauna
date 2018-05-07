/* eslint-disable prefer-arrow-callback */
const $ = window.$;

export default function card() {
  $(document).on('click', '.card-reviewform__button', function (e) {
    e.preventDefault();
    let err = 0;
    const $this = $(this);
    const form = $this.parents('.card-reviewform__form');
    const input = form.find('.card-reviewform__field');
    input.each(function () {
      if ($(this).val() === '') err += 1;
    });
    if (err < 1) {
      $this.parents('.card-reviewform').addClass('success');
      setTimeout(function () {
        form.submit();
      }, 5000);
    }
  });

  $(document).on('click', '.card-reviewform__link a', function (e) {
    e.preventDefault();
    const form = $(this).parents('.card-reviewform').find('.card-reviewform__content');
    if (form.hasClass('is-active')) {
      form.removeClass('is-active');
      form.children('.card-reviewform__inner').slideUp(500);
    } else {
      form.addClass('is-active');
      form.children('.card-reviewform__inner').slideDown(500);
    }
  });
}
/* eslint-enable prefer-arrow-callback */
