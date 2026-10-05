const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-navigation');
const waitlistForm = document.querySelector('.waitlist-form');
const formNote = document.querySelector('[data-form-note]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

waitlistForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(waitlistForm);
  const email = String(formData.get('email') || '').trim();

  if (!email) {
    return;
  }

  formNote.textContent = `Thanks — ${email} is on the TeleZyra early access list.`;
  waitlistForm.reset();
});
