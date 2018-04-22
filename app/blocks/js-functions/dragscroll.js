const $ = window.$;

export default function dragscroll() {
  $('.dragscroll').each(function () {
    let clicked = false;
    let curXPos = 0;
    let curYPos = 0;

    $(this).mousemove((c) => {
      if (clicked === true) {
        const NcurXPos = c.pageX - ($(this).offset().left);
        const NcurYPos = c.pageY - ($(this).offset().top);
        $(this).scrollLeft($(this).scrollLeft() + (curXPos - NcurXPos));
        $(this).scrollTop($(this).scrollTop() + (curYPos - NcurYPos));
        curXPos = NcurXPos;
        curYPos = NcurYPos;
      }
    });

    $(this).mousedown((c) => {
      clicked = true;
      curXPos = c.pageX - ($(this).offset().left);
      curYPos = c.pageY - ($(this).offset().top);
      $(this).addClass('dragging');
    });

    $(this).mouseup(() => {
      clicked = false;
      $(this).removeClass('dragging');
    });
  });
}
