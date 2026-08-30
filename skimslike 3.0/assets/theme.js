document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-collection-filters]').forEach((form) => {
    form.addEventListener('change', (event) => {
      if (event.target.matches('select, input[type="checkbox"]')) form.submit();
    });
  });

  const wishlistKey = 'skimslike-wishlist';
  let wishlist = [];
  try { wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]'); } catch (error) { wishlist = []; }
  document.querySelectorAll('[data-wishlist-button]').forEach((button) => {
    const handle = button.dataset.productHandle;
    const updateButton = () => button.setAttribute('aria-pressed', String(wishlist.includes(handle)));
    updateButton();
    button.addEventListener('click', () => {
      wishlist = wishlist.includes(handle) ? wishlist.filter((item) => item !== handle) : [...wishlist, handle];
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      updateButton();
    });
  });

  document.querySelectorAll('[data-recently-track]').forEach((track) => {
    const section = track.closest('.recently-viewed');
    const scrollTrack = (direction) => track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
    section.querySelector('[data-recently-previous]')?.addEventListener('click', () => scrollTrack(-1));
    section.querySelector('[data-recently-next]')?.addEventListener('click', () => scrollTrack(1));
  });

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-product-section]').forEach((section) => {
    const variantData = section.querySelector('[data-product-variants]');
    const variantInput = section.querySelector('[data-variant-id]');
    const addButton = section.querySelector('[data-add-to-cart]');
    if (!variantData || !variantInput || !addButton) return;

    const variants = JSON.parse(variantData.textContent);
    section.addEventListener('change', (event) => {
      if (!event.target.matches('[data-option-position]')) return;
      const optionLabel = section.querySelector('[data-option-label-position="' + event.target.dataset.optionPosition + '"]');
      if (optionLabel) optionLabel.textContent = event.target.value;

      const selected = Array.from(section.querySelectorAll('[data-option-position]:checked')).map((input) => input.value);
      const variant = variants.find((item) => item.options.every((option, index) => option === selected[index]));
      if (!variant) return;
      variantInput.value = variant.id;
      addButton.disabled = !variant.available;
      addButton.textContent = variant.available ? 'Add to bag' : 'Sold out';
    });
  });
});
