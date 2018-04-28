const $ = window.$;

$(document).on('click', '.sitemap__nav-link', function (e) {
  e.preventDefault();
  const $this = $(this);
  $this.siblings().removeClass('active');
  $this.addClass('active');
});
