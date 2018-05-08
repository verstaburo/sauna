const $ = window.$;

export default function tags() {
  $(document).on('click', '.tags__list-item', function (e) {
    e.preventDefault();
    $(this).toggleClass('tags__list-item_active');
  });

  $(document).on('click', '.tags__side-button', function (e) {
    e.preventDefault();
    $(this).siblings('.tags__list-item').addClass('tags__list-item_active');
  });
}
