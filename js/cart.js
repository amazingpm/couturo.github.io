/* Cart manager using localStorage key 'couturo_cart' */
const Cart = (function(){
  const KEY = 'couturo_cart';
  function read(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){return [];}
  }
  function write(cart){ localStorage.setItem(KEY, JSON.stringify(cart)); }
  function find(id){ return read().find(i=>i.id===id); }
  function add(item, qty=1){
    const cart = read();
    const existing = cart.find(i=>i.id===item.id);
    if(existing){ existing.qty += qty; }
    else cart.push({id:item.id,name:item.name,price:item.price,qty, image: item.images && item.images[0]});
    write(cart); renderCartCount();
    try{
      showCartDialog(item);
    }catch(e){
      console.log('cart dialog error', e);
    }
    try{ showToast(`${item.name} a été ajouté au panier.`); }catch(e){ /* ignore */ }
  }
  function update(id, qty){
    const cart = read();
    const idx = cart.findIndex(i=>i.id===id);
    if(idx===-1) return;
    if(qty<=0) cart.splice(idx,1); else cart[idx].qty = qty;
    write(cart); renderCartCount();
  }
  function remove(id){
    const cart = read().filter(i=>i.id!==id); write(cart); renderCartCount();
  }
  function clear(){ localStorage.removeItem(KEY); renderCartCount(); }
  function subtotal(){ return read().reduce((s,i)=>s + i.price*i.qty, 0); }
  function shipping(){ return subtotal() > 100 ? 0 : 10; }
  function total(){ return subtotal() + shipping(); }
  function all(){ return read(); }
  function renderCartCount(){
    const el = document.getElementById('cart-count'); if(!el) return;
    const qty = read().reduce((s,i)=>s+i.qty,0);
    el.textContent = qty;
  }
  return { add, update, remove, clear, subtotal, shipping, total, all, renderCartCount };
})();

document.addEventListener('DOMContentLoaded', ()=>{ Cart.renderCartCount(); });

// Create a Bootstrap toast message and show it
function showToast(message){
  const container = document.getElementById('toast-container');
  if(!container){ alert(message); return; }
  const toastWrap = document.createElement('div');
  toastWrap.innerHTML = `
    <div class="toast align-items-center text-bg-white border shadow-sm mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;
  const toastEl = toastWrap.firstElementChild;
  container.appendChild(toastEl);
  try{
    const btoast = new bootstrap.Toast(toastEl, { delay: 3000 });
    btoast.show();
    // remove from DOM after hidden
    toastEl.addEventListener('hidden.bs.toast', ()=>{ toastEl.remove(); });
  }catch(e){ /* fallback to alert */ console.log('toast error', e); }
}

function showCartDialog(item){
  let modal = document.getElementById('cart-confirm-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'cart-confirm-modal';
    modal.className = 'cart-modal-backdrop';
    modal.setAttribute('aria-hidden', 'false');
    modal.innerHTML = `
      <div class="cart-modal" role="dialog" aria-modal="true" aria-labelledby="cart-modal-title">
        <button class="cart-modal-close" type="button" aria-label="Fermer">×</button>
        <div class="cart-modal-icon">✓</div>
        <h3 id="cart-modal-title">Produit ajouté</h3>
        <p id="cart-modal-message">Votre article a bien été ajouté au panier.</p>
        <div class="cart-modal-actions">
          <button type="button" class="cart-modal-secondary">Continuer vos achats</button>
          <button type="button" class="cart-modal-primary">Voir le panier</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.cart-modal-close').addEventListener('click', () => closeCartDialog());
    modal.querySelector('.cart-modal-secondary').addEventListener('click', () => closeCartDialog());
    modal.querySelector('.cart-modal-primary').addEventListener('click', () => {
      closeCartDialog();
      window.location.href = 'panier.html';
    });
    modal.addEventListener('click', (event) => {
      if(event.target === modal) closeCartDialog();
    });
  }

  const message = document.getElementById('cart-modal-message');
  if(message && item){
    message.textContent = `${item.name} a bien été ajouté au panier.`;
  }

  document.body.classList.add('modal-open');
  modal.classList.add('is-visible');
  setTimeout(() => modal.classList.add('is-animated'), 20);
}

function closeCartDialog(){
  const modal = document.getElementById('cart-confirm-modal');
  if(!modal) return;
  modal.classList.remove('is-animated');
  modal.classList.remove('is-visible');
  document.body.classList.remove('modal-open');
}

// Format numbers as Francs Congolais (CDF) abbreviated
function formatPrice(value){
  try{ return Number(value).toLocaleString('fr-FR') + ' CDF'; }catch(e){ return value + ' CDF'; }
}

function sendCartToWhatsapp(){
  const items = Cart.all();
  if(items.length===0){ showToast('Votre panier est vide.'); return; }
  let msg = 'Commande Couturo Business\n';
  items.forEach(i=>{ msg += `- ${i.name} x${i.qty} : ${formatPrice(i.price*i.qty)}\n`; });
  msg += `\nSous-total: ${formatPrice(Cart.subtotal())}\nLivraison: ${formatPrice(Cart.shipping())}\nTotal: ${formatPrice(Cart.total())}`;
  const phone = '243977000858';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
