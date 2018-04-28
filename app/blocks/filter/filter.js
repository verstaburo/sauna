const $ = window.$;

export default function filter() {
  $(document).on('click', '.filter__tag-close', function () {
    if ($(this).parent('.filter__tag').siblings().length === 1) {
      $(this).parent('.filter__tag').siblings().click();
    } else {
      $(this).parent('.filter__tag').remove();
    }
  });

  $(document).on('click', '.filter__tag_reset', function (e) {
    e.preventDefault();
    if (!$(this).parents('.filter__tags').hasClass('filter__tags_switcher')) {
      $(this).parents('.filter__tags').addClass('filter__tags_empty');
    }
    $(this).parents('.filter__tags').find('.filter__tag').remove();
  });
}
