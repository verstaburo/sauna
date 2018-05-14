const $ = window.$;

export default function comments() {
  if ($('.comments').length) {
    $(window).on('scroll resize', function () {
      const stickyBlock = $('.comments__innercols');
      if ($(window).width() > window.globalOptions.sizes.md) {
        const windowScroll = $(this).scrollTop();
        const ratingCard = $('.comments__card_rating');
        const ratingCardHeight = ratingCard.height();
        const startOffset = ratingCard.offset().top + ratingCardHeight;
        const stickyBlockHeight = stickyBlock.outerHeight(true);
        const stickyBlockWidth = stickyBlock.parent().width();
        const stickyBlockLeftOffset = stickyBlock.parent().offset().left;
        const cols = $('.comments__cols');
        const colsHeight = cols.height();
        const endOffset = (cols.offset().top + colsHeight) - stickyBlockHeight;
        if (stickyBlockHeight < (colsHeight - ratingCardHeight)) {
          if (windowScroll > startOffset && windowScroll < endOffset) {
            stickyBlock.css({
              position: 'fixed',
              left: `${stickyBlockLeftOffset}px`,
              top: 0,
              bottom: '',
              width: `${stickyBlockWidth}px`,
            });
          } else if (windowScroll >= endOffset) {
            stickyBlock.css({
              position: '',
              left: '',
              top: 'auto',
              bottom: 0,
              width: '',
            });
          } else {
            stickyBlock.css({
              position: '',
              left: '',
              top: '',
              bottom: '',
              width: '',
            });
          }
        }
      } else {
        stickyBlock.css({
          position: '',
          left: '',
          top: '',
          bottom: '',
          width: '',
        });
      }
    });
  }
}
