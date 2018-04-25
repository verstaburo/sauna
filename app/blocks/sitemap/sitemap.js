const $ = window.$;

$(document).on('click', '.sitemap__nav-link', function (e) {
  e.preventDefault();
  const $this = $(this);
  $this.siblings().removeClass('active');
  $this.addClass('active');
  const href = $this.attr('href');
  const target = $(href);
  if (target.length) {
    const targetPosition = target.position().top;
    const targetParent = target.parents('.sitemap__cols');
    const targetScrollPos = targetParent.scrollTop();
    const newTargetScrollPos = targetScrollPos + targetPosition;
    targetParent.animate({ scrollTop: newTargetScrollPos }, 1000);
  }
});
