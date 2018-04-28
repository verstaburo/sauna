/* eslint-disable prefer-arrow-callback */
const $ = window.$;

export default function card() {
  $(document).on('click', '.card-reviewform__button', function (e) {
    e.preventDefault();
    let err = 0;
    const $this = $(this);
    const input = $('.card-reviewform__field');
    input.each(function () {
      if ($(this).val() === '') err += 1;
    });
    if (err < 1) {
      $this.parents('.card-reviewform').addClass('success');
      setTimeout(function () {
        $this.parents('form').submit();
      }, 5000);
    }
  });
}
/* eslint-enable prefer-arrow-callback */
