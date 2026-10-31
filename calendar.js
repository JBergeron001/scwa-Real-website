// Monthly calendar for the Events & News page. Reads SCWA_EVENTS from events.js.
(function () {
  var events = (window.SCWA_EVENTS || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var upcoming = document.getElementById("upcoming-list");
  var now = new Date();
  var view = new Date(now.getFullYear(), now.getMonth(), 1);
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function key(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  var todayKey = key(now);
  var future = events.filter(function (e) { return e.date >= todayKey; });

  // "Next event" list (Home page and Events page)
  if (upcoming) {
    upcoming.innerHTML = future.length ? "" : "<p>No events are scheduled right now. Subscribe to the newsletter to hear about the next forum.</p>";
    future.slice(0, 3).forEach(function (e) {
      var d = new Date(e.date + "T12:00:00");
      var p = document.createElement("p");
      p.innerHTML = "<strong>" + months[d.getMonth()] + " " + d.getDate() + "</strong> &middot; " +
        '<a href="' + (e.link || "events.html") + '">' + e.title + "</a>" + (e.time ? " &middot; " + e.time : "");
      upcoming.appendChild(p);
    });
  }

  var grid = document.getElementById("calendar");
  if (!grid) return;
  var title = document.getElementById("cal-title");
  var empty = document.getElementById("cal-empty");
  if (!future.length && empty) empty.hidden = false;

  function render() {
    title.textContent = months[view.getMonth()] + " " + view.getFullYear();
    grid.innerHTML = "";
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(function (d) {
      var h = document.createElement("div"); h.className = "dow"; h.textContent = d; grid.appendChild(h);
    });
    var start = new Date(view); start.setDate(1 - view.getDay());
    for (var i = 0; i < 42; i++) {
      var d = new Date(start); d.setDate(start.getDate() + i);
      if (i >= 35 && d.getMonth() !== view.getMonth()) break;
      var cell = document.createElement("div");
      cell.className = "day" + (d.getMonth() !== view.getMonth() ? " other" : "") + (key(d) === todayKey ? " today" : "");
      cell.innerHTML = '<span class="num">' + d.getDate() + "</span>";
      events.filter(function (e) { return e.date === key(d); }).forEach(function (e) {
        var a = document.createElement("a");
        a.className = "event"; a.href = e.link || "#"; a.textContent = (e.time ? e.time + " " : "") + e.title;
        if (/^https?:/.test(a.href) && a.hostname !== location.hostname) { a.target = "_blank"; a.rel = "noopener"; }
        cell.appendChild(a);
      });
      grid.appendChild(cell);
    }
  }
  document.getElementById("cal-prev").addEventListener("click", function () { view.setMonth(view.getMonth() - 1); render(); });
  document.getElementById("cal-next").addEventListener("click", function () { view.setMonth(view.getMonth() + 1); render(); });
  render();
})();
