(function(){
    emailjs.init("8OK8I4vLMfwyqKm35");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    emailjs.sendForm('service_qidn36v', 'template_gn2yoeg', this)
      .then(function() {
        alert('Wiadomość wysłana! Dziękujemy za kontakt.');
        document.getElementById('contact-form').reset();
      }, function(error) {
        alert('Błąd: ' + JSON.stringify(error));
      });
});

// ------------------ Language switcher ------------------
const translations = {
  pl: {
    'about-title': 'O nas',
    'about-text': 'TRANsporty to firma specjalizująca się w krajowym i międzynarodowym transporcie towarów. Zapewniamy szybkie, bezpieczne i terminowe dostawy.',
  },
  en: {
    'about-title': 'About Us',
    'about-text': 'TRANsporty is a company specializing in national and international freight transport. We ensure fast, safe, and timely deliveries.',
  },
  nl: {
    'about-title': 'Over ons',
    'about-text': 'TRANsporty is een bedrijf dat gespecialiseerd is in nationaal en internationaal goederenvervoer. Wij zorgen voor snelle, veilige en tijdige leveringen.',
  }
};

function applyLanguage(lang) {
  const texts = translations[lang];
  for (const id in texts) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = texts[id];
      } else {
        el.innerText = texts[id];
      }
    }
  }
  localStorage.setItem('preferredLang', lang);
}

document.querySelectorAll('#language-switcher img').forEach(img => {
  img.addEventListener('click', () => {
    const lang = img.dataset.lang;
    applyLanguage(lang);
  });
});

// ------------------ Full-page Scroll ------------------

function switchSection() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY || window.pageYOffset;

  let currentSection = null;
  
  // Sprawdzamy, która sekcja jest najbardziej widoczna
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom > window.innerHeight / 2) {
      currentSection = section;
    }
  });

  // Jeśli mamy sekcję, która jest widoczna, dodajemy klasę active
  if (currentSection) {
    sections.forEach(section => section.classList.remove('active'));
    currentSection.classList.add('active');
  }
}

// Nasłuchujemy scrolla, aby przełączać sekcje
window.addEventListener('scroll', switchSection);

// Zainicjuj przełączanie sekcji po załadowaniu strony
window.addEventListener('DOMContentLoaded', switchSection);

// ------------------ Smooth Scroll ------------------

function smoothScroll(target) {
  const targetElement = document.querySelector(target);
  window.scrollTo({
    top: targetElement.offsetTop - 50, // Zmniejsz offset, żeby sekcja nie była przyklejona do góry
    behavior: 'smooth'
  });
}

// Zmieniamy linki w nawigacji na płynne przewijanie
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault(); // Anuluj domyślną akcję (przechodzenie do linku)
    smoothScroll(this.getAttribute('href')); // Przewiń do docelowej sekcji
  });
});
