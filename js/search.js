function setupSearch(){
  const input = document.getElementById('search-input'); if(!input) return;
  const results = document.getElementById('search-results');
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    if(!q){ results.innerHTML = ''; return; }
    let matches = window.PRODUCTS.filter(p=>p.name.toLowerCase().includes(q) || (p.category||'').toLowerCase().includes(q));
    // sort alphabetically by product name (fr locale)
    matches = matches.sort((a,b)=> a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
    results.innerHTML = matches.map(m=>`<div class="py-2 border-b"><a href="produit.html?id=${m.id}" class="flex items-center gap-3"><img src="${m.images[0]||'images/logo.jpg'}" class="w-12 h-12 object-cover"><div><div class="text-sm">${m.name}</div><div class="text-xs text-gray-500">${m.category}</div></div></a></div>`).join('');
  });
}

document.addEventListener('DOMContentLoaded', setupSearch);
