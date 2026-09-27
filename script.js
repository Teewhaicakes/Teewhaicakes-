const products = [
  {name:"Meat Pie", price:"₦1,200", category:"Pastries"},
  {name:"Doughnut", price:"₦800", category:"Pastries"},
  {name:"Sausage Roll", price:"₦1,000", category:"Pastries"},
  {name:"Basic Cake — Small, Uniced", price:"₦5,000", category:"Cakes"},
  {name:"Basic Cake — Big, Uniced", price:"₦10,000", category:"Cakes"},
  {name:"Customized Celebration Cake", price:"Contact vendor", category:"Cakes"},
  {name:"Yoghurt Parfait", price:"₦5,000", category:"Parfaits"},
  {name:"Cake Parfait — Small", price:"₦3,500", category:"Parfaits"},
  {name:"Cake Parfait — Big", price:"₦5,000", category:"Parfaits"},
  {name:"Chinchin", price:"₦500–₦3,000", category:"Pastries"},
  {name:"Event Décor & Food Catering", price:"Contact vendor", category:"Décor"}
];

const grid = document.getElementById("product-grid");
const filters = document.querySelectorAll(".filter");
const wa = "https://wa.me/2348187402892?text=";

function render(filter = "all") {
  const shown = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = shown.map(p => {
    const message = encodeURIComponent(`Hello Teewhai Cakes and More, I would like to order/inquire about ${p.name}.`);
    return `
      <article class="product-card">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="product-bottom">
          <span class="price">${p.price}</span>
          <a class="order-small" href="${wa}${message}" target="_blank" rel="noopener">Order</a>
        </div>
      </article>`;
  }).join("");
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
});

document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const old = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => btn.textContent = old, 1500);
    } catch {
      alert("Account number: " + btn.dataset.copy);
    }
  });
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => document.querySelector(".nav").classList.remove("open"));
});

render();
