const sidebar = document.querySelector('.sidebar');
const openButton = document.querySelector('.open-menu');
const closeButton = document.querySelector('.close-menu');
const backdrop = document.querySelector('.backdrop');
const mobile = matchMedia('(max-width: 700px)');
function setMenu(open) {
  sidebar.classList.toggle('is-open', open);
  openButton.setAttribute('aria-expanded', String(open));
  backdrop.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  sidebar.inert = mobile.matches && !open;
  if (open) closeButton.focus();
}
openButton.addEventListener('click', () => setMenu(true));
function closeMenu() { setMenu(false); openButton.focus(); }
closeButton.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (!sidebar.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeMenu();
  if (event.key === 'Tab') {
    const items = [...sidebar.querySelectorAll('a,button')];
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
mobile.addEventListener('change', () => setMenu(false));
setMenu(false);
document.querySelector('#year').textContent = new Date().getFullYear();
