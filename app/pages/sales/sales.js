const $ = window.$;

export default function sales() {
  if ($('.sales').length) {
    $(window).on('scroll resize', function () {
      const banner = $('.sales__banner');
      if ($(window).width() > window.globalOptions.sizes.md) {
        const windowScroll = $(this).scrollTop();
        const content = $('.sales__container');
        const startOffset = content.offset().top;
        const contentPadding = content.css('padding-top');
        const contentHeight = content.height();
        const bannerHeight = banner.height();
        const bannerLeftOffset = (content.offset().left + content.outerWidth()) - (banner.width() + parseInt(banner.css('right'), 10));
        const endOffset = (startOffset + contentHeight) - bannerHeight;
        if (bannerHeight < contentHeight) {
          if (windowScroll > startOffset && windowScroll < endOffset) {
            banner.css({
              position: 'fixed',
              left: `${bannerLeftOffset}px`,
              top: contentPadding,
              bottom: '',
            });
          } else if (windowScroll >= endOffset) {
            banner.css({
              position: '',
              left: '',
              top: 'auto',
              bottom: 0,
            });
          } else {
            banner.css({
              position: '',
              left: '',
              top: '',
              bottom: '',
            });
          }
        }
      } else {
        banner.css({
          position: '',
          left: '',
          top: '',
          bottom: '',
        });
      }
    });
  }
}
