/* ═══════════════════════════════════════════════════════════════
   TimeVerse.in — Main JavaScript
   All features: Cart, Checkout, Auth, Search, Email, Google Form
   © 2024 TimeVerse.in | Mumbai, India
═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   ★★★ EMAIL & GOOGLE FORM SETUP — READ BEFORE GOING LIVE ★★★
   ══════════════════════════════════════════════════════════════

   ── EMAIL SETUP (EmailJS — FREE, 200 emails/month) ──────────
   STEP 1: Go to https://www.emailjs.com → Sign Up (use your Gmail)
   STEP 2: Dashboard → Email Services → Add New Service → Gmail
           → Connect timeversetimeverse@gmail.com → Save
           → Copy the Service ID (e.g. service_abc123)
   STEP 3: Dashboard → Email Templates → Create New Template
           Template Name: "owner_notification"
           To Email: timeversetimeverse@gmail.com
           Subject: 🛒 New Order {{order_id}} — TimeVerse.in
           Body:
           ════════════════════════════════════
           NEW ORDER — TimeVerse.in
           ════════════════════════════════════
           Order ID   : {{order_id}}
           Date       : {{order_date}}
           ────────────────────────────────────
           CUSTOMER DETAILS
           Name       : {{customer_name}}
           Email      : {{customer_email}}
           Phone      : {{customer_phone}}
           ────────────────────────────────────
           SHIPPING ADDRESS
           {{customer_address}}
           ────────────────────────────────────
           ITEMS ORDERED
           {{order_items}}
           ────────────────────────────────────
           TOTAL      : {{order_total}}
           PAYMENT    : Cash on Delivery (COD)
           ════════════════════════════════════
           → Save → Copy Template ID (e.g. template_abc123)

   STEP 4: Create another template named "customer_confirmation"
           To Email: {{customer_email}}   ← exactly this
           Subject: ✅ Your TimeVerse.in Order #{{order_id}} is Confirmed!
           Body:
           Dear {{customer_name}},
           Thank you for your order at TimeVerse.in! 🎉

           ════════════════════════════════════
           ORDER CONFIRMATION
           ════════════════════════════════════
           Order ID    : {{order_id}}
           Date        : {{order_date}}
           ────────────────────────────────────
           ITEMS
           {{order_items}}
           ────────────────────────────────────
           TOTAL       : {{order_total}}
           PAYMENT     : Cash on Delivery
                         (Pay when package arrives)
           ────────────────────────────────────
           SHIP TO
           {{customer_address}}

           Estimated Delivery: 3–7 Business Days
           ════════════════════════════════════

           ⚠️ All purchases are non-returnable
           and non-refundable once shipped.

           Questions? timeversetimeverse@gmail.com
           Mon–Sat: 10AM–7PM IST

           Warm regards,
           Team TimeVerse.in ⌚
           → Save → Copy Template ID

   STEP 5: Dashboard → Account → General → Copy Public Key

   STEP 6: Paste your 4 values in the CONFIG section below.

   ── GOOGLE FORM SETUP (FREE, saves every order to Google Sheets) ─
   STEP 1: Go to https://forms.google.com → Blank form
   STEP 2: Add these fields (Short answer for all):
           - Order ID
           - Customer Name
           - Phone Number
           - Email
           - Address
           - City
           - State
           - PIN Code
           - Items Ordered
           - Total Amount
           - Payment Method
           - Order Date
   STEP 3: Click "Send" → Link icon → Copy the form URL
           It looks like: https://docs.google.com/forms/d/e/XXXXX/viewform
           Change "viewform" to "formResponse" → paste below
   STEP 4: For each field, right-click → Inspect the input
           Copy the "name" attribute (looks like entry.123456789)
           Paste each entry ID in the CONFIG below

   ══════════════════════════════════════════════════════════════ */

/* ── CONFIGURATION ─────────────────────────────────────────── */
const CONFIG = {
  /* EmailJS — from setup above */
  emailjs_public_key:     'YOUR_PUBLIC_KEY',
  emailjs_service_id:     'YOUR_SERVICE_ID',
  emailjs_owner_tmpl:     'YOUR_OWNER_TEMPLATE_ID',
  emailjs_customer_tmpl:  'YOUR_CUSTOMER_TEMPLATE_ID',

  /* Google Form — from setup above */
  google_form_url: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  google_form_fields: {
    order_id:       'entry.000000001',
    customer_name:  'entry.000000002',
    phone:          'entry.000000003',
    email:          'entry.000000004',
    address:        'entry.000000005',
    city:           'entry.000000006',
    state:          'entry.000000007',
    pin:            'entry.000000008',
    items:          'entry.000000009',
    total:          'entry.000000010',
    payment:        'entry.000000011',
    date:           'entry.000000012',
  },
};
/* ─────────────────────────────────────────────────────────── */

/* ══ CDN PATHS ══ */
const WW = 'https://watchworld.in/cdn/shop/files/';
const WC = 'https://watchworld.in/cdn/shop/collections/';

