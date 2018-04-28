const $ = window.$;

export default function dragscroll() {
  let clicked = false;
  let curXPos = 0;
  let curYPos = 0;
  $(document).on('mousemove', '.dragscroll', function (c) {
    if (clicked === true) {
      const NcurXPos = c.pageX - ($(this).offset().left);
      const NcurYPos = c.pageY - ($(this).offset().top);
      $(this).scrollLeft($(this).scrollLeft() + (curXPos - NcurXPos));
      $(this).scrollTop($(this).scrollTop() + (curYPos - NcurYPos));
      curXPos = NcurXPos;
      curYPos = NcurYPos;
    }
  });
  $(document).on('mousedown', '.dragscroll', function (c) {
    clicked = true;
    console.log('clicked');
    curXPos = c.pageX - ($(this).offset().left);
    curYPos = c.pageY - ($(this).offset().top);
    $(this).addClass('dragging');
  });
  $(document).on('mouseup', '.dragscroll', function () {
    clicked = false;
    $(this).removeClass('dragging');
  });
}
