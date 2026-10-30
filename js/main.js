/* Elga Bifardika Elfanda — Portfolio interactions */
(function () {
  "use strict";

  /* ---------- Tema gelap / terang ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("elga-theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}
  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("elga-theme", next); } catch (e) {}
  });

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Peran berganti (efek mengetik) ---------- */
  var roles = ["Editor Foto & Video", "Annotator Data AI", "Transcriber EN–ID", "Penguji Web3", "Fotografer"];
  var rotator = document.getElementById("roleRotator");
  var ri = 0, ci = roles[0].length, deleting = false;
  function tickRole() {
    var word = roles[ri];
    if (!deleting) {
      ci++;
      if (ci >= word.length + 14) deleting = true;
    } else {
      ci--;
      if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
    }
    rotator.textContent = roles[ri].slice(0, Math.min(ci, roles[ri].length));
    setTimeout(tickRole, deleting ? 34 : 78);
  }
  setTimeout(tickRole, 1600);

  /* ---------- Scrollspy ---------- */
  var spySections = ["tentang", "keahlian", "kemampuan", "pengalaman", "pendidikan", "kontak"];
  var navMap = {};
  navLinks.querySelectorAll("a[href^='#']").forEach(function (a) {
    navMap[a.getAttribute("href").slice(1)] = a;
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && navMap[en.target.id]) {
        Object.values(navMap).forEach(function (a) { a.classList.remove("active"); });
        navMap[en.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  spySections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  /* ---------- Animasi muncul saat scroll + bar kemampuan + angka statistik ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1400, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      if (en.target.classList.contains("stats")) {
        en.target.querySelectorAll(".stat-num").forEach(animateCount);
      }
      revealObs.unobserve(en.target);
    });
  }, { threshold: 0.16 });
  document.querySelectorAll(".reveal, .skill").forEach(function (el) { revealObs.observe(el); });

  /* ---------- Akordeon pengalaman ---------- */
  document.querySelectorAll(".exp").forEach(function (exp) {
    var head = exp.querySelector(".exp-head");
    head.addEventListener("click", function () {
      var open = exp.classList.toggle("open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- Modal detail keahlian ---------- */
  var MODALS = {
    visual: {
      title: "Kreator Visual",
      img: "assets/visual.jpg",
      alt: "Ilustrasi ruang kerja penyuntingan foto dan video",
      body: "<p>Berpengalaman sebagai editor foto/video dan kreator visual sejak SMK:</p><ul>" +
        "<li>Penyuntingan foto dengan <strong>Adobe Photoshop</strong> untuk berbagai kebutuhan konten.</li>" +
        "<li>Penyuntingan video dengan <strong>Adobe Premiere Pro</strong> — dari pemotongan hingga hasil akhir siap tayang.</li>" +
        "<li><strong>Fotografi</strong> sebagai fondasi komposisi dan rasa visual di setiap proyek.</li>" +
        "<li>Latar belakang Ilmu Komunikasi memperdalam pemahaman saya soal media massa, penyiaran, dan hubungan masyarakat.</li></ul>"
    },
    aidata: {
      title: "Annotator Data AI & Transkripsi",
      img: "assets/ai-data.jpg",
      alt: "Ilustrasi anotasi data AI dan transkripsi audio",
      body: "<p>Pekerja jarak jauh/lepas untuk <strong>Alignerr, CrowdGen, dan OneForma</strong> sejak Januari 2022 (20+ jam/minggu):</p><ul>" +
        "<li><strong>500+ audio</strong> berdurasi 15 menit selesai ditranskrip.</li>" +
        "<li>Rating kualitas <strong>97% Bahasa Indonesia</strong> dan <strong>88,37% Bahasa Inggris</strong>.</li>" +
        "<li>Pelabelan audio, evaluasi pengenalan ucapan (ASR), evaluasi linguistik, dan audit kualitas data pelatihan AI.</li>" +
        "<li>Perbaikan kesalahan segmentasi, penyelarasan fonetik, dan pemeriksaan konsistensi &amp; logika penalaran.</li></ul>"
    },
    web3: {
      title: "Otomatisasi & Pengujian Web3",
      img: "assets/web3.jpg",
      alt: "Ilustrasi otomatisasi alur kerja dan pengujian Web3",
      body: "<p>Mengubah pekerjaan berulang menjadi sistem yang berjalan sendiri:</p><ul>" +
        "<li>Mengembangkan <strong>skrip otomatisasi</strong> dan alur kerja untuk pengujian Web3.</li>" +
        "<li>Pengujian di <strong>jaringan uji (testnet) kontrak pintar</strong> dan <strong>verifikasi data otomatis</strong>.</li>" +
        "<li>Evaluasi keluaran AI dan pemeriksaan sistem untuk memastikan hasil yang konsisten.</li>" +
        "<li>Kombinasi ketelitian data dan pemahaman teknis — fondasi yang sama yang saya pakai di pekerjaan anotasi.</li></ul>"
    }
  };
  var backdrop = document.getElementById("modalBackdrop");
  var modalImg = document.getElementById("modalImg");
  var modalTitle = document.getElementById("modalTitle");
  var modalBody = document.getElementById("modalBody");
  var lastFocus = null;
  function openModal(key) {
    var d = MODALS[key];
    if (!d) return;
    lastFocus = document.activeElement;
    modalImg.src = d.img; modalImg.alt = d.alt;
    modalTitle.textContent = d.title;
    modalBody.innerHTML = d.body;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
  }
  function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll("[data-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () { openModal(btn.getAttribute("data-modal")); });
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !backdrop.hidden) closeModal(); });

  /* ---------- Salin email + toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }
  document.getElementById("copyEmail").addEventListener("click", function () {
    var email = "elgabifardikaelfanda@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { showToast("Email tersalin: " + email); },
        function () { showToast(email); }
      );
    } else { showToast(email); }
  });

  /* ---------- Tombol kembali ke atas ---------- */
  var toTop = document.getElementById("toTop");
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Efek tilt pada kartu (bisa di-klik & bergerak) ---------- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(800px) rotateY(" + (x * 6) + "deg) rotateX(" + (-y * 6) + "deg)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });

    /* Parallax bentuk Memphis di hero mengikuti mouse */
    var hero = document.querySelector(".hero");
    var layers = hero.querySelectorAll("[data-depth]");
    hero.addEventListener("mousemove", function (e) {
      var cx = e.clientX / window.innerWidth - 0.5;
      var cy = e.clientY / window.innerHeight - 0.5;
      layers.forEach(function (el) {
        var d = parseFloat(el.getAttribute("data-depth")) || 10;
        el.style.translate = (cx * d) + "px " + (cy * d) + "px";
      });
    });
  }

  /* ---------- Tahun otomatis ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
