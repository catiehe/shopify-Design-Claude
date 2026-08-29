document.addEventListener('DOMContentLoaded', () => {
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
