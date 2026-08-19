function getImageNumberFromPath(path) {
  const fileName = path.split('/').pop().replace(/\.[^/.]+$/, '');
  const numbers = fileName.match(/\d+/g);

  if (!numbers || numbers.length === 0) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Number(numbers[numbers.length - 1]);
}

function sortCategoryImages(images) {
  return [...new Set(images)].sort((a, b) => {
    const diff = getImageNumberFromPath(a) - getImageNumberFromPath(b);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

function buildCategoryImagesFromProducts() {
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const categories = {};

  products.forEach((product) => {
    const key = String(product.category || 'general').trim().toLowerCase();
    if (!key) return;

    if (!categories[key]) {
      categories[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        folder: `images/${key}`,
        images: []
      };
    }

    const images = Array.isArray(product.images) ? product.images : [];
    categories[key].images.push(...images);
  });

  Object.keys(categories).forEach((key) => {
    categories[key].images = sortCategoryImages(categories[key].images);
  });

  return categories;
}

function refreshCategoryImages() {
  const built = buildCategoryImagesFromProducts();
  window.CATEGORY_IMAGES = built;
  return built;
}

const CATEGORY_IMAGES = refreshCategoryImages();
window.refreshCategoryImages = refreshCategoryImages;

function getActiveCategory() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('cat');
  if (CATEGORY_IMAGES[requested]) return requested;

  const pageName = window.location.pathname.split('/').pop().replace(/\.html$/i, '');
  if (CATEGORY_IMAGES[pageName]) return pageName;

  const firstCategory = Object.keys(CATEGORY_IMAGES)[0] || 'homme';
  return firstCategory;
}

function renderCategoryStories(category) {
  const strip = document.getElementById('category-story-strip');
  if (!strip) return;

  const tiles = (category.images || []).slice(0, 7).map((src, index) => `
    <div class="story-pill" title="${category.label} ${index + 1}">
      <div class="story-ring">
        <img src="${src}" alt="${category.label} ${index + 1}" loading="lazy">
      </div>
      <span>${index === 0 ? 'La sélection' : category.label}</span>
    </div>
  `).join('');

  strip.innerHTML = tiles;
}

function bindCategoryProductActions() {
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const product = (window.PRODUCTS || []).find((p) => p.id === id);
      if (product) Cart.add(product, 1);
    });
  });

  document.querySelectorAll('.buy-now').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const product = (window.PRODUCTS || []).find((p) => p.id === id);
      if (product && typeof openDirectBuy === 'function') {
        openDirectBuy(product);
      }
    });
  });
}

function renderCategoryGallery() {
  const el = document.getElementById('category-gallery');
  if (!el) return;

  const activeCategory = getActiveCategory();
  const category = CATEGORY_IMAGES[activeCategory];
  const products = (window.PRODUCTS || []).filter((p) => String(p.category || '').toLowerCase() === String(activeCategory || '').toLowerCase());

  if (!category) return;

  const titleEl = document.getElementById('category-title');
  if (titleEl) titleEl.textContent = category.label;

  const countEl = document.getElementById('category-count');
  if (countEl) countEl.textContent = `${products.length || (category.images || []).length} produits · Collection ${category.label}`;

  renderCategoryStories(category);

  if (products.length) {
    el.innerHTML = products.map((product) => {
      const firstImage = product.images && product.images[0] ? product.images[0] : 'images/logo.jpg';
      return `
        <article class="product-card bg-white rounded overflow-hidden">
          <a href="produit.html?id=${product.id}"><img src="${firstImage}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='images/logo.jpg';"></a>
          <div class="product-body">
            <h3 class="product-title">${product.name}</h3>
            <div class="mt-2">
              ${product.oldPrice ? `<span class="text-muted text-decoration-line-through me-2">${formatPrice(product.oldPrice)}</span>` : ''}
              <span class="product-price">${formatPrice(product.price)}</span>
            </div>
            <div class="product-actions mt-3 d-flex align-items-center justify-content-between gap-2">
              <button class="add-to-cart btn btn-sm btn-primary" data-id="${product.id}">Panier</button>
              <button class="buy-now btn btn-sm btn-success" data-id="${product.id}">Payer</button>
              <a href="produit.html?id=${product.id}" class="text-muted small">Voir</a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindCategoryProductActions();
    return;
  }

  el.innerHTML = (category.images || []).map((src, index) => `
    <article class="category-tile">
      <div class="category-image-wrap">
        <img src="${src}" alt="${category.label} ${index + 1}" loading="lazy">
      </div>
      <div class="category-tile-meta">
        <span>${category.label}</span>
        <small>${index + 1}</small>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderCategoryGallery);