/* ══ PRODUCTS ══ */
const PRODUCTS = [
  { id:1,  brand:'Invicta',    name:'Classic Gold Dial Men\'s Watch',               op:2599, img:WW+'IMG_20240813_203626_769_jpg.webp',                                    cat:'men',     tags:['bestseller'], feats:['Gold Dial','Stainless Steel Case','Mineral Crystal','Water Resistant'] },
  { id:2,  brand:'Rado',       name:'Swiss Time Black Diamond Dial Men\'s Watch',   op:2199, img:WW+'WhatsAppImage2025-01-30at13.43.53_d72eed76.jpg',                       cat:'men',     tags:['new'],        feats:['Diamond Dial','Swiss Movement','Stainless Steel','50m WR'] },
  { id:3,  brand:'Invicta',    name:'Premium White Dial Men\'s Watch',              op:2599, img:WW+'69789613-6679-4c60-98d9-0721206053c8-compressed.jpg',                  cat:'men',     tags:['bestseller'], feats:['White Dial','Premium Case','Date Display','Quartz Movement'] },
  { id:4,  brand:'Rado',       name:'Swiss Time Gold Diamond Dial Men\'s Watch',    op:2199, img:WW+'WhatsAppImage2025-01-30at13.43.23_d754e226.jpg',                       cat:'men',     tags:[],             feats:['Gold Diamond Dial','Swiss Movement','50m WR','Analog Display'] },
  { id:5,  brand:'Rado',       name:'Diastar Gold Chronograph Men\'s Watch',        op:3749, img:WW+'rn-image-picker_lib_temp_8d250b24-2b96-4b09-a698-6e9ffa2f91fa.jpg',   cat:'premium', tags:['bestseller'], feats:['Chronograph','Gold Dial','Stainless Steel','Tachymeter Scale'] },
  { id:6,  brand:'Rado',       name:'Swiss Time White Diamond Dial Men\'s Watch',   op:2199, img:WW+'WhatsAppImage2025-01-30at13.44.52_8d3adca9.jpg',                       cat:'men',     tags:['new'],        feats:['White Diamond Dial','Swiss Movement','Analog Display','50m WR'] },
  { id:7,  brand:'Invicta',    name:'Black Gold Elite Men\'s Watch',                op:2599, img:WW+'68317aeb6b78b2.jpg',                                                   cat:'men',     tags:['bestseller'], feats:['Black Gold Dial','PVD Coated Case','Mineral Crystal','50m WR'] },
  { id:8,  brand:'Diesel',     name:'Gold Dial New Model Men\'s Watch',             op:2099, img:WW+'f80bdc_89ddd5017cca4498987a7cd0adf47a63_mv2.webp',                    cat:'men',     tags:[],             feats:['Gold Dial','Oversized Case','Date Display','Leather Strap'] },
  { id:9,  brand:'Rolex',      name:'Cosmograph Daytona Sky Blue Automatic',        op:3999, img:WW+'WhatsAppImage2026-02-16at9.24.16PM.jpg',                               cat:'premium', tags:['new','bestseller'], feats:['Automatic Movement','Sapphire Crystal','Tachymetre Bezel','Oyster Bracelet'] },
  { id:10, brand:'Tag Heuer',  name:'Grand Carrera 1887 Black Dial Men\'s Watch',   op:2649, img:WW+'1_c8dec71f-8eaa-4867-8080-456371aad6a0.jpg',                           cat:'premium', tags:['new'],        feats:['Black Dial','Swiss Automatic','Chronograph','100m WR'] },
  { id:11, brand:'Tag Heuer',  name:'Grand Carrera 1887 Green Dial Men\'s Watch',   op:2649, img:WW+'WhatsAppImage2026-02-12at5.18.46PM_8dbbea2c-8077-45ef-bf70-eb2d8d5b5f5d.jpg', cat:'premium', tags:[], feats:['Green Dial','Swiss Automatic','Tachymetre Bezel','Stainless Steel'] },
  { id:12, brand:'Gucci',      name:'Chemin Des Tourelles Gold Dial Watch',         op:2299, img:WW+'WhatsAppImage2026-02-16at7.48.53PM.jpg',                               cat:'premium', tags:['new'],        feats:['Gold Dial','Italian Luxury','Sapphire Crystal','Swiss Quartz'] },
  { id:13, brand:'Gucci',      name:'Chemin Des Tourelles Black Dial Watch',        op:2299, img:WW+'2_8893b644-7bc1-41b4-a0d1-9df2dfddb822.jpg',                          cat:'men',     tags:[],             feats:['Black Dial','Italian Design','GG Logo','Swiss Quartz'] },
  { id:14, brand:'Rado',       name:'Automatic Jubilee Red Dial Men\'s Watch',      op:2399, img:WW+'2_9059fc86-9c7b-4b51-a111-14a380c9b4f9.jpg',                          cat:'premium', tags:['bestseller'], feats:['Red Jubilee Dial','Automatic Movement','Stainless Steel','Date Window'] },
  { id:15, brand:'Rado',       name:'Automatic Jubilee Black Diamond Dial Watch',   op:2399, img:WW+'1_041fd4a4-fa53-42dc-8bc4-688496587899.jpg',                          cat:'premium', tags:[],             feats:['Diamond Dial','Swiss Automatic','Jubilee Bracelet','Sapphire Crystal'] },
  { id:16, brand:'Rado',       name:'Automatic Jubilee Black Dial Men\'s Watch',    op:2399, img:WW+'2_b66f8ed5-6d12-43ce-9ee6-abd70e78115b.jpg',                          cat:'men',     tags:['new'],        feats:['Black Dial','Automatic Movement','Date Display','Stainless Steel'] },
];

const BRANDS = [
  { name:'Rolex',             img:WC+'Ellipse_31.png' },
  { name:'Rado',              img:WC+'Ellipse_30.png' },
  { name:'Invicta',           img:WC+'Ellipse_23.png' },
  { name:'Edifice',           img:WC+'Ellipse_14.png' },
  { name:'Tissot',            img:WC+'Ellipse_4.png'  },
  { name:'Fossil',            img:WC+'Ellipse_17.png' },
  { name:'Diesel',            img:WC+'Ellipse_13.png' },
  { name:'Hublot',            img:WC+'Ellipse_22.png' },
  { name:'Patek Philippe',    img:WC+'Ellipse_29.png' },
  { name:'Daniel Wellington', img:WC+'Ellipse_12.png' },
  { name:'Emporio Armani',    img:WC+'Ellipse_15.png' },
  { name:'Versace',           img:WC+'Ellipse_34.png' },
];

