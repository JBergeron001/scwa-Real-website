// Mobile menu
document.querySelectorAll(".nav-toggle").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var nav = document.getElementById("site-nav");
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
});

// Footer year
document.querySelectorAll(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

// Photo gallery lightbox (Projects page)
(function () {
  var box = document.querySelector(".lightbox");
  if (!box) return;
  var img = box.querySelector("img"), cap = box.querySelector("p");
  document.querySelectorAll(".gallery figure").forEach(function (fig) {
    fig.addEventListener("click", function () {
      var src = fig.querySelector("img");
      img.src = src.src; img.alt = src.alt;
      cap.textContent = fig.querySelector("figcaption").textContent;
      box.classList.add("open");
    });
  });
  function close() { box.classList.remove("open"); }
  box.addEventListener("click", function (e) { if (e.target === box || e.target.tagName === "BUTTON") close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();

// Forms (newsletter + contact) — sent through Web3Forms, which emails each submission.
document.querySelectorAll("form.web3").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = form.querySelector(".form-msg");
    var btn = form.querySelector("button[type=submit]");
    var key = form.querySelector("input[name=access_key]").value;
    if (!key || key.indexOf("PASTE") === 0) {
      msg.textContent = "Form not connected yet. See SETUP-GUIDE.md, step 4.";
      return;
    }
    btn.disabled = true; msg.textContent = "Sending…";
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) { msg.textContent = form.dataset.thanks || "Thanks for submitting!"; form.reset(); }
        else { msg.textContent = "Something went wrong. Please email us instead."; }
      })
      .catch(function () { msg.textContent = "Something went wrong. Please email us instead."; })
      .finally(function () { btn.disabled = false; });
  });
});

// Fade sections in as they scroll into view
(function () {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();
