const CATEGORY_IMAGES = {
  homme: {
    label: 'Homme',
    folder: 'images/homme',
    images: [
      'images/homme/1.jpg','images/homme/2.jpg','images/homme/3.jpg','images/homme/4.jpg','images/homme/5.jpg',
      'images/homme/IMG-20260813-WA0016.jpg','images/homme/IMG-20260813-WA0017.jpg','images/homme/IMG-20260813-WA0018.jpg','images/homme/IMG-20260813-WA0019.jpg','images/homme/IMG-20260813-WA0020.jpg',
      'images/homme/IMG-20260813-WA0088.jpg','images/homme/IMG-20260813-WA0089.jpg','images/homme/IMG-20260813-WA0090.jpg','images/homme/IMG-20260813-WA0091.jpg','images/homme/IMG-20260813-WA0092.jpg',
      'images/homme/IMG-20260813-WA0093.jpg','images/homme/IMG-20260813-WA0094.jpg','images/homme/IMG-20260813-WA0095.jpg','images/homme/IMG-20260813-WA0096.jpg','images/homme/IMG-20260813-WA0097.jpg',
      'images/homme/IMG-20260813-WA0098.jpg','images/homme/IMG-20260813-WA0099.jpg','images/homme/IMG-20260813-WA0100.jpg','images/homme/IMG-20260813-WA0101.jpg','images/homme/IMG-20260813-WA0102.jpg',
      'images/homme/IMG-20260813-WA0219.jpg','images/homme/IMG-20260813-WA0220.jpg'
    ]
  },
  femme: {
    label: 'Femme',
    folder: 'images/femme',
    images: [
      'images/femme/1.jpg','images/femme/2.jpg','images/femme/3.jpg','images/femme/4.jpg','images/femme/5.jpg',
      'images/femme/IMG-20260813-WA0191.jpg','images/femme/IMG-20260813-WA0192.jpg','images/femme/IMG-20260813-WA0193.jpg','images/femme/IMG-20260813-WA0194.jpg','images/femme/IMG-20260813-WA0195.jpg',
      'images/femme/IMG-20260813-WA0196.jpg','images/femme/IMG-20260813-WA0197.jpg','images/femme/IMG-20260813-WA0199.jpg','images/femme/IMG-20260813-WA0200.jpg','images/femme/IMG-20260813-WA0201.jpg',
      'images/femme/IMG-20260813-WA0202.jpg','images/femme/IMG-20260813-WA0203.jpg','images/femme/IMG-20260813-WA0204.jpg','images/femme/IMG-20260813-WA0213.jpg','images/femme/IMG-20260813-WA0215.jpg','images/femme/IMG-20260813-WA0216.jpg'
    ]
  },
  enfants: {
    label: 'Enfants',
    folder: 'images/enfants',
    images: [
      'images/enfants/1.jpg','images/enfants/2.jpg','images/enfants/3.jpg','images/enfants/4.jpg','images/enfants/5.jpg',
      'images/enfants/IMG-20260813-WA0051.jpg','images/enfants/IMG-20260813-WA0052.jpg','images/enfants/IMG-20260813-WA0053.jpg','images/enfants/IMG-20260813-WA0054.jpg','images/enfants/IMG-20260813-WA0055.jpg',
      'images/enfants/IMG-20260813-WA0056.jpg','images/enfants/IMG-20260813-WA0057.jpg','images/enfants/IMG-20260813-WA0058.jpg','images/enfants/IMG-20260813-WA0133.jpg','images/enfants/IMG-20260813-WA0134.jpg',
      'images/enfants/IMG-20260813-WA0135.jpg','images/enfants/IMG-20260813-WA0136.jpg','images/enfants/IMG-20260813-WA0137.jpg','images/enfants/IMG-20260813-WA0138.jpg','images/enfants/IMG-20260813-WA0139.jpg',
      'images/enfants/IMG-20260813-WA0150.jpg','images/enfants/IMG-20260813-WA0152.jpg','images/enfants/IMG-20260813-WA0154.jpg'
    ]
  },
  accessoires: {
    label: 'Accessoires',
    folder: 'images/accessoires',
    images: [
      'images/accessoires/1.jpg','images/accessoires/2.jpg','images/accessoires/3.jpg','images/accessoires/4.jpg','images/accessoires/5.jpg',
      'images/accessoires/IMG-20260813-WA0143.jpg','images/accessoires/IMG-20260813-WA0145.jpg','images/accessoires/IMG-20260813-WA0176.jpg','images/accessoires/IMG-20260813-WA0177.jpg','images/accessoires/IMG-20260813-WA0178.jpg',
      'images/accessoires/IMG-20260813-WA0179.jpg','images/accessoires/IMG-20260813-WA0180.jpg','images/accessoires/IMG-20260813-WA0183.jpg','images/accessoires/IMG-20260813-WA0184.jpg','images/accessoires/IMG-20260813-WA0185.jpg',
      'images/accessoires/IMG-20260813-WA0186.jpg','images/accessoires/IMG-20260813-WA0187.jpg','images/accessoires/IMG-20260813-WA0188.jpg','images/accessoires/IMG-20260813-WA0189.jpg','images/accessoires/IMG-20260813-WA0190.jpg',
      'images/accessoires/IMG-20260813-WA0205.jpg','images/accessoires/IMG-20260813-WA0206.jpg','images/accessoires/IMG-20260813-WA0207.jpg','images/accessoires/IMG-20260813-WA0208.jpg','images/accessoires/IMG-20260813-WA0209.jpg',
      'images/accessoires/IMG-20260813-WA0210.jpg','images/accessoires/IMG-20260813-WA0211.jpg','images/accessoires/kepi1.jpg','images/accessoires/kepi2.jpg','images/accessoires/kepi3.jpg'
    ]
  }
};

window.CATEGORY_IMAGES = CATEGORY_IMAGES;

function getActiveCategory() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('cat');
  return CATEGORY_IMAGES[requested] ? requested : 'homme';
}

function renderCategoryStories(category) {
  const strip = document.getElementById('category-story-strip');
  if (!strip) return;

  const tiles = category.images.slice(0, 7).map((src, index) => `
    <div class="story-pill" title="${category.label} ${index + 1}">
      <div class="story-ring">
        <img src="${src}" alt="${category.label} ${index + 1}" loading="lazy">
      </div>
      <span>${index === 0 ? 'La sélection' : category.label}</span>
    </div>
  `).join('');

  strip.innerHTML = tiles;
}

function renderCategoryGallery() {
  const el = document.getElementById('category-gallery');
  if (!el) return;

  const category = CATEGORY_IMAGES[getActiveCategory()];
  if (!category) return;

  const titleEl = document.getElementById('category-title');
  if (titleEl) titleEl.textContent = category.label;

  const countEl = document.getElementById('category-count');
  if (countEl) countEl.textContent = `${category.images.length} images · Collection ${category.label}`;

  renderCategoryStories(category);

  el.innerHTML = category.images.map((src, index) => `
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
