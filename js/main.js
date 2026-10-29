/* =========================================================
   Bright Minds Centre — site script
   >>> EDIT THESE TWO SETTINGS FIRST <<<
   ========================================================= */
const SITE = {
  whatsapp: "2348000000000",      // WhatsApp number, international format, no + or spaces
  currency: "₦"
};

document.addEventListener("DOMContentLoaded", () => {
  // Hairline under the header once the page scrolls
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Mark current page in the menu
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Year in footer
  document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Every link with class "js-wa" opens WhatsApp with its data-msg
  document.querySelectorAll(".js-wa").forEach((a) => {
    const msg = a.dataset.msg || "Hello, I would like to make an enquiry.";
    a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
    a.target = "_blank"; a.rel = "noopener";
  });

  initShopFilter();
  initCart();
  initContactForm();
});

/* ---------- Shop category filter ---------- */
function initShopFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;
  buttons.forEach((btn) => btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    document.querySelectorAll("[data-category]").forEach((item) => {
      item.style.display = cat === "all" || item.dataset.category === cat ? "" : "none";
    });
  }));
}

/* ---------- Cart (saved in the visitor's browser) ---------- */
let cart = [];
function loadCart() { try { cart = JSON.parse(localStorage.getItem("bm_cart") || "[]"); } catch (e) { cart = []; } }
function saveCart() { try { localStorage.setItem("bm_cart", JSON.stringify(cart)); } catch (e) {} }
const money = (n) => SITE.currency + Number(n).toLocaleString("en-NG");

function initCart() {
  loadCart();
  document.querySelectorAll(".js-add").forEach((btn) => btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const name = card.querySelector("h3").textContent.trim();
    const price = Number(card.dataset.price || 0);
    const found = cart.find((i) => i.name === name);
    found ? found.qty++ : cart.push({ name, price, qty: 1 });
    saveCart(); renderCart();
    btn.innerHTML = '<i class="bi bi-check2"></i> Added';
    setTimeout(() => (btn.innerHTML = '<i class="bi bi-plus-lg"></i> Add to order'), 1200);
  }));
  const checkout = document.getElementById("cartCheckout");
  if (checkout) checkout.addEventListener("click", sendOrder);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll(".cart-count").forEach((el) => (el.textContent = count));
  const onShop = document.body.dataset.page === "shop";
  document.querySelectorAll(".cart-fab").forEach((b) => b.classList.toggle("is-empty", !count && !onShop));
  const list = document.getElementById("cartItems");
  if (!list) return;
  if (!cart.length) {
    list.innerHTML = '<p class="text-muted-soft text-center py-4">Your order list is empty.</p>';
  } else {
    list.innerHTML = cart.map((i, idx) => `
      <div class="cart-line">
        <div><div class="fw-bold">${i.name}</div><small class="text-muted-soft">${money(i.price)} each</small></div>
        <div class="d-flex align-items-center gap-2">
          <button class="qty-btn" data-idx="${idx}" data-d="-1" aria-label="Less">−</button>
          <span class="fw-bold">${i.qty}</span>
          <button class="qty-btn" data-idx="${idx}" data-d="1" aria-label="More">+</button>
        </div>
      </div>`).join("");
    list.querySelectorAll(".qty-btn").forEach((b) => b.addEventListener("click", () => {
      const item = cart[b.dataset.idx];
      item.qty += Number(b.dataset.d);
      if (item.qty <= 0) cart.splice(b.dataset.idx, 1);
      saveCart(); renderCart();
    }));
  }
  const total = document.getElementById("cartTotal");
  if (total) total.textContent = money(cart.reduce((s, i) => s + i.qty * i.price, 0));
}

function sendOrder() {
  if (!cart.length) return;
  const lines = cart.map((i) => `• ${i.name} x${i.qty} — ${money(i.qty * i.price)}`).join("\n");
  const total = money(cart.reduce((s, i) => s + i.qty * i.price, 0));
  const msg = `Hello, I would like to order:\n\n${lines}\n\nTotal: ${total}\n\nName:\nDelivery address:`;
  window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ---------- Contact / booking form → WhatsApp ---------- */
function initContactForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    // If the form has an action (e.g. Formspree), let it submit normally
    if (form.getAttribute("action")) return;
    e.preventDefault();
    const d = new FormData(form);
    const msg = `New enquiry from the website\n\nParent/Guardian: ${d.get("name")}\nPhone: ${d.get("phone")}\nEmail: ${d.get("email") || "-"}\nChild's age: ${d.get("age") || "-"}\nService: ${d.get("service")}\n\nMessage: ${d.get("message") || "-"}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  });
}
