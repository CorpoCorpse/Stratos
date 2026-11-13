// Cart is saved in localStorage as { "Product name": { price, qty } }
const getCart = () => JSON.parse(localStorage.getItem("cart") || "{}");
const peso = n => "₱" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

// Products page: add to cart
document.querySelectorAll(".add").forEach(btn => {
  btn.onclick = () => {
    const card = btn.parentElement;
    const name = card.querySelector("h3").textContent;
    const price = parseFloat(card.querySelector("p").textContent.replace(/[^\d.]/g, ""));
    const cart = getCart();
    cart[name] = { price, qty: (cart[name]?.qty || 0) + 1 };
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
  };
});

// Cart page: show items
const table = document.querySelector(".cart-table");
if (table) {
  let total = 0;
  for (const [name, { price, qty }] of Object.entries(getCart())) {
    total += price * qty;
    table.insertRow().innerHTML =
      `<td>${name}</td><td>${peso(price)}</td><td>${qty}</td><td>${peso(price * qty)}</td>`;
  }
  document.getElementById("grand-total").textContent = "Total: " + peso(total);
  document.getElementById("clear").onclick = () => {
    localStorage.removeItem("cart");
    location.reload();
  };
}
