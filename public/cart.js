// cart.js: draws the page and calls the functions you write in api.js.
// You do NOT need to change this file. Read it to see WHEN each api.js function runs.

const productList = document.querySelector("#product-list");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const clearButton = document.querySelector("#clear-cart");
const dbStatus = document.querySelector("#db-status");
const message = document.querySelector("#message");
const messageText = document.querySelector("#message-text");

// The products, once getProducts() brings them from the server.
let products = [];

function money(amount) {
  return "$" + amount.toFixed(2);
}

// Shows errors in the red message at the top (and in the console).
function showMessage(error) {
  console.error(error);
  messageText.textContent = `${error.name}: ${error.message}`;
  message.classList.remove("hidden");
}

document.querySelector("#message-close").addEventListener("click", () => {
  message.classList.add("hidden");
});

// Swaps a button's text for a moment ("Added ✓"), then puts it back.
function flash(button, text) {
  const original = button.innerHTML;
  button.innerHTML = text;
  button.disabled = true;
  setTimeout(() => {
    button.innerHTML = original;
    button.disabled = false;
  }, 900);
}

// ---------- Database status (Day 1: connectDB on the server) ----------
async function renderStatus() {
  try {
    const status = await getStatus();
    const collections = status.collections.join(", ") || "none yet";
    dbStatus.innerHTML = `<span class="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_0_3px] shadow-green-500/25"></span><span class="text-green-800">Connected to <b>${status.database}</b> on <b>${status.where}</b>. Collections: <b>${collections}</b></span>`;
  } catch (error) {
    dbStatus.innerHTML = `<span class="h-2.5 w-2.5 rounded-full bg-navy/25"></span><span class="text-navy/60">Database not connected: ${error.message}</span>`;
  }
}

// ---------- Products (Day 2: getProducts) ----------
async function renderProducts() {
  try {
    products = await getProducts();
  } catch (error) {
    productList.innerHTML = `<p class="rounded-xl border-2 border-dashed border-navy/20 px-4 py-6 text-center text-navy/60 lg:col-span-3">${error.message}</p>`;
    return;
  }

  productList.innerHTML = products.map((product) => `
    <article class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-navy/5 transition duration-200 hover:-translate-y-1.5 hover:shadow-xl">
      <div class="dots relative grid h-28 place-items-center lg:h-36">
        ${product.tag ? `<span class="absolute left-3 top-3 -skew-x-12 bg-navy px-2 py-0.5 font-display text-xs font-bold uppercase tracking-widest text-white">${product.tag}</span>` : ""}
        <span class="text-6xl drop-shadow-lg transition duration-200 group-hover:scale-110 group-hover:-rotate-6">${product.emoji}</span>
        <img src="./images/chevrons-lined-white.png" alt="" class="absolute bottom-2 right-2 w-14 opacity-60">
      </div>
      <div class="flex flex-1 flex-col p-4">
        <h3 class="font-display text-xl font-bold uppercase italic leading-tight">${product.name}</h3>
        <p class="mt-1 mb-4"><span class="rounded-md bg-orange px-2 py-0.5 font-bold text-navy">${money(product.price)}</span></p>
        <button data-action="add" data-id="${product._id}"
          class="mt-auto rounded-lg bg-navy px-3 py-2.5 font-display text-base font-bold uppercase italic tracking-wide text-white transition hover:bg-linear-to-r hover:from-sunrise hover:to-flame active:scale-95">
          Add to cart »
        </button>
      </div>
    </article>
  `).join("");
}

// ---------- Cart (Day 2: getCart) ----------
async function renderCart() {
  try {
    const items = await getCart();

    if (items.length === 0) {
      cartList.innerHTML = `<li class="rounded-xl border-2 border-dashed border-white/20 px-4 py-6 text-center text-white/60">Your cart is empty. <a href="#products" class="font-semibold text-orange hover:underline">Gear up »</a></li>`;
    } else {
      cartList.innerHTML = items.map((item) => `
        <li class="flex items-center gap-3 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-linear-to-br from-sunrise to-flame text-2xl">${item.emoji}</span>
          <div class="min-w-0 flex-1">
            <p class="font-semibold leading-tight">${item.name}</p>
            <p class="text-sm text-white/60">${money(item.price)} each</p>
          </div>
          <div class="flex items-center gap-1">
            <button data-action="minus" data-id="${item._id}" aria-label="One less" class="h-7 w-7 rounded-md bg-white/10 font-bold hover:bg-orange hover:text-navy">−</button>
            <span class="w-6 text-center font-display text-lg font-bold">${item.qty}</span>
            <button data-action="plus" data-id="${item._id}" aria-label="One more" class="h-7 w-7 rounded-md bg-white/10 font-bold hover:bg-orange hover:text-navy">+</button>
          </div>
          <button data-action="remove" data-id="${item._id}" aria-label="Remove ${item.name}" class="px-1 text-white/50 hover:text-flame">✕</button>
        </li>
      `).join("");
    }

    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (cartCount.textContent !== String(count)) {
      cartCount.classList.remove("bump");
      void cartCount.offsetWidth; // restart the animation
      cartCount.classList.add("bump");
    }
    cartCount.textContent = count;
    cartTotal.textContent = money(total);
  } catch (error) {
    cartList.innerHTML = `<li class="rounded-xl border-2 border-dashed border-white/20 px-4 py-4 text-sm text-white/60">${error.message}</li>`;
  }
}

// ---------- Buttons ----------
// One click listener for the whole page. data-action says which button it was.
document.body.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const product = products.find((p) => p._id === id);

  try {
    if (button.dataset.action === "add") await addToCart(product);         // Day 3
    if (button.dataset.action === "plus") await changeQuantity(id, 1);      // Day 3
    if (button.dataset.action === "minus") await changeQuantity(id, -1);    // Day 3
    if (button.dataset.action === "remove") await removeFromCart(id);       // Day 4
    message.classList.add("hidden");
    if (button.dataset.action === "add") flash(button, "Added ✓");
  } catch (error) {
    showMessage(error);
  }

  await renderCart();
});

clearButton.addEventListener("click", async () => {
  try {
    await clearCart(); // Day 4
    message.classList.add("hidden");
  } catch (error) {
    showMessage(error);
  }
  await renderCart();
});

// ---------- Start ----------
async function start() {
  await renderStatus();
  await renderProducts();
  await renderCart();
}

start();
