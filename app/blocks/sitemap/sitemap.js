const $ = window.$;

$(document).on('click', '.sitemap__nav-link', function (e) {
  e.preventDefault();
  const $this = $(this);
  $this.siblings().removeClass('active');
  $this.addClass('active');
  const navLinksHeight = $(this).parents('.sitemap__nav-links').outerHeight();
  const target = $($(this).attr('href'));
  if (target.length > 0) {
    $('body, html').stop().animate({
      scrollTop: target.offset().top - navLinksHeight,
    }, 1000, 'swing');
  }
});

if ($('.sitemap').length) {
  $(window).on('scroll', function () {
    const windowScroll = $(this).scrollTop();
    const tab = $('.sitemap__tab:visible');
    const tabOffset = tab.offset().top;
    const navLinks = $('.sitemap__nav-links:visible');
    const navLinksSpace = navLinks.outerHeight(true);
    if (windowScroll > tabOffset) {
      navLinks.addClass('is-sticky');
      tab.css('padding-top', `${navLinksSpace}px`);
    } else {
      navLinks.removeClass('is-sticky');
      tab.css('padding-top', '');
    }
  });
}
