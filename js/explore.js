/* Explore page: Leaflet map + goal filters, built from the place cards */
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('.ex-card'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.ex-chip'));
  var count = document.querySelector('.ex-count');
  var colors = { natural: '#5f9e52', built: '#4d82ef', learn: '#d4b62c' };
  var map = null, markers = {};

  if (window.L && document.getElementById('ex-map')) {
    map = L.map('ex-map', { scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    cards.forEach(function (c) {
      var lat = parseFloat(c.dataset.lat), lng = parseFloat(c.dataset.lng);
      var title = c.querySelector('h3').textContent;
      var m = L.circleMarker([lat, lng], {
        radius: 9, weight: 2, color: '#fff', fillColor: colors[c.dataset.kind] || '#18157c', fillOpacity: 0.95
      }).addTo(map);
      var approx = c.dataset.approx ? '<br><em>Approximate pin</em>' : '';
      m.bindPopup('<strong>' + title + '</strong>' + approx + '<br><a href="#' + c.id + '">Read more &darr;</a>');
      markers[c.id] = m;
    });
    fit();
  }

  function visible() { return cards.filter(function (c) { return !c.hidden; }); }

  function fit() {
    if (!map) return;
    var pts = visible().map(function (c) { return [parseFloat(c.dataset.lat), parseFloat(c.dataset.lng)]; });
    if (pts.length) map.fitBounds(pts, { padding: [40, 40], maxZoom: 13 });
  }

  function apply(goal) {
    chips.forEach(function (b) {
      var on = b.dataset.goal === goal;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    cards.forEach(function (c) {
      var show = goal === 'all' || c.dataset.goals.split(' ').indexOf(goal) > -1;
      c.hidden = !show;
      if (show) c.classList.add('in');
      if (markers[c.id]) {
        if (show) markers[c.id].addTo(map); else markers[c.id].remove();
      }
    });
    var n = visible().length;
    if (count) count.textContent = n + (n === 1 ? ' place' : ' places');
    fit();
  }

  chips.forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.goal); }); });

  document.querySelectorAll('[data-focus]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.dataset.focus;
      if (!map || !markers[id]) return;
      e.preventDefault();
      apply('all');
      document.getElementById('ex-map').scrollIntoView({ behavior: 'smooth', block: 'center' });
      map.setView(markers[id].getLatLng(), 12);
      markers[id].openPopup();
    });
  });

  apply('all');
})();
