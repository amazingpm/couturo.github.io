/* Cart manager using localStorage key 'couturo_cart' */
const Cart = (function(){
  const KEY = 'couturo_cart';
  function catalogProduct(id){
    return Array.isArray(window.PRODUCTS) ? window.PRODUCTS.find((product) => product.id === id) : null;
  }
  function read(){
    try{
      const storedCart = JSON.parse(localStorage.getItem(KEY)) || [];
      return storedCart.map((item) => {
        const product = catalogProduct(item.id);
        if(!product) return item;
        return {
          ...item,
          name: product.name,
          price: product.price,
          qty: Number(item.qty) || 0,
          image: product.images && product.images[0]
        };
      });
    }catch(e){return [];
    }
  }
  function write(cart){ localStorage.setItem(KEY, JSON.stringify(cart)); }
  function find(id){ return read().find(i=>i.id===id); }
  function add(item, qty=1){
    const product = catalogProduct(item.id) || item;
    const cart = read();
    const existing = cart.find(i=>i.id===product.id);
    if(existing){ existing.qty = (Number(existing.qty) || 0) + Number(qty); }
    else cart.push({id:product.id,name:product.name,price:product.price,qty, image: product.images && product.images[0]});
    write(cart); renderCartCount();
    try{
      showCartDialog(product);
    }catch(e){
      console.log('cart dialog error', e);
    }
    try{ showToast(`${product.name} a été ajouté au panier.`); }catch(e){ /* ignore */ }
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
  function subtotal(){
    return read().reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.qty) || 0;
      return sum + price * quantity;
    }, 0);
  }
  function shipping(){
    const amount = subtotal();
    return amount === 0 || amount > 100 ? 0 : 2;
  }
  function total(){ return subtotal() + shipping(); }
  function all(){ return read(); }
  function renderCartCount(){
    const el = document.getElementById('cart-count'); if(!el) return;
    const qty = read().reduce((sum, item)=>sum + (Number(item.qty) || 0), 0);
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

// Format numbers as US Dollars
function formatPrice(value){
  const amount = Number(value);
  if (Number.isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function sendCartToPayment(){
  const items = Cart.all();
  if(items.length===0){ showToast('Votre panier est vide.'); return; }

  const subtotal = Cart.subtotal();
  const shipping = Cart.shipping();
  const total = Cart.total();

  window.location.href = 'https://pay.fondeka.com/p/BYSKWPHY8';
}

function sendCartToWhatsApp(){
  const items = Cart.all();
  if(items.length===0){ showToast('Votre panier est vide.'); return; }

  const subtotal = Cart.subtotal();
  const shipping = Cart.shipping();
  const total = Cart.total();
  const orderLines = items.map((item) =>
    `- ${item.name} x${item.qty}: ${formatPrice(item.price * item.qty)}`
  );
  const message = [
    'Bonjour Couturo Business, je souhaite commander :',
    '',
    ...orderLines,
    '',
    `Sous-total : ${formatPrice(subtotal)}`,
    `Livraison : ${formatPrice(shipping)}`,
    `Total : ${formatPrice(total)}`,
    '',
    'Merci de me confirmer la commande.'
  ].join('\n');

  const whatsappUrl = `https://wa.me/243977000858?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
