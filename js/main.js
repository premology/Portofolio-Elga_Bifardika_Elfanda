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
  var rolesID = ["Editor Foto & Video", "Annotator Data AI", "Transcriber EN–ID", "Penguji Web3", "Fotografer"];
  var rolesEN = ["Photo & Video Editor", "AI Data Annotator", "EN–ID Transcriber", "Web3 Tester", "Photographer"];
  var roles = rolesID;
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
  var MODALS_EN = {
    visual: {
      title: "Visual Creator",
      img: "assets/visual.jpg",
      alt: "Illustration of a photo and video editing workspace",
      body: "<p>Experienced as a photo/video editor and visual creator since vocational school:</p><ul>" +
        "<li>Photo editing with <strong>Adobe Photoshop</strong> for various content needs.</li>" +
        "<li>Video editing with <strong>Adobe Premiere Pro</strong> — from cutting to the final publish-ready result.</li>" +
        "<li><strong>Photography</strong> as the foundation of composition and visual sense in every project.</li>" +
        "<li>A Communication Science background deepens my understanding of mass media, broadcasting, and public relations.</li></ul>"
    },
    aidata: {
      title: "AI Data Annotator & Transcription",
      img: "assets/ai-data.jpg",
      alt: "Illustration of AI data annotation and audio transcription",
      body: "<p>Remote/freelance worker for <strong>Alignerr, CrowdGen, and OneForma</strong> since January 2022 (20+ hours/week):</p><ul>" +
        "<li><strong>500+ audio files</strong> of 15 minutes each, fully transcribed.</li>" +
        "<li>Quality ratings of <strong>97% for Indonesian</strong> and <strong>88.37% for English</strong>.</li>" +
        "<li>Audio labeling, speech recognition (ASR) evaluation, linguistic evaluation, and quality audits of AI training data.</li>" +
        "<li>Segmentation error fixes, phonetic alignment, and consistency &amp; reasoning-logic checks.</li></ul>"
    },
    web3: {
      title: "Automation & Web3 Testing",
      img: "assets/web3.jpg",
      alt: "Illustration of workflow automation and Web3 testing",
      body: "<p>Turning repetitive work into systems that run themselves:</p><ul>" +
        "<li>Developing <strong>automation scripts</strong> and workflows for Web3 testing.</li>" +
        "<li>Testing on <strong>smart contract testnets</strong> and <strong>automated data verification</strong>.</li>" +
        "<li>AI output evaluation and system checks to ensure consistent results.</li>" +
        "<li>The same combination of data precision and technical understanding that I apply in my annotation work.</li></ul>"
    }
  };
  var currentLang = "id";
  var backdrop = document.getElementById("modalBackdrop");
  var modalImg = document.getElementById("modalImg");
  var modalTitle = document.getElementById("modalTitle");
  var modalBody = document.getElementById("modalBody");
  var lastFocus = null;
  function openModal(key) {
    var d = currentLang === "en" && MODALS_EN[key] ? MODALS_EN[key] : MODALS[key];
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
        function () { showToast((currentLang === "en" ? "Email copied: " : "Email tersalin: ") + email); },
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

  /* ---------- Ganti bahasa ID / EN ---------- */
  var I18N_EN = {
    "nav_about": "About",
    "nav_expertise": "Expertise",
    "nav_skills": "Skills",
    "nav_experience": "Experience",
    "nav_education": "Education",
    "contact_me": "Contact Me",
    "hero_badge": "Bogor, West Java · Open to remote projects",
    "hero_hello": "Hello, I'm Elga <span class=\"wave\" aria-hidden=\"true\">👋</span>",
    "hero_iam": "I am a",
    "hero_desc": "Photo/video editor and visual creator since vocational school, as well as an AI Data Annotator &amp; Transcriber for global platforms with 500+ completed audio files and a 97% quality rating (Indonesian). I am a fast learner who enjoys mastering new things — proven by my work in sales and hospitality, fields outside my main expertise that I took on and mastered through a willingness to keep learning. Detail-oriented, disciplined, and accustomed to working independently or collaboratively.",
    "download_cv": "Download CV",
    "sticker_a": "Top 5 in Sales",
    "sticker_b": "97% Rating",
    "marquee": "Adobe Photoshop ✦ Premiere Pro ✦ Photography ✦ Audio Transcription ✦ AI Data Annotation ✦ ASR Evaluation ✦ Linguistic QA ✦ Automation ✦ Web3 Testing ✦ Internet Research ✦ ",
    "about_title": "<span class=\"title-chip chip-coral\">01</span> About Me",
    "about_p1": "I am <strong>Elga Bifardika Elfanda</strong>, a photo/video editor and visual creator with experience since vocational school. My main expertise lies in <strong>Adobe Photoshop</strong>, <strong>Premiere Pro</strong>, and photography — combined with experience as an <strong>AI Data Annotator and Transcriber</strong> on global platforms such as Alignerr, CrowdGen, and OneForma.",
    "about_p2": "In the data world, I have completed <strong>500+ audio files</strong> with quality ratings of <strong>97% for Indonesian</strong> and <strong>88.37% for English</strong>, and I develop automation scripts for Web3 testing. My background in sales (top five within two months) and hospitality has sharpened my client communication and work discipline.",
    "about_p3": "I am accustomed to working independently as well as collaboratively, both in the field and at the computer.",
    "stat_1": "Audio files transcribed",
    "stat_2": "Indonesian quality rating",
    "stat_3": "English quality rating",
    "stat_4": "Hours/week on AI projects",
    "expertise_title": "<span class=\"title-chip chip-teal\">02</span> What I Do",
    "expertise_sub": "Click each card to see the details.",
    "card1_title": "Visual Creator",
    "card1_text": "Photo &amp; video editing and photography since vocational school — neat, sharp content that is ready to publish.",
    "card1_chips": "<span>Photoshop</span><span>Premiere Pro</span><span>Photography</span>",
    "card2_title": "AI Data Annotator &amp; Transcription",
    "card2_text": "Transcription, audio labeling, and AI training data evaluation for global platforms.",
    "card2_chips": "<span>Transcription</span><span>Audio Labeling</span><span>ASR Evaluation</span><span>Linguistic QA</span>",
    "card3_title": "Automation &amp; Web3 Testing",
    "card3_text": "Workflow automation scripts, smart contract testnet testing, and automated data verification.",
    "card3_chips": "<span>Scripts</span><span>Testnet</span><span>Data Verification</span><span>AI Evaluation</span>",
    "see_details": "See details →",
    "skills_title": "<span class=\"title-chip chip-yellow\">03</span> Skills",
    "skill_id_trans": "Indonesian Transcription",
    "skill_en_trans": "English Transcription",
    "skill_annot": "Data Annotation &amp; QA",
    "skill_photo": "Photography",
    "skill_auto": "Automation &amp; Script Writing",
    "skill_web3": "Web3 &amp; Blockchain Testing",
    "work_title": "<span class=\"title-chip chip-purple\">04</span> Work Experience",
    "work_sub": "Click each experience to expand the details.",
    "job1_title": "AI Data Annotator, Transcription &amp; Technical Operations",
    "job1_where": "Alignerr · CrowdGen · OneForma — Remote / Freelance",
    "job1_period": "Jan 2022 — Present",
    "job1_b1": "Contributed to various remote AI and digital technology projects (20+ hours/week) in audio transcription, speech recognition, and technical evaluation.",
    "job1_b2": "Completed 500+ audio recordings of 15 minutes each with a quality rating of 97% for Indonesian and 88.37% for English.",
    "job1_b3": "Developed automation scripts and workflows for Web3 testing, including smart contract test networks and automated data verification.",
    "job1_b4": "Performed transcription, audio labeling, linguistic evaluation, quality audits, and consistency checks on AI training data — including segmentation error fixes, phonetic alignment, and reasoning logic.",
    "job2_title": "Sales Staff",
    "job2_where": "PT World Innovative Telecommunication — OPPO Products",
    "job2_period": "Dec 2017 — May 2018",
    "job2_b1": "Served customers in store, provided OPPO product consultations based on needs and budget, and handled questions and complaints in a solution-oriented manner.",
    "job2_b2": "Improved sales performance to the top five within two months through adaptation and refinement of sales approaches.",
    "job3_title": "Room Attendant",
    "job3_b1": "Cleaned and arranged rooms in accordance with hotel cleanliness and comfort standards, checked the completeness of facilities, and followed up on guest requests.",
    "job3_b2": "Managed working time effectively in daily hotel operations.",
    "edu_title": "<span class=\"title-chip chip-pink\">05</span> Education",
    "edu_degree": "Bachelor of Communication Science (S.I.Kom)",
    "edu_school": "Pakuan University, Bogor · 2018 — 2023",
    "edu_courses": "Relevant coursework:",
    "edu_chips": "<span>Broadcasting</span><span>Mass Media</span><span>Photography</span><span>Video Editing</span><span>Digital Media Information</span><span>Public Relations</span>",
    "contact_title": "I'M READY TO JOIN",
    "contact_text": "Discipline, attention to detail, and responsibility are how I work — backed by experience in visual editing, transcription, and data annotation. I am currently looking for job opportunities in my beloved country, Indonesia, and I am ready to join as soon as possible. Contact me via email or WhatsApp below.",
    "btn_email": "Send Email",
    "btn_copy": "Copy Email",
    "contact_meta": "+62 878 3706 6790 · Bogor, West Java, Indonesia",
    "footer_made": "Created by",
    "toast_copied": "Email copied!"
  };
  var TITLE_ID = document.title;
  var TITLE_EN = "Elga Bifardika Elfanda — Visual Editor & AI Data Annotator";
  var langNodes = document.querySelectorAll("[data-i18n]");
  langNodes.forEach(function (el) { el.dataset.idHtml = el.innerHTML; });
  var cvDownload = document.getElementById("cvDownload");
  function setLang(lang) {
    currentLang = lang;
    langNodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.innerHTML = lang === "en" && I18N_EN[key] ? I18N_EN[key] : el.dataset.idHtml;
    });
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    document.documentElement.lang = lang;
    document.title = lang === "en" ? TITLE_EN : TITLE_ID;
    roles = lang === "en" ? rolesEN : rolesID;
    ri = 0; ci = 0; deleting = false;
    if (cvDownload) {
      cvDownload.setAttribute("href", lang === "en"
        ? "assets/CV_Elga_Bifardika_Elfanda_EN.pdf"
        : "assets/CV_Elga_Bifardika_Elfanda.pdf");
    }
    try { localStorage.setItem("elga-lang", lang); } catch (e) {}
  }
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  var savedLang = "id";
  try { savedLang = localStorage.getItem("elga-lang") || "id"; } catch (e) {}
  if (savedLang === "en") setLang("en");

  /* ---------- Tahun otomatis ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
