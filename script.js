/* ============================================================
   SCRIPT WEBSITE ULANG TAHUN 🧡
   Ganti seluruh isi file script.js dengan kode ini.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. REVEAL SAAT SCROLL
     ========================================================== */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback browser lama: langsung tampilkan semua
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ==========================================================
     2. TAHUN OTOMATIS DI FOOTER
     ========================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================
     3. TOMBOL KIRIM HATI + BURST ANIMATION
     ========================================================== */
  const heartBtn = document.getElementById('heartBtn');
  const heartMsg = document.getElementById('heartMsg');

  const heartMessages = [
    'Aku sayang kamu, selalu 🧡',
    'Semoga harimu sehangat senyummu 🍊',
    'Kamu spesial, jangan lupa itu ✨',
    'Terima kasih sudah ada 🧡',
    'Selamat ulang tahun, sayangku 🎂',
  ];

  let heartIndex = 0;

  if (heartBtn && heartMsg) {
    heartBtn.addEventListener('click', () => {
      // Ganti pesan bergiliran
      heartMsg.textContent = heartMessages[heartIndex % heartMessages.length];
      heartIndex++;
      heartMsg.classList.add('show');

      // Efek burst hati
      const rect = heartBtn.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        const heart = document.createElement('span');
        heart.textContent = '🧡';
        heart.className = 'burst-heart';
        heart.style.left =
          rect.left + rect.width / 2 + (Math.random() * 60 - 30) + 'px';
        heart.style.top = rect.top + 'px';
        heart.style.animationDelay = i * 0.08 + 's';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1400);
      }
    });
  }

  /* ==========================================================
     4. MUSIK LATAR
     ========================================================== */
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');

  if (bgMusic && musicBtn) {
    const musicText = musicBtn.querySelector('.music-text');
    let isPlaying = false;

    // --- Log saat metadata lagu berhasil dimuat ---
    bgMusic.addEventListener('loadedmetadata', () => {
      console.log(
        '✅ Lagu berhasil dimuat. Durasi:',
        bgMusic.duration.toFixed(2),
        'detik'
      );
    });

    // --- Log saat file gagal dimuat ---
    bgMusic.addEventListener('error', () => {
      console.error(
        '❌ Gagal memuat lagu. Cek: nama file "lagu.mp3", lokasi folder, dan format MP3.'
      );
      if (musicText) musicText.textContent = 'Lagu gagal dimuat';
      setTimeout(() => {
        if (musicText) musicText.textContent = 'Putar Lagu';
      }, 3000);
    });

    // --- Tombol play / pause ---
    musicBtn.addEventListener('click', async () => {
      try {
        if (!isPlaying) {
          bgMusic.volume = 0.7; // volume 0–1, atur sesuai selera
          await bgMusic.play();
          isPlaying = true;
          musicBtn.classList.add('playing');
          if (musicText) musicText.textContent = 'Jeda Lagu';
          musicBtn.setAttribute('aria-label', 'Jeda musik');
          console.log('▶️ Lagu diputar.');
        } else {
          bgMusic.pause();
          isPlaying = false;
          musicBtn.classList.remove('playing');
          if (musicText) musicText.textContent = 'Putar Lagu';
          musicBtn.setAttribute('aria-label', 'Putar musik');
          console.log('⏸️ Lagu dijeda.');
        }
      } catch (err) {
        console.error('❌ Error saat play:', err.name, '-', err.message);
        if (musicText) musicText.textContent = 'Gagal memutar';
        setTimeout(() => {
          if (musicText) musicText.textContent = 'Putar Lagu';
        }, 2500);
      }
    });

    // --- Sinkronisasi saat lagu dijeda dari luar (misal tab pindah) ---
    bgMusic.addEventListener('pause', () => {
      isPlaying = false;
      musicBtn.classList.remove('playing');
      if (musicText) musicText.textContent = 'Putar Lagu';
    });

    // --- Sinkronisasi saat lagu main lagi ---
    bgMusic.addEventListener('play', () => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      if (musicText) musicText.textContent = 'Jeda Lagu';
    });
  }

});