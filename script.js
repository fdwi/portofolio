/**
 * Dwi Febriyanto - Portfolio Application Script
 * Vanilla JavaScript (ES6+), Accessible & Performance Focused
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHING (LIGHT / DARK)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const storageKey = 'df_portfolio_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-label', 'Beralih ke mode terang');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-label', 'Beralih ke mode gelap');
    }
    localStorage.setItem(storageKey, theme);
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(forceClose = false) {
    if (!mobileMenu || !mobileMenuBtn) return;
    const isCurrentlyOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    mobileMenuBtn.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) {
      mobileMenu.removeAttribute('hidden');
    } else {
      mobileMenu.setAttribute('hidden', '');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      toggleMobileMenu();
    });
  }

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMobileMenu(true);
    });
  });

  /* ==========================================================================
     3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
     ========================================================================== */
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const observedSections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && observedSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    observedSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ==========================================================================
     4. INTERACTIVE SENSOR & RELAY SIMULATOR (HERO)
     ========================================================================== */
  const tempValueEl = document.getElementById('tempValue');
  const humidityValueEl = document.getElementById('humidityValue');
  const relayBtn = document.getElementById('relayBtn');

  if (tempValueEl && humidityValueEl) {
    setInterval(function () {
      // Small realistic fluctuations
      const baseTemp = 28.0;
      const baseHumidity = 65;
      const tempDelta = (Math.random() * 1.2 - 0.6).toFixed(1);
      const humidityDelta = Math.floor(Math.random() * 5 - 2);

      tempValueEl.textContent = (baseTemp + parseFloat(tempDelta)).toFixed(1);
      humidityValueEl.textContent = String(baseHumidity + humidityDelta);
    }, 3000);
  }

  if (relayBtn) {
    relayBtn.addEventListener('click', function () {
      const isPressed = relayBtn.getAttribute('aria-pressed') === 'true';
      const newState = !isPressed;
      relayBtn.setAttribute('aria-pressed', String(newState));
      
      if (newState) {
        relayBtn.classList.add('is-active');
        relayBtn.textContent = 'Status: Aktif (Menyala)';
      } else {
        relayBtn.classList.remove('is-active');
        relayBtn.textContent = 'Status: Non-Aktif';
      }
    });
  }

  /* ==========================================================================
     5. PROJECT FILTERING SYSTEM
     ========================================================================== */
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');
  const filterEmptyState = document.getElementById('filterEmptyState');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  function filterProjects(category) {
    let visibleCount = 0;

    projectCards.forEach(function (card) {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    filterChips.forEach(function (chip) {
      const chipFilter = chip.getAttribute('data-filter');
      if (chipFilter === category) {
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
      } else {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      }
    });

    if (filterEmptyState) {
      if (visibleCount === 0) {
        filterEmptyState.removeAttribute('hidden');
      } else {
        filterEmptyState.setAttribute('hidden', '');
      }
    }
  }

  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const selectedFilter = chip.getAttribute('data-filter');
      filterProjects(selectedFilter);
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', function () {
      filterProjects('all');
    });
  }

  /* ==========================================================================
     6. PROJECT CASE STUDY MODAL SYSTEM
     ========================================================================== */
  const projectsData = {
    p1: {
      category: 'IoT & Web Development',
      year: 'Prototipe',
      title: 'SmartWaste: Sistem Monitoring Volume Sampah',
      problem: 'Tempat sampah umum sering kali meluap tanpa disadari oleh petugas kebersihan, mengakibatkan tumpukan sampah yang tidak higienis dan jadwal penjemputan yang tidak efisien.',
      solution: 'Mengembangkan prototipe tempat sampah cerdas berbasis ESP32 dan sensor ultrasonik HC-SR04 untuk mengukur ketinggian volume sampah. Data dikirimkan secara nirkabel dan divisualisasikan pada aplikasi mobile Flutter.',
      techStack: ['ESP32', 'HC-SR04', 'Flutter', 'HTTP REST API', 'Firebase / Backend'],
      impact: 'Petugas dapat memantau tingkat keterisian tempat sampah secara jarak jauh dan menentukan rute penjemputan prioritas sebelum kapasitas penuh.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p2: {
      category: 'Web Development',
      year: 'Aplikasi',
      title: 'Nabang: Aplikasi Tabungan Digital',
      problem: 'Banyak individu kesulitan mengelola dan melacak progres tabungan untuk berbagai pos impian secara konsisten tanpa pencatatan otomatis yang terpusat.',
      solution: 'Membangun aplikasi web single-page menggunakan React dengan integrasi backend Supabase (PostgreSQL, Row-Level Security, Auth). Dilengkapi fitur kalkulasi target tabungan berkala dan visualisasi progres tabungan.',
      techStack: ['React', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'State Management'],
      impact: 'Mempermudah pengguna membuat pos tabungan terpisah, memantau riwayat penyetoran, dan menjaga komitmen target keuangan.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p3: {
      category: 'Web Development',
      year: 'Sesuai Implementasi',
      title: 'L-Dry: Sistem Informasi Laundry',
      problem: 'Operasional bisnis penatu (laundry) konvensional rawan terjadi kekeliruan pencatatan nota, tertukarnya pakaian, serta kesulitan melacak antrean cucian.',
      solution: 'Mengembangkan sistem informasi terintegrasi dengan kerangka kerja Laravel dan Tailwind CSS. Menyediakan pencatatan nota digital, pemilahan paket layanan (kiloan/satuan), estimasi waktu selesai, dan cetak invoice.',
      techStack: ['Laravel', 'Tailwind CSS', 'MySQL', 'Blade Engine', 'Invoice Generator'],
      impact: 'Meningkatkan efisiensi kerja kasir, transparansi status pengerjaan pakaian bagi pelanggan, serta kemudahan rekap pendapatan harian dan bulanan.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p4: {
      category: 'Web Development',
      year: 'Proyek',
      title: 'Website Undangan Digital Interaktif',
      problem: 'Undangan cetak membutuhkan biaya produksi tinggi dan tidak dapat memperbarui rincian acara secara dinamis atau mengonfirmasi kehadiran tamu secara otomatis.',
      solution: 'Membuat website undangan digital interaktif murni menggunakan HTML, CSS, JavaScript dengan database Supabase untuk buku tamu dan RSVP. Menghadirkan animasi buka amplop, pemutar musik latar, hitung mundur hari H, dan integrasi Google Maps.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'Responsive Design'],
      impact: 'Memfasilitasi penyebaran undangan ke ratusan tamu secara instan, lengkap dengan ucapan doa real-time yang tersimpan rapi.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p5: {
      category: 'IoT & Web Development',
      year: 'Prototipe',
      title: 'Sistem Antrian Digital Terkoneksi',
      problem: 'Penumpukan kerumunan antrean di loket layanan publik tanpa adanya indikasi nomor berjalan yang dapat dilihat secara jelas dan terpantau.',
      solution: 'Mengintegrasikan modul mikrokontroler ESP8266 dengan web server lokal ringan dan antarmuka web HTML/CSS/JS. Petugas memanggil nomor antrean melalui panel kendali web, dan nomor terpanggil otomatis muncul di layar utama display.',
      techStack: ['ESP8266', 'HTML5', 'CSS3', 'JavaScript', 'WebSockets / AJAX'],
      impact: 'Menghadirkan alur pelayanan tertib, meminimalisir salah panggil, dan dapat dioperasikan secara lokal tanpa koneksi internet luar.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p6: {
      category: 'IoT & Embedded Systems',
      year: 'Prototipe',
      title: 'Bank Sampah Digital Berbasis Mikrokontroler',
      problem: 'Pencatatan setoran sampah daur ulang secara manual sering kali lambat dan rawan ketidaksesuaian timbangan dengan data pembukuan.',
      solution: 'Merancang alat ukur timbangan digital mandiri berbasis Arduino Uno dan layar display karakter LCD 16x2. Alat menampilkan berat material seketika dan mengalkulasikan nominal reward yang berhak diterima nasabah.',
      techStack: ['Arduino Uno', 'LCD 16x2', 'Load Cell Sensor', 'HX711 Module', 'C++'],
      impact: 'Memberikan transparansi bobot timbangan langsung di hadapan nasabah bank sampah dan mempercepat proses penerimaan sampah.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p7: {
      category: 'IoT & Embedded Systems',
      year: 'Prototipe',
      title: 'Stasiun Monitoring Suhu dan Kelembapan',
      problem: 'Kondisi mikroklimat ruang khusus seperti ruang server atau penyimpanan bahan sensitif memerlukan pengawasan kontinu untuk mencegah kerusakan akibat panas berlebih atau kelembapan ekstrem.',
      solution: 'Membangun stasiun telemetri menggunakan mikrokontroler ESP32 dan sensor digital DHT11. ESP32 menjalankan web server internal yang menyajikan pembacaan suhu dan kelembapan secara live dalam format antarmuka web.',
      techStack: ['ESP32', 'DHT11', 'Embedded C++', 'HTTP Web Server', 'JSON'],
      impact: 'Memungkinkan staf teknis memantau status mikroklimat secara langsung melalui browser perangkat apa pun di jaringan lokal.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p8: {
      category: 'Web Development',
      year: 'Proyek',
      title: 'Website Pemesanan Kuliner Bakso Online',
      problem: 'Gerai kuliner lokal membutuhkan sistem pemesanan online mandiri untuk mengurangi antrean di kasir saat jam sibuk makan siang.',
      solution: 'Membangun aplikasi pemesanan web berbasis React dengan interaksi keranjang belanja cepat, pemilihan variasi item (mie, kuah, gorengan), dan ringkasan pesanan yang siap diteruskan ke WhatsApp kasir.',
      techStack: ['React', 'JavaScript ES6', 'State Management', 'CSS Modules'],
      impact: 'Mempercepat alur pesan-antar makanan dan memberikan pengalaman pemilihan menu yang menyenangkan bagi pembeli.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p9: {
      category: 'Web Development',
      year: 'Proyek',
      title: 'Website Penjualan Tiket Konser Musik',
      problem: 'Penjualan tiket pertunjukan musik rawan calo dan tiket ganda jika tidak memiliki mekanisme kuota dan nomor tiket unik yang terkelola.',
      solution: 'Mengembangkan portal reservasi tiket berbasis framework Laravel dan database MySQL. Dilengkapi validasi stok per kategori tribun/festival, pembuatan invoice transaksi, dan generator kode tiket unik berformat alphanumeric.',
      techStack: ['Laravel', 'MySQL', 'Bootstrap / Tailwind', 'Blade Template Engine'],
      impact: 'Memastikan integritas alokasi tiket, rekapitulasi data calon penonton, dan memudahkan verifikasi tiket di pintu masuk acara.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p10: {
      category: 'UI/UX Design',
      year: 'Desain',
      title: 'UI/UX Design: Portal Media Harian Disway',
      problem: 'Antarmuka portal berita digital sering kali dipenuhi banner yang berantakan, tata letak teks yang sempit, dan navigasi kategori yang sulit ditemukan pembaca.',
      solution: 'Merancang tata letak baru di Figma dengan prinsip editorial modern: tipografi berjarak baca optimal, penataan artikel utama bergaya grid majalah, dan navigasi bilah pencarian berita yang responsif.',
      techStack: ['Figma', 'Editorial Layout', 'Information Architecture', 'Interactive Prototyping'],
      impact: 'Menciptakan alur baca yang bersih, minim distraksi, dan memudahkan pembaca menemukan rubrik editorial favorit.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p11: {
      category: 'Graphic Design',
      year: 'Desain',
      title: 'Desain Jaket Angkatan Sistem Informasi',
      problem: 'Komunitas mahasiswa membutuhkan busana identitas angkatan yang mencerminkan karakter teknologi modern namun tetap nyaman dan estetis dikenakan di ruang kuliah.',
      solution: 'Melakukan eksplorasi konsep apparel di Figma, memadukan elemen geometri minimalis, penempatan emblem bordir presisi, skema warna gelap beraksen kontras, serta mockup 3 dimensi visualisasi tampak depan, samping, dan belakang.',
      techStack: ['Figma', 'Apparel Design', 'Color Harmony', 'Vector Graphics'],
      impact: 'Menghasilkan rancangan produksi busana yang disepakati bersama oleh angkatan dan siap diproduksi oleh konveksi garmen.',
      repoUrl: 'https://github.com/fdwi691'
    },
    p12: {
      category: 'Graphic Design',
      year: 'Desain',
      title: 'Koleksi Desain Poster & Publikasi Kreatif',
      problem: 'Publikasi visual acara sering kali gagal menarik audiens karena teks terlalu padat dan kontras warna yang tidak proporsional.',
      solution: 'Menyusun rangkaian desain poster promosi dan infografis menggunakan Adobe Photoshop dan Canva dengan penekanan pada prinsip focal point, hierarki ukuran teks headline, serta palet warna yang memikat mata.',
      techStack: ['Photoshop', 'Canva', 'Visual Hierarchy', 'Typography & Composition'],
      impact: 'Meningkatkan keterlibatan audiens terhadap publikasi informasi acara dan memperkuat citra profesional acara yang diselenggarakan.',
      repoUrl: 'https://github.com/fdwi691'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalImpact = document.getElementById('modalImpact');
  const modalActionLink = document.getElementById('modalActionLink');

  let lastFocusedElement = null;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    lastFocusedElement = document.activeElement;

    modalCategory.textContent = data.category;
    modalYear.textContent = data.year;
    modalTitle.textContent = data.title;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalImpact.textContent = data.impact;
    modalActionLink.setAttribute('href', data.repoUrl);

    modalTechStack.innerHTML = '';
    data.techStack.forEach(function (tech) {
      const span = document.createElement('span');
      span.className = 'tech-pill';
      span.textContent = tech;
      modalTechStack.appendChild(span);
    });

    projectModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(function () {
      if (closeModalBtn) closeModalBtn.focus();
    }, 50);
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.setAttribute('hidden', '');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  openModalButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', function (e) {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // Keyboard Escape Handler for Modal
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (projectModal && !projectModal.hasAttribute('hidden')) {
        closeModal();
      }
    }
  });

  /* ==========================================================================
     7. CONTACT FORM VALIDATION & HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const projectScope = document.getElementById('projectScope');
  const senderMessage = document.getElementById('senderMessage');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Reset errors
      if (nameError) nameError.setAttribute('hidden', '');
      if (emailError) emailError.setAttribute('hidden', '');
      if (messageError) messageError.setAttribute('hidden', '');
      if (formSuccess) formSuccess.setAttribute('hidden', '');
      if (formError) formError.setAttribute('hidden', '');

      senderName.classList.remove('is-invalid');
      senderEmail.classList.remove('is-invalid');
      senderMessage.classList.remove('is-invalid');

      // Validate Name
      if (!senderName.value.trim()) {
        senderName.classList.add('is-invalid');
        if (nameError) nameError.removeAttribute('hidden');
        isValid = false;
      }

      // Validate Email
      if (!senderEmail.value.trim() || !validateEmail(senderEmail.value.trim())) {
        senderEmail.classList.add('is-invalid');
        if (emailError) emailError.removeAttribute('hidden');
        isValid = false;
      }

      // Validate Message
      if (!senderMessage.value.trim() || senderMessage.value.trim().length < 10) {
        senderMessage.classList.add('is-invalid');
        if (messageError) messageError.removeAttribute('hidden');
        isValid = false;
      }

      if (!isValid) {
        if (formError) formError.removeAttribute('hidden');
        return;
      }

      // Submission feedback state
      const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Menyiapkan Pesan...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalBtnText;

        if (formSuccess) formSuccess.removeAttribute('hidden');

        // Prepare mailto link with encoded parameters
        const recipient = 'fdwi691@gmail.com';
        const subject = encodeURIComponent('Pesan Portofolio: ' + projectScope.options[projectScope.selectedIndex].text + ' dari ' + senderName.value.trim());
        const body = encodeURIComponent('Nama: ' + senderName.value.trim() + '\nEmail: ' + senderEmail.value.trim() + '\nPeminatan: ' + projectScope.value + '\n\nPesan:\n' + senderMessage.value.trim());
        
        window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;

        // Reset inputs
        contactForm.reset();
      }, 700);
    });

    // Real-time error removal on input
    senderName.addEventListener('input', function () {
      if (senderName.value.trim()) {
        senderName.classList.remove('is-invalid');
        if (nameError) nameError.setAttribute('hidden', '');
      }
    });

    senderEmail.addEventListener('input', function () {
      if (validateEmail(senderEmail.value.trim())) {
        senderEmail.classList.remove('is-invalid');
        if (emailError) emailError.setAttribute('hidden', '');
      }
    });

    senderMessage.addEventListener('input', function () {
      if (senderMessage.value.trim().length >= 10) {
        senderMessage.classList.remove('is-invalid');
        if (messageError) messageError.setAttribute('hidden', '');
      }
    });
  }
})();
