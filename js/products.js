function formatPrice(v){ return '$' + Number(v).toFixed(2); }

function renderProductsList(targetSelector, products){
  const root = document.querySelector(targetSelector);
  if(!root) return;
  root.innerHTML = products.map(p=>`
    <div class="product-card bg-white rounded overflow-hidden">
      <a href="produit.html?id=${p.id}"><img src="${p.images[0]||'images/logo.jpg'}" alt="${p.name}" class="w-full h-48 object-cover"></a>
      <div class="p-3">
        <h3 class="text-sm font-semibold">${p.name}</h3>
        <div class="mt-2">
          ${p.oldPrice?`<span class="text-gray-400 line-through mr-2">${formatPrice(p.oldPrice)}</span>`:''}
          <span class="text-indigo-600 font-bold">${formatPrice(p.price)}</span>
        </div>
        <div class="mt-3 flex items-center justify-between">
          <button class="add-to-cart btn-primary text-white px-3 py-1 rounded" data-id="${p.id}">Ajouter</button>
          <a href="produit.html?id=${p.id}" class="text-sm text-gray-600">Voir</a>
        </div>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id; const prod = window.PRODUCTS.find(x=>x.id===id);
      if(prod) Cart.add(prod,1); alert('Ajouté au panier');
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
  container.innerHTML = `
    <div class="md:flex gap-6">
      <div class="md:w-1/2"><img src="${p.images[0]||'images/logo.jpg'}" alt="${p.name}" class="w-full object-cover rounded"></div>
      <div class="md:w-1/2">
        <h1 class="text-2xl font-bold">${p.name}</h1>
        <p class="mt-3 text-gray-700">Catégorie: ${p.category} / ${p.subcategory}</p>
        <div class="mt-4">
          ${p.oldPrice?`<span class="line-through mr-2 text-gray-400">${formatPrice(p.oldPrice)}</span>`:''}
          <span class="text-2xl text-indigo-600 font-bold">${formatPrice(p.price)}</span>
        </div>
        <div class="mt-6 flex gap-3">
          <button id="btn-add" class="bg-green-600 text-white px-4 py-2 rounded">Ajouter au panier</button>
          <a href="panier.html" class="bg-gray-200 px-4 py-2 rounded">Voir panier</a>
        </div>
      </div>
    </div>
  `;
  document.getElementById('btn-add').addEventListener('click', ()=>{ Cart.add(p,1); alert('Ajouté au panier'); });
}
