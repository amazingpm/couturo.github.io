function formatPrice(v){
  const value = Number(v);
  if (Number.isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function openDirectBuy(product){
  if (!product) return;
  Cart.add(product, 1);
  const msg = `Bonjour, je souhaite commander ${product.name} (${formatPrice(product.price)}).`;
  const url = `https://wa.me/243977000858?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function renderProductsList(targetSelector, products){
  const root = document.querySelector(targetSelector);
  if(!root) return;
  root.innerHTML = products.map(p=>`
    <div class="product-card bg-white rounded overflow-hidden">
      <a href="produit.html?id=${p.id}"><img src="${p.images[0]||'images/logo.jpg'}" alt="${p.name}" class="product-image"></a>
      <div class="product-body">
        <h3 class="product-title">${p.name}</h3>
        <div class="mt-2">
          ${p.oldPrice?`<span class="text-muted text-decoration-line-through me-2">${formatPrice(p.oldPrice)}</span>`:''}
          <span class="product-price">${formatPrice(p.price)}</span>
        </div>
        <div class="mt-3 d-flex align-items-center justify-content-between gap-2">
          <button class="add-to-cart btn btn-sm btn-primary" data-id="${p.id}">Panier</button>
          <button class="buy-now btn btn-sm btn-success" data-id="${p.id}">Payer</button>
          <a href="produit.html?id=${p.id}" class="text-muted small">Voir</a>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id; const prod = window.PRODUCTS.find(x=>x.id===id);
      if(prod) Cart.add(prod,1);
    });
  });

  document.querySelectorAll('.buy-now').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id; const prod = window.PRODUCTS.find(x=>x.id===id);
      if(prod) openDirectBuy(prod);
    });
  });
}

function renderProductDetail(){
  const qp = new URLSearchParams(location.search); const id = qp.get('id');
  if(!id) return;
  const p = window.PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const container = document.getElementById('product-detail');
  if(!container) return;
  // build images gallery: main image + thumbnails
  const mainImg = p.images && p.images[0] ? p.images[0] : 'images/logo.jpg';
  const thumbs = (p.images && p.images.length>1) ? p.images : [];
  container.innerHTML = `
    <div class="md:flex gap-6">
      <div class="md:w-1/2">
        <img id="product-main-img" src="${mainImg}" alt="${p.name}" class="w-full object-cover rounded mb-3">
        ${thumbs.length? `<div class="gallery-grid">${thumbs.map(t=>`<img src="${t}" data-src="${t}" class="thumb rounded">`).join('')}</div>`:''}
      </div>
      <div class="md:w-1/2">
        <h1 class="text-2xl font-bold">${p.name}</h1>
        <p class="mt-3 text-gray-700">Catégorie: ${p.category} / ${p.subcategory}</p>
        <div class="mt-4">
          ${p.oldPrice?`<span class="text-muted text-decoration-line-through me-2">${formatPrice(p.oldPrice)}</span>`:''}
          <span class="text-2xl product-price">${formatPrice(p.price)}</span>
        </div>
        <div class="mt-6 d-flex gap-3 flex-wrap">
          <button id="btn-add" class="btn btn-primary">Ajouter au panier</button>
          <button id="btn-buy" class="btn btn-success">Payer directement</button>
          <a href="panier.html" class="btn btn-outline-secondary">Voir panier</a>
        </div>
      </div>
    </div>
  `;
  // thumbnail click -> change main image
  document.querySelectorAll('.thumb').forEach(img=>{
    img.addEventListener('click', ()=>{
      const main = document.getElementById('product-main-img'); if(main) main.src = img.dataset.src || img.src;
    });
  });
  document.getElementById('btn-add').addEventListener('click', ()=>{ Cart.add(p,1); });
  document.getElementById('btn-buy').addEventListener('click', ()=>{ openDirectBuy(p); });
}
