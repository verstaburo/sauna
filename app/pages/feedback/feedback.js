const $ = window.$;

export default function sales() {
  if ($('.feedback').length) {
    $(window).on('scroll', function () {
      const windowScroll = $(this).scrollTop();
      const content = $('.feedback__reviews');
      const startOffset = content.offset().top;
      const contentPadding = content.css('padding-top');
      const contentHeight = content.height();
      const banner = $('.feedback__banner');
      const bannerHeight = banner.height();
      const bannerLeftOffset = banner.offset().left;
      const endOffset = (startOffset + contentHeight) - bannerHeight;
      if (bannerHeight < contentHeight) {
        if (windowScroll > startOffset && windowScroll < endOffset) {
          banner.css({
            position: 'fixed',
            left: `${bannerLeftOffset}px`,
            top: contentPadding,
            bottom: '',
          });
        } else if (windowScroll > endOffset) {
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
    });
  }

  $(document).on('click', '.feedback__pagination-item', function (e) {
    e.preventDefault();
    $(this).siblings().removeClass('feedback__pagination-item_active');
    $(this).addClass('feedback__pagination-item_active');
  });
}
