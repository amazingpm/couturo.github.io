function initCarousel(){
  const slides = document.querySelectorAll('.banner-slide'); if(!slides.length) return;
  let i=0; slides.forEach((s,idx)=> s.classList.toggle('active', idx===0));
  setInterval(()=>{ slides[i].classList.remove('active'); i=(i+1)%slides.length; slides[i].classList.add('active'); }, 4500);
}

document.addEventListener('DOMContentLoaded', ()=>{
  if(window.PRODUCTS){
    renderProductsList('#new-collection', window.PRODUCTS.filter(p=>p.isNew));
    renderProductsList('#popular-products', window.PRODUCTS.filter(p=>p.isPopular));
    renderProductsList('#promo-products', window.PRODUCTS.filter(p=>p.oldPrice));
  }
  initCarousel();
  renderProductDetail();
  Cart.renderCartCount();
});