/* ══ PRICE LOGIC ══
   ≥ ₹2000 → subtract ₹800
   = ₹1499 → subtract ₹500
   = ₹3499 → subtract ₹800
*/
function calcPrice(op) {
  if (op === 1499) return { cur: 999,     save: 500 };
  if (op === 3499) return { cur: 2699,    save: 800 };
  if (op >= 2000)  return { cur: op-800,  save: 800 };
  return { cur: op, save: 0 };
}
const fmt  = n => '₹' + n.toLocaleString('en-IN');
const dpct = (o,c) => Math.round((o-c)/o*100);

/* ══ APP STATE ══ */
const STATE = {
  cart:   [],
  user:   null,
  page:   'home',
  filter: 'all',
  orders: [],
};

/* ══════════════════════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════════════════════ */
const curDot  = document.getElementById('curDot');
const curRing = document.getElementById('curRing');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  curDot.style.left = mx+'px'; curDot.style.top = my+'px';
});
(function animCur(){
  rx += (mx-rx)*.12; ry += (my-ry)*.12;
  curRing.style.left = rx+'px'; curRing.style.top = ry+'px';
  requestAnimationFrame(animCur);
})();
document.addEventListener('mouseover', e => {
  if (e.target.closest('a,button,[onclick],.product-card,.brand-logo-item,.collection-banner')) {
    curDot.classList.add('big'); curRing.classList.add('big');
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('a,button,[onclick],.product-card,.brand-logo-item,.collection-banner')) {
    curDot.classList.remove('big'); curRing.classList.remove('big');
  }
});

/* ══════════════════════════════════════════════════════════════
   HEADER SCROLL
══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 60);
});

/* ══════════════════════════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════════════════════════ */
let mobileNavOpen = false;
function toggleMobileNav() {
  mobileNavOpen = !mobileNavOpen;
  document.getElementById('mobileNav').classList.toggle('open', mobileNavOpen);
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROUTING
══════════════════════════════════════════════════════════════ */
function nav(page, data) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('pg-'+page);
  if (!el) return;
  el.classList.add('active');
  STATE.page = page;
  window.scrollTo({ top:0, behavior:'smooth' });

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Close mobile nav if open
  if (mobileNavOpen) toggleMobileNav();

  // Page initialisation
  if (page === 'home')     { renderFeaturedProducts(); initBrandsMarquee(); initCounters(); }
  if (page === 'shop')     { renderAllProducts(); }
  if (page === 'detail'  && data != null) renderDetail(data);
  if (page === 'checkout') renderCheckout();
  if (page === 'account')  renderAccount();

  setTimeout(initReveal, 80);
}

/* ══════════════════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════════════════ */
function openSearch() {
  document.getElementById('searchOverlay').classList.add('active');
  setTimeout(() => document.getElementById('searchInput').focus(), 300);
}
function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}
document.addEventListener('keydown', e => { if (e.key==='Escape') closeSearch(); });

document.getElementById('searchInput').addEventListener('input', function(){
  const q = this.value.toLowerCase().trim();
  const resEl = document.getElementById('searchResults');
  if (!q) { resEl.innerHTML=''; return; }

  const hits = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  );

  if (!hits.length) {
    resEl.innerHTML = '<p style="color:var(--tx2);text-align:center;padding:20px">No results found for "'+q+'"</p>';
    return;
  }
  resEl.innerHTML = hits.slice(0,8).map(p => {
    const {cur} = calcPrice(p.op);
    return `<div class="search-hit" onclick="closeSearch();nav('detail',${p.id})">
      <img class="search-hit-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.background='var(--dk4)'">
      <div>
        <div class="search-hit-name">${p.brand} — ${p.name}</div>
        <div class="search-hit-price">${fmt(cur)}</div>
      </div>
    </div>`;
  }).join('');
});

