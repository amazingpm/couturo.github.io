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
    // show add-to-cart notification (Bootstrap toast)
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

function sendCartToWhatsapp(){
  const items = Cart.all();
  if(items.length===0){ showToast('Votre panier est vide.'); return; }
  let msg = 'Commande Couturo Business\n';
  items.forEach(i=>{ msg += `- ${i.name} x${i.qty} : $${(i.price*i.qty).toFixed(2)}\n`; });
  msg += `\nSous-total: $${Cart.subtotal().toFixed(2)}\nLivraison: $${Cart.shipping().toFixed(2)}\nTotal: $${Cart.total().toFixed(2)}`;
  const phone = '243977000858';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
