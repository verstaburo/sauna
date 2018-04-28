const $ = window.$;

export default function switcher() {
  $(document).on('click', '.switcher__type', function (e) {
    e.preventDefault();
    $(this).siblings().removeClass('switcher__type_active');
    $(this).addClass('switcher__type_active');
  });
}