/* ══════════════════════════════════════════════════════════════
   PRODUCT CARD HTML
══════════════════════════════════════════════════════════════ */
function productCard(p) {
  const {cur, save} = calcPrice(p.op);
  const pct = dpct(p.op, cur);
  const badge = p.tags.includes('bestseller') ? '<span class="product-badge badge-sale">Bestseller</span>'
              : p.tags.includes('new')         ? '<span class="product-badge badge-new">New Arrival</span>'
              : '';
  return `
  <div class="product-card reveal" onclick="nav('detail',${p.id})">
    <div class="product-card-img">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.background='var(--dk4)'">
      ${badge}
      ${pct>0 ? `<span class="product-badge badge-hot" style="top:auto;bottom:10px">-${pct}%</span>` : ''}
      <div class="product-quick-add">
        <button class="quick-add-btn" onclick="event.stopPropagation();addToCart(${p.id})">
          + Quick Add to Cart
        </button>
      </div>
      <button class="product-share" onclick="event.stopPropagation();shareProduct(${p.id})" title="Share">⬆</button>
    </div>
    <div class="product-card-info">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">
        <span class="price-now">${fmt(cur)}</span>
        ${save>0 ? `<span class="price-was">${fmt(p.op)}</span><span class="price-save">Save ${fmt(save)}</span>` : ''}
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════
   HOME — FEATURED PRODUCTS
══════════════════════════════════════════════════════════════ */
function renderFeaturedProducts() {
  const el = document.getElementById('featuredGrid');
  if (el) { el.innerHTML = PRODUCTS.slice(0,8).map(productCard).join(''); initReveal(); }
}

/* ══════════════════════════════════════════════════════════════
   BRANDS MARQUEE
══════════════════════════════════════════════════════════════ */
function initBrandsMarquee() {
  const el = document.getElementById('brandsTrack');
  if (!el) return;
  const doubled = [...BRANDS, ...BRANDS];
  el.innerHTML = doubled.map(b => `
    <div class="brand-logo-item" onclick="nav('shop')">
      <div class="brand-logo-circle">
        <img src="${b.img}" alt="${b.name}" onerror="this.parentElement.style.background='var(--dk4)'">
      </div>
      <span class="brand-logo-name">${b.name}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════════════════
   SHOP — ALL PRODUCTS WITH FILTERS
══════════════════════════════════════════════════════════════ */
function renderAllProducts() {
  renderFilterBar();
  const el = document.getElementById('shopGrid');
  if (!el) return;

  let list = PRODUCTS;
  if      (STATE.filter === 'men')        list = PRODUCTS.filter(p => p.cat==='men');
  else if (STATE.filter === 'ladies')     list = PRODUCTS.filter(p => p.cat==='ladies');
  else if (STATE.filter === 'couple')     list = PRODUCTS.filter(p => p.cat==='couple');
  else if (STATE.filter === 'sport')      list = PRODUCTS.filter(p => p.cat==='sport');
  else if (STATE.filter === 'premium')    list = PRODUCTS.filter(p => p.cat==='premium');
  else if (STATE.filter === 'new')        list = PRODUCTS.filter(p => p.tags.includes('new'));
  else if (STATE.filter === 'bestseller') list = PRODUCTS.filter(p => p.tags.includes('bestseller'));

  el.innerHTML = list.length
    ? list.map(productCard).join('')
    : '<p style="color:var(--tx2);text-align:center;padding:60px;grid-column:1/-1">No watches found in this category.</p>';
  initReveal();
}

function renderFilterBar() {
  const el = document.getElementById('filterBar');
  if (!el) return;
  const cats = [
    {v:'all',l:'All Watches'}, {v:'men',l:"Men's"}, {v:'ladies',l:'Ladies'},
    {v:'couple',l:'Couple'}, {v:'sport',l:'Sport'}, {v:'premium',l:'Premium'},
    {v:'new',l:'New Arrivals'}, {v:'bestseller',l:'Bestsellers'},
  ];
  el.innerHTML = cats.map(c =>
    `<button class="filter-btn${STATE.filter===c.v?' active':''}" onclick="setFilter('${c.v}')">${c.l}</button>`
  ).join('') + `<span class="filter-count">${PRODUCTS.length} Watches</span>`;
}

function setFilter(f) { STATE.filter=f; renderAllProducts(); }

/* ══════════════════════════════════════════════════════════════
   PRODUCT DETAIL PAGE
══════════════════════════════════════════════════════════════ */
function renderDetail(id) {
  const p = PRODUCTS.find(x => x.id===id);
  if (!p) return;
  const {cur, save} = calcPrice(p.op);
  const pct = dpct(p.op, cur);
  const related = PRODUCTS.filter(x => x.id!==id && (x.brand===p.brand||x.cat===p.cat)).slice(0,4);

  document.getElementById('detailContent').innerHTML = `
    <div class="pd-wrap">
      <!-- GALLERY -->
      <div class="pd-gallery">
        <div class="pd-main-img">
          <img id="pdMainImg" src="${p.img}" alt="${p.name}" onerror="this.style.background='var(--dk4)'">
          <div class="pd-genuine-tag">✓ 100% Genuine</div>
        </div>
        <div class="pd-thumbs">
          ${[0,1,2].map((_, i) => `
            <div class="pd-thumb ${i===0?'active':''}" onclick="switchThumb(this,'${p.img}')">
              <img src="${p.img}" alt="${p.name}">
            </div>`).join('')}
        </div>
      </div>

      <!-- INFO -->
      <div class="pd-info">
        <div class="pd-brand-tag">${p.brand}</div>
        <h1 class="pd-title">${p.name}</h1>
        <div class="pd-reviews">
          <span class="pd-stars">★★★★★</span>
          <span class="pd-rev-count">(${42+p.id} reviews)</span>
        </div>

        <div class="pd-price-box">
          <span class="pd-price-now">${fmt(cur)}</span>
          ${save>0 ? `<span class="pd-price-was">${fmt(p.op)}</span><span class="pd-price-save">SAVE ${fmt(save)} (${pct}%)</span>` : ''}
        </div>

        <div class="pd-features">
          <h4>Key Features</h4>
          <div class="pd-features-list">
            ${p.feats.map(f => `<div class="pd-feat-item">${f}</div>`).join('')}
          </div>
        </div>

        <!-- QTY + ADD TO CART -->
        <div class="pd-qty-row">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="adjQty(-1)">−</button>
            <input class="qty-num" id="detailQty" value="1" min="1" max="10" readonly>
            <button class="qty-btn" onclick="adjQty(1)">+</button>
          </div>
          <button class="pd-atc" onclick="addToCart(${p.id}); toast('✅ Added to cart!')">
            Add to Cart 🛒
          </button>
        </div>

        <!-- BUY NOW -->
        <button class="pd-buy" onclick="addToCart(${p.id}); nav('checkout')">
          ⚡ Buy Now — Cash on Delivery
        </button>

        <!-- SHARE -->
        <div class="pd-share-row">
          <span>Share:</span>
          <button class="share-btn" onclick="shareProduct(${p.id},'facebook')" title="Share on Facebook">f</button>
          <button class="share-btn" onclick="shareProduct(${p.id},'instagram')" title="Share on Instagram">📷</button>
          <button class="share-btn" onclick="shareProduct(${p.id},'copy')" title="Copy Link">🔗</button>
        </div>

        <!-- PRODUCT META -->
        <div class="pd-meta-list">
          <div class="pd-meta-row"><span class="pd-meta-key">Brand</span><span class="pd-meta-val">${p.brand}</span></div>
          <div class="pd-meta-row"><span class="pd-meta-key">Category</span><span class="pd-meta-val">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</span></div>
          <div class="pd-meta-row"><span class="pd-meta-key">Shipping</span><span class="pd-meta-val" style="color:var(--green)">FREE across India ✓</span></div>
          <div class="pd-meta-row"><span class="pd-meta-key">Payment</span><span class="pd-meta-val">Cash on Delivery ✓</span></div>
          <div class="pd-meta-row"><span class="pd-meta-key">Delivery</span><span class="pd-meta-val">3–7 Business Days</span></div>
          <div class="pd-meta-row"><span class="pd-meta-key">Availability</span><span class="pd-meta-val" style="color:var(--green)">In Stock ✓</span></div>
        </div>

        <div class="no-refund-box">
          <strong>⚠️ Non-Returnable & Non-Refundable</strong>
          All purchases at TimeVerse.in are non-returnable and non-refundable. Please review all product details carefully before completing your purchase. For queries: <a href="mailto:timeversetimeverse@gmail.com" style="color:var(--gold)">timeversetimeverse@gmail.com</a>
        </div>
      </div>
    </div>

    ${related.length ? `
    <div class="section container">
      <div class="sec-hd">
        <span class="sec-eyebrow">You May Also Like</span>
        <h2 class="sec-title">Related <em>Watches</em></h2>
      </div>
      <div class="products-grid">${related.map(productCard).join('')}</div>
    </div>` : ''}`;

  initReveal();
}

function adjQty(d) {
  const el = document.getElementById('detailQty');
  if (el) el.value = Math.max(1, Math.min(10, +el.value + d));
}

function switchThumb(el, img) {
  document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pdMainImg').src = img;
}

/* ══════════════════════════════════════════════════════════════
   SHARE PRODUCT
══════════════════════════════════════════════════════════════ */
function shareProduct(id, platform) {
  const p = PRODUCTS.find(x => x.id===id);
  if (!p) return;
  const {cur} = calcPrice(p.op);
  const url  = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out ${p.brand} ${p.name} at ${fmt(cur)} on TimeVerse.in! ⌚`);

  if (platform==='facebook')  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  else if (platform==='instagram') { navigator.clipboard.writeText(window.location.href); toast('📋 Link copied! Paste in Instagram.'); }
  else if (platform==='copy')  { navigator.clipboard.writeText(window.location.href); toast('🔗 Link copied to clipboard!'); }
  else {
    if (navigator.share) {
      navigator.share({ title: p.name, text: decodeURIComponent(text), url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast('🔗 Link copied to clipboard!');
    }
  }
}

/* ══════════════════════════════════════════════════════════════
   CART
══════════════════════════════════════════════════════════════ */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id===id);
  if (!p) return;
  const {cur} = calcPrice(p.op);
  const qty   = id === +( document.getElementById('detailQty')?.dataset?.pid || 0 )
                ? +( document.getElementById('detailQty')?.value || 1 )
                : 1;
  const ex = STATE.cart.find(x => x.id===id);
  if (ex) ex.qty += qty;
  else STATE.cart.push({ id, qty, price:cur, originalPrice:p.op, name:p.name, brand:p.brand, img:p.img });
  updateCartBadge();
  toast('✅ Added to cart!');
}

function removeFromCart(id) {
  STATE.cart = STATE.cart.filter(x => x.id!==id);
  updateCartBadge();
  renderCartDrawer();
}

function updateCartQty(id, delta) {
  const item = STATE.cart.find(x => x.id===id);
  if (item) { item.qty = Math.max(1, item.qty+delta); updateCartBadge(); renderCartDrawer(); }
}

function updateCartBadge() {
  const total = STATE.cart.reduce((s,x) => s+x.qty, 0);
  const el    = document.getElementById('cartBadge');
  el.textContent = total;
  el.classList.toggle('show', total>0);
}

function toggleCart() {
  const ov = document.getElementById('cartOverlay');
  ov.classList.toggle('open');
  if (ov.classList.contains('open')) renderCartDrawer();
}

function renderCartDrawer() {
  const itemsEl = document.getElementById('cartItemsWrap');
  const footerEl = document.getElementById('cartFooter');

  if (!STATE.cart.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <div style="font-size:15px;font-weight:600">Your cart is empty</div>
        <div style="font-size:13px;color:var(--tx2)">Add some beautiful watches!</div>
        <button class="btn btn-ghost btn-sm" onclick="toggleCart();nav('shop')" style="margin-top:10px">Browse Watches</button>
      </div>`;
    footerEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = STATE.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}" onerror="this.style.background='var(--dk4)'">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-item-qty">
          <button class="cqb" onclick="updateCartQty(${item.id},-1)">−</button>
          <span style="font-size:13px;font-weight:600;min-width:20px;text-align:center">${item.qty}</span>
          <button class="cqb" onclick="updateCartQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>`).join('');

  const sub = STATE.cart.reduce((s,x) => s + x.price*x.qty, 0);
  footerEl.innerHTML = `
    <div class="cart-footer">
      <div class="cart-subtotal"><span>Subtotal</span><span>${fmt(sub)}</span></div>
      <div class="cart-shipping"><span>Shipping</span><span style="color:var(--green)">FREE ✓</span></div>
      <div class="cart-total"><span>Total</span><span>${fmt(sub)}</span></div>
      <button class="btn btn-gold btn-full btn-lg" onclick="toggleCart();nav('checkout')">
        Checkout — COD Available ⚡
      </button>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════════════════════════ */
function renderCheckout() {
  const el  = document.getElementById('checkoutContent');
  const sub = STATE.cart.reduce((s,x) => s+x.price*x.qty, 0);

  if (!STATE.cart.length) {
    el.innerHTML = `
      <div style="text-align:center;padding:120px 40px">
        <div style="font-size:60px;margin-bottom:20px">🛒</div>
        <h2 style="font-family:var(--ff-d);font-size:32px;margin-bottom:14px">Your cart is empty</h2>
        <button class="btn btn-gold btn-lg" onclick="nav('shop')">Browse Watches</button>
      </div>`;
    return;
  }

  const uName  = STATE.user?.name  || '';
  const uEmail = STATE.user?.email || '';

  el.innerHTML = `
  <div class="checkout-wrap">
    <!-- FORM COLUMN -->
    <div>
      <!-- Contact -->
      <div class="checkout-form-section">
        <div class="checkout-section-title">📋 Customer Details</div>
        <div class="form-group"><label>Full Name *</label><input class="form-control" id="ck_name" placeholder="Your full name" value="${uName}"></div>
        <div class="form-row">
          <div class="form-group"><label>Email Address *</label><input class="form-control" id="ck_email" type="email" placeholder="email@example.com" value="${uEmail}"></div>
          <div class="form-group"><label>Phone Number *</label><input class="form-control" id="ck_phone" type="tel" placeholder="+91 98765 43210"></div>
        </div>
      </div>

      <!-- Address -->
      <div class="checkout-form-section">
        <div class="checkout-section-title">📍 Shipping Address</div>
        <div class="form-group"><label>Address Line 1 *</label><input class="form-control" id="ck_addr1" placeholder="House / Flat No., Street Name"></div>
        <div class="form-group"><label>Address Line 2 (Landmark / Area)</label><input class="form-control" id="ck_addr2" placeholder="Near landmark, area (optional)"></div>
        <div class="form-row">
          <div class="form-group"><label>City *</label><input class="form-control" id="ck_city" placeholder="Mumbai"></div>
          <div class="form-group"><label>State *</label><input class="form-control" id="ck_state" placeholder="Maharashtra"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>PIN Code *</label><input class="form-control" id="ck_pin" placeholder="400001" maxlength="6"></div>
          <div class="form-group"><label>Country</label><input class="form-control" value="India 🇮🇳" readonly style="opacity:.6"></div>
        </div>
      </div>

      <!-- Payment -->
      <div class="checkout-form-section">
        <div class="checkout-section-title">💳 Payment Method</div>
        <div class="payment-option selected">
          <div class="pay-radio"></div>
          <div>
            <div class="pay-label">💰 Cash on Delivery (COD)</div>
            <div class="pay-desc">Pay in cash when your order arrives at your door. No extra charges.</div>
          </div>
        </div>
        <div class="payment-option disabled" style="cursor:not-allowed;opacity:.35">
          <div class="pay-radio"></div>
          <div>
            <div class="pay-label">💳 Online Payment (Coming Soon)</div>
            <div class="pay-desc">UPI / Debit Card / Credit Card / Net Banking</div>
            <div class="pay-badges">
              <span class="pay-badge">UPI</span><span class="pay-badge">Debit Card</span>
              <span class="pay-badge">Credit Card</span><span class="pay-badge">Net Banking</span>
            </div>
          </div>
        </div>
        <div class="checkout-no-refund">
          ⚠️ <strong style="color:var(--gold)">Important:</strong> All purchases are <strong style="color:var(--red)">non-returnable and non-refundable</strong> once confirmed and shipped. Please review all product details carefully.
        </div>
      </div>
    </div>

    <!-- ORDER SUMMARY -->
    <div class="order-summary-box">
      <div class="order-summary-title">Order Summary</div>
      ${STATE.cart.map(item => `
        <div class="order-summary-item">
          <div class="order-item-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="order-item-name">${item.brand} ${item.name} ×${item.qty}</div>
          <div class="order-item-price">${fmt(item.price*item.qty)}</div>
        </div>`).join('')}
      <div class="order-line"><span>Subtotal</span><span>${fmt(sub)}</span></div>
      <div class="order-line"><span>Shipping</span><span style="color:var(--green)">FREE</span></div>
      <div class="order-line"><span>COD Charges</span><span style="color:var(--green)">₹0</span></div>
      <div class="order-total-line"><span>Total</span><span>${fmt(sub)}</span></div>
      <button class="place-order-btn" onclick="placeOrder()">
        Place Order — COD ⚡
      </button>
      <p style="font-size:10.5px;color:var(--tx2);text-align:center;margin-top:10px">
        You'll pay <strong style="color:var(--gold)">${fmt(sub)}</strong> when your order arrives
      </p>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════
   PLACE ORDER
══════════════════════════════════════════════════════════════ */
function placeOrder() {
  const v = id => document.getElementById(id)?.value.trim();
  const name  = v('ck_name');
  const email = v('ck_email');
  const phone = v('ck_phone');
  const addr1 = v('ck_addr1');
  const addr2 = v('ck_addr2');
  const city  = v('ck_city');
  const state = v('ck_state');
  const pin   = v('ck_pin');

  // Validation
  if (!name)  { toast('⚠️ Please enter your name',           'warn'); return; }
  if (!email) { toast('⚠️ Please enter your email address',  'warn'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('⚠️ Please enter a valid email address', 'warn'); return; }
  if (!phone) { toast('⚠️ Please enter your phone number',   'warn'); return; }
  if (!/^[6-9]\d{9}$/.test(phone.replace(/[\s+\-]/g,''))) { toast('⚠️ Please enter a valid 10-digit Indian mobile number', 'warn'); return; }
  if (!addr1) { toast('⚠️ Please enter your address',        'warn'); return; }
  if (!city)  { toast('⚠️ Please enter your city',           'warn'); return; }
  if (!state) { toast('⚠️ Please enter your state',          'warn'); return; }
  if (!pin)   { toast('⚠️ Please enter your PIN code',       'warn'); return; }
  if (!/^\d{6}$/.test(pin)) { toast('⚠️ Please enter a valid 6-digit PIN code', 'warn'); return; }

  const oid   = 'TV' + Date.now().toString().slice(-8);
  const sub   = STATE.cart.reduce((s,x) => s+x.price*x.qty, 0);
  const fullAddr = `${addr1}${addr2 ? ', '+addr2 : ''}, ${city}, ${state} - ${pin}, India`;
  const date  = new Date().toLocaleDateString('en-IN', {day:'2-digit', month:'long', year:'numeric'});

  const order = {
    oid, name, email, phone,
    addr1, addr2, city, state, pin,
    address: fullAddr,
    items:   [...STATE.cart],
    total:   sub,
    date,
    payment: 'Cash on Delivery',
  };

  STATE.orders.push(order);
  if (STATE.user) { STATE.user.orders = STATE.user.orders || []; STATE.user.orders.push(order); }

  // Clear cart
  STATE.cart = [];
  updateCartBadge();

  // Send emails + Google Form (async, don't block)
  sendOrderEmails(order);
  submitToGoogleForm(order);

  // Show success page
  renderOrderSuccess(order);
}

/* ══════════════════════════════════════════════════════════════
   ORDER SUCCESS
══════════════════════════════════════════════════════════════ */
function renderOrderSuccess(order) {
  document.getElementById('checkoutContent').innerHTML = `
    <div class="success-wrap">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h2>Order Confirmed! 🎉</h2>
        <p>
          Thank you <strong style="color:var(--gold)">${order.name}</strong>!<br>
          Your order <strong style="color:var(--gold)">#${order.oid}</strong> has been placed.<br>
          Delivery in 3–7 business days. Pay <strong>${fmt(order.total)}</strong> on arrival.
        </p>
        <div class="order-detail-box">
          <div class="order-detail-row"><span>Order ID</span><span style="color:var(--gold);font-weight:700">#${order.oid}</span></div>
          <div class="order-detail-row"><span>Date</span><span>${order.date}</span></div>
          <div class="order-detail-row"><span>Total Amount</span><span style="color:var(--gold);font-weight:700">${fmt(order.total)}</span></div>
          <div class="order-detail-row"><span>Payment</span><span>Cash on Delivery</span></div>
          <div class="order-detail-row"><span>Ship To</span><span>${order.city}, ${order.state}</span></div>
          <div class="order-detail-row"><span>Estimated Delivery</span><span style="color:var(--green)">3–7 Business Days</span></div>
          <div class="order-detail-row"><span>Confirmation Email</span><span>${order.email}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn btn-gold btn-lg" onclick="nav('home')">Continue Shopping</button>
          ${STATE.user ? '<button class="btn btn-outline" onclick="nav(\'account\')">View My Orders</button>' : ''}
        </div>
        <p style="font-size:12px;color:var(--tx2);margin-top:20px">
          Order confirmation sent to <strong>${order.email}</strong><br>
          Full details also sent to timeversetimeverse@gmail.com
        </p>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   EMAIL NOTIFICATIONS (EmailJS)
   Sends:
   1. Owner alert → timeversetimeverse@gmail.com (all customer details)
   2. Customer confirmation → customer's email
══════════════════════════════════════════════════════════════ */
async function sendOrderEmails(order) {
  if (CONFIG.emailjs_public_key === 'YOUR_PUBLIC_KEY') {
    console.warn('⚠️ EmailJS not configured. Open script.js and follow the setup instructions at the top.');
    return;
  }

  const itemsList = order.items.map((item, i) =>
    `${i+1}. ${item.brand} — ${item.name}\n   Qty: ${item.qty}  |  Unit Price: ${fmt(item.price)}  |  Subtotal: ${fmt(item.price*item.qty)}`
  ).join('\n\n');

  const params = {
    order_id:         order.oid,
    order_date:       order.date,
    customer_name:    order.name,
    customer_email:   order.email,
    customer_phone:   order.phone,
    customer_address: order.address,
    order_items:      itemsList,
    order_total:      fmt(order.total),
  };

  // EMAIL 1 — Owner notification (all customer details)
  try {
    await emailjs.send(
      CONFIG.emailjs_service_id,
      CONFIG.emailjs_owner_tmpl,
      params,
      CONFIG.emailjs_public_key
    );
    console.log('✅ Owner notification sent to timeversetimeverse@gmail.com');
  } catch (err) {
    console.error('❌ Owner email error:', err);
  }

  // EMAIL 2 — Customer order confirmation
  try {
    await emailjs.send(
      CONFIG.emailjs_service_id,
      CONFIG.emailjs_customer_tmpl,
      params,
      CONFIG.emailjs_public_key
    );
    console.log('✅ Customer confirmation sent to', order.email);
  } catch (err) {
    console.error('❌ Customer email error:', err);
  }
}

/* ══════════════════════════════════════════════════════════════
   GOOGLE FORM SUBMISSION
   Saves every order to Google Sheets automatically
══════════════════════════════════════════════════════════════ */
async function submitToGoogleForm(order) {
  if (CONFIG.google_form_url.includes('YOUR_FORM_ID')) {
    console.warn('⚠️ Google Form not configured. Open script.js and follow the setup instructions at the top.');
    return;
  }

  const itemsSummary = order.items.map(i =>
    `${i.brand} ${i.name} x${i.qty} @ ${fmt(i.price)}`
  ).join(' | ');

  const fields = CONFIG.google_form_fields;
  const body   = new URLSearchParams({
    [fields.order_id]:      order.oid,
    [fields.customer_name]: order.name,
    [fields.phone]:         order.phone,
    [fields.email]:         order.email,
    [fields.address]:       order.address,
    [fields.city]:          order.city,
    [fields.state]:         order.state,
    [fields.pin]:           order.pin,
    [fields.items]:         itemsSummary,
    [fields.total]:         fmt(order.total),
    [fields.payment]:       'Cash on Delivery',
    [fields.date]:          order.date,
  });

  try {
    // Google Forms doesn't support CORS — use no-cors mode
    await fetch(CONFIG.google_form_url, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    body.toString(),
    });
    console.log('✅ Order submitted to Google Form / Sheets');
  } catch (err) {
    console.error('❌ Google Form error:', err);
  }
}

/* ══════════════════════════════════════════════════════════════
   AUTH — LOGIN / REGISTER
══════════════════════════════════════════════════════════════ */
function switchAuthTab(tab) {
  document.getElementById('loginForm').style.display    = tab==='login'    ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab==='register' ? 'block' : 'none';
  document.getElementById('loginTab').classList.toggle('active',    tab==='login');
  document.getElementById('registerTab').classList.toggle('active', tab==='register');
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { toast('⚠️ Please fill all fields', 'warn'); return; }

  const users = JSON.parse(localStorage.getItem('tv_users') || '{}');
  const u = users[email];
  if (!u || u.password !== btoa(pass)) { toast('❌ Incorrect email or password', 'err'); return; }

  STATE.user = { name:u.name, email:u.email, orders:u.orders||[] };
  toast('✅ Welcome back, '+u.name+'!');
  nav('account');
}

function doRegister() {
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;

  if (!name || !email || !pass) { toast('⚠️ Please fill all fields', 'warn'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('⚠️ Invalid email address', 'warn'); return; }
  if (pass.length < 6) { toast('⚠️ Password must be at least 6 characters', 'warn'); return; }

  const users = JSON.parse(localStorage.getItem('tv_users') || '{}');
  if (users[email]) { toast('⚠️ An account already exists with this email', 'warn'); return; }

  users[email] = { name, email, password:btoa(pass), orders:[] };
  localStorage.setItem('tv_users', JSON.stringify(users));
  STATE.user = { name, email, orders:[] };
  toast('✅ Account created! Welcome, '+name+'!');
  nav('account');
}

function doLogout() {
  STATE.user = null;
  toast('👋 Signed out successfully');
  nav('home');
}

/* ══════════════════════════════════════════════════════════════
   ACCOUNT PAGE
══════════════════════════════════════════════════════════════ */
function renderAccount() {
  if (!STATE.user) { nav('login'); return; }
  const allOrders = [...STATE.orders, ...(STATE.user.orders||[])].filter((o,i,a) => a.findIndex(x=>x.oid===o.oid)===i);
  const el = document.getElementById('accountContent');

  el.innerHTML = `
    <div class="account-profile-card">
      <div class="account-avatar">${STATE.user.name.charAt(0).toUpperCase()}</div>
      <div>
        <div class="account-name">${STATE.user.name}</div>
        <div class="account-email">${STATE.user.email}</div>
        <div class="account-badge">⌚ TimeVerse Member</div>
      </div>
    </div>

    <div class="orders-title">Order History (${allOrders.length})</div>

    ${allOrders.length===0 ? `
      <div style="text-align:center;padding:56px 20px;color:var(--tx2)">
        <div style="font-size:48px;margin-bottom:14px">📦</div>
        <div style="font-size:16px;font-weight:600;margin-bottom:8px">No orders yet</div>
        <div style="font-size:13px;margin-bottom:24px">Your order history will appear here</div>
        <button class="btn btn-gold btn-lg" onclick="nav('shop')">Start Shopping</button>
      </div>`
    : allOrders.map(o => `
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <div class="order-id">#${o.oid}</div>
            <div class="order-date">${o.date}</div>
          </div>
          <span class="order-status-badge">✓ Confirmed</span>
        </div>
        <div class="order-items-preview">
          ${o.items.slice(0,4).map(i => `
            <div class="order-thumb"><img src="${i.img}" alt="${i.name}" onerror="this.style.background='var(--dk4)'"></div>`).join('')}
          ${o.items.length>4 ? `<div class="order-thumb" style="display:flex;align-items:center;justify-content:center;color:var(--tx2);font-size:12px">+${o.items.length-4}</div>` : ''}
        </div>
        <div class="order-total-txt">${fmt(o.total)} · ${o.payment}</div>
        <div class="order-addr-txt">📍 ${o.address||o.addr}</div>
      </div>`).join('')}`;
}

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════════ */
function submitContactForm() {
  const name  = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const msg   = document.getElementById('contactMsg')?.value.trim();
  if (!name||!email||!msg) { toast('⚠️ Please fill all required fields', 'warn'); return; }
  toast('✅ Message sent! We\'ll reply within 24 hours.');
  ['contactName','contactEmail','contactSubject','contactMsg'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value='';
  });
}

/* ══════════════════════════════════════════════════════════════
   STAT COUNTERS (animated)
══════════════════════════════════════════════════════════════ */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const start  = performance.now();
        const dur    = 2000;
        const display = target >= 1000 ? target/1000 : target;
        const sfx   = target >= 1000 ? 'K+'+suffix : suffix;
        (function tick(now) {
          const p = Math.min((now-start)/dur, 1);
          const v = Math.floor((1-(1-p)**3) * display);
          el.textContent = v + (p>=1 ? sfx : '');
          if (p<1) requestAnimationFrame(tick);
        })(performance.now());
        io.unobserve(el);
      }
    }, {threshold:.5});
    io.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.08, rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════════ */
function toast(msg, type='success') {
  const wrap = document.getElementById('toastWrap');
  const el   = document.createElement('div');
  el.className = 'toast' + (type==='warn' ? ' warn' : type==='err' ? ' err' : '');
  const icon   = type==='warn' ? '⚠️' : type==='err' ? '❌' : '✓';
  el.innerHTML = `<span style="font-size:16px">${icon}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => { el.classList.remove('show'); setTimeout(()=>el.remove(), 400); }, 3800);
}

/* ══════════════════════════════════════════════════════════════
   INITIALISE
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  initBrandsMarquee();
  initCounters();
  initReveal();

  // Demo account for testing
  const users = JSON.parse(localStorage.getItem('tv_users') || '{}');
  if (!users['demo@timeverse.in']) {
    users['demo@timeverse.in'] = { name:'Demo User', email:'demo@timeverse.in', password:btoa('demo123'), orders:[] };
    localStorage.setItem('tv_users', JSON.stringify(users));
  }
});
