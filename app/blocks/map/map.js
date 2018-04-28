/* eslint-disable no-unused-vars */
// http://leafletjs.com
// Для кластеров использовать: https://github.com/Leaflet/Leaflet.markercluster
import L from 'leaflet';
import 'leaflet.markercluster';

const $ = window.$;

export default function maps() {
  if ($('#map').length) {
    const map = L.map('map', { scrollWheelZoom: false }).setView([55.738719, 37.608438], 9);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
    }).addTo(map);

    const MyIcon = L.Icon.extend({
      options: {
        shadowUrl: 'assets/images/markershadow.png',
        iconSize: [34, 48],
        shadowSize: [47, 31],
        iconAnchor: [17, 48],
        shadowAnchor: [5, 26],
        popupAnchor: [35, -52],
      },
    });

    const DefaultIcon = new MyIcon({ iconUrl: 'assets/images/marker.png' });
    const HoverIcon = new MyIcon({ iconUrl: 'assets/images/redmarker.png' });

    const mapPopup = '<div class="map-popup"><div class="map-popup__img"><img src="assets/images/place5.jpg"></div><div class="map-popup__content"><p class="map-popup__link"><a href="#">Усадьба банная на Угрешской</a></p><p class="map-popup__price">от 1 800 руб./час</p><div class="map-popup__rating"><div class="rating"><div class="rating__box"><svg class="rating__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_star"></use></svg></div><div class="rating__box is-active"><svg class="rating__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_star"></use></svg></div><div class="rating__box"><svg class="rating__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_star"></use></svg></div><div class="rating__box"><svg class="rating__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_star"></use></svg></div><div class="rating__box"><svg class="rating__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_star"></use></svg></div></div><p class="map-popup__reviews">(15)</p></div></div></div>';

    const addressPoints = [[56.117559, 36.113611], [56.107628, 36.143985], [56.100506, 36.101566],
                           [56.093139, 36.039943], [55.541331, 36.142094], [55.559968, 36.064220],
                           [55.490457, 36.097166], [55.767876, 36.816966], [55.746457, 36.488221],
                           [56.184170, 38.083501], [56.189947, 38.166552], [55.689931, 37.792821],
                           [55.818457, 38.592191], [55.646995, 38.159631], [55.643089, 38.152710],
                           [55.617693, 38.194236]];

    const markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction(cluster) {
        return L.divIcon({ html: `<div class="map-cluster-inner"><p class="map-cluster-count">${cluster.getChildCount()}</p></div>`, className: 'map-cluster-outer', iconSize: L.point(77, 77) });
      },
    });

    for (let i = 0; i < addressPoints.length; i += 1) {
      const marker = L.marker(addressPoints[i], { icon: DefaultIcon });
      marker.bindPopup(mapPopup);
      markers.addLayer(marker);
    }

    map.addLayer(markers);

    markers.on('mouseover', (e) => {
      e.layer.setIcon(HoverIcon);
    });

    markers.on('mouseout', (e) => {
      e.layer.setIcon(DefaultIcon);
    });
  }
}
/* eslint-enable no-unused-vars */
