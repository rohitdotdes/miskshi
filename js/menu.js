/* Header mega menu and search */
const MG = {
  cols: [
    [
      "Lower Wear",
      ["Sweatpants", "Shorts", "Longue wear", "Jeans", "Jeans", "Pants"],
    ],
    ["Upper Wear", ["Sweatshits", "Tshirts", "Shirts", "Jackets", "Vest"]],
    [
      "Accessories",
      ["Cap", "Wallet", "Scarfs", "Belt", "Necklace", "Bracelet"],
    ],
    ["Footwear", ["Shoes", "Socks", "Laces", "Shoe charm"]],
  ],
};
function mg(n) {
  document
    .querySelectorAll(".nv")
    .forEach((e) => e.classList.toggle("on", e.dataset.n == n));
  const m = $("#mega");
  if (!n) {
    m.classList.remove("on");
    return;
  }
  m.innerHTML =
    MG.cols
      .map(
        (c) =>
          `<div class="w-[115px]"><h4>${c[0]}</h4>${[...c[1], ...(n == "Women" && c[0] == "Lower Wear" ? ["Skirts"] : [])].map((x) => `<a href="#shop" data-a="cat" data-v="${x}">${x}</a>`).join("")}<a href="#shop" data-a="cat" data-v="All" class="font-medium">Shop all</a></div>`,
      )
      .join("") +
    `<div class="ml-auto relative w-[219px] h-[278px] rounded-lg overflow-hidden flex items-end" style="background:linear-gradient(170deg,#c9cde0,#8e97b3 60%,#3a4258)"><button data-a="lucky" class="w-full h-[43px] rounded-lg border-0 text-2xl text-black" style="background:var(--g2)">feeling lucky?</button></div>`;
  m.classList.add("on");
}
$("#nav").addEventListener("mouseover", (e) => {
  const n = e.target.dataset.n;
  if (n) mg(n);
});
$("#q").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    S.f = { q: e.target.value.toLowerCase() };
    S.crumb = "Search";
    S.n = 8;
    location.hash == "#shop" ? render() : (location.hash = "shop");
  }
});
