const $ = window.$;

export default function mapblock() {
  const getLocButton = $('.js-getloc');

  function showPosition(position) {
    getLocButton.attr('data-location', `${position.coords.latitude}, ${position.coords.longitude}`);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Этот браузер не поддерживает геолокацию');
    }
  }

  $(document).on('click', '.js-getloc', (e) => {
    e.preventDefault();
    getLocation();
  });
}
