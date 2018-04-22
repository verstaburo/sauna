const $ = window.$;

function checkLastViewWidth() {
  if ($('.lastview').length) {
    const container = $('.lastview__cards-container');
    const viewWidth = container.width();
    const scrollWidth = container[0].scrollWidth;
    console.log(viewWidth);
    if (scrollWidth > viewWidth) {
      container.addClass('dragscroll');
    } else {
      container.removeClass('dragscroll');
    }
  }
}

checkLastViewWidth();

$(window).on('resize', checkLastViewWidth);
