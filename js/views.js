/* Page templates (home, shop, filter panel, product, bag) and router */
const tile = (p, big) =>
  `<a href="#product-${p.id}" class="tile block relative"><div class="ph w-full relative overflow-hidden" style="aspect-ratio:${big ? "420/340" : "300/340"}"><img src="img/p${p.id}.jpg" alt="${p.name}" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()"></div><button data-a="heart" data-v="${p.id}" class="h absolute top-3 right-3 w-9 h-9 rounded-full border-0 bg-white text-black">${S.wish.has(p.id) ? "♥" : "♡"}</button><p class="font-medium mt-3 mb-1">${p.name}</p><p class="text-sm m-0" style="color:var(--mut)">${money(p.price)}</p></a>`;
function list() {
  let l = P.filter(
    (p) =>
      (!S.f.fit || p.fit == S.f.fit) &&
      (!S.f.col || p.col == S.f.col) &&
      (!S.f.g || p.g == S.f.g) &&
      (!S.f.cat || p.cat == S.f.cat) &&
      (!S.f.fab || p.fab == S.f.fab) &&
      (!S.f.sz || p.sz.includes(S.f.sz)) &&
      (!S.f.q || (p.name + p.col).toLowerCase().includes(S.f.q)) &&
      (!S.f.price || (S.f.price == "u" ? p.price < 1099 : p.price >= 1099)),
  );
  const s = S.sort;
  if (s == "Price low to high") l.sort((a, b) => a.price - b.price);
  else if (s == "Price high to low") l.sort((a, b) => b.price - a.price);
  else if (s == "Ratings") l.sort((a, b) => b.r - a.r);
  else if (s == "Relevance") l.sort((a, b) => a.id - b.id);
  else l.sort((a, b) => b.id - a.id);
  return l;
}
const PS = [
  ["sort", "Sort"],
  ["g", "Department"],
  ["cat", "Category"],
  ["fit", "Fit"],
  ["sz", "Size"],
  ["fab", "Fabric"],
  ["col", "Colour"],
  ["price", "Price"],
];
function panel() {
  const f = S.f,
    val = (k) =>
      k == "sort"
        ? S.sort
        : k == "price"
          ? (FO.price.find((x) => x[0] == f.price) || [0, "All"])[1]
          : f[k] || "All",
    ops = (k) =>
      k == "sort"
        ? SO.map((o) => [o, o])
        : FO[k].map((o) => (Array.isArray(o) ? o : [o, o]));
  return `<aside class="w-full lg:w-[360px] shrink-0 p-4 flex flex-col gap-[19px] lg:sticky lg:top-[75px] self-start" style="background:var(--bg)"><button data-a="fp" aria-label="Close filters" class="self-end bg-transparent border-0 p-0 text-2xl leading-none">×</button>${PS.map(
    ([k, n]) =>
      `<div><button data-a="pi" data-v="${k}" class="w-full flex justify-between items-start text-left bg-transparent border-0 p-0"><span><span class="block text-2xl">${n}</span>${S.pi == k ? "" : `<span class="block" style="color:#5f5f5f">${val(k)}</span>`}</span><span>▾</span></button>${
        S.pi == k
          ? `<div class="flex flex-col gap-2.5 mt-2.5">${ops(k)
              .map((o) => {
                const on = k == "sort" ? S.sort == o[0] : f[k] == o[0];
                return `<button data-a="${k == "sort" ? "sort" : "setf"}" data-v="${k == "sort" ? o[0] : k + "|" + (on ? "" : o[0])}" class="flex justify-between w-full bg-transparent border-0 p-0" style="color:var(--mut)">${o[1]}<i style="width:18px;height:18px;margin-right:3px;border:2px solid var(--fg);border-radius:3px;font-size:12px;line-height:14px;text-align:center;font-style:normal;color:var(--fg)">${on ? "✓" : ""}</i></button>`;
              })
              .join("")}</div>`
          : ""
      }</div>`,
  ).join(
    "",
  )}<button data-a="clr" class="text-left underline bg-transparent border-0 p-0" style="color:var(--mut)">Clear all</button></aside>`;
}
const VIEW = {
  home: () => `<section class="relative flex flex-col justify-end overflow-hidden min-h-[560px] lg:h-[808px]" style="background:url(img/hero.jpg) center/cover,radial-gradient(circle at 55% 40%,#3b4a58,#2c3844 65%);color:#fff">
 <svg class="absolute left-1/2 top-[12%] -translate-x-1/2 w-[min(420px,70%)] opacity-90" viewBox="0 0 200 190"><path d="M60 8 40 14 5 50l22 28 18-12v118h110V66l18 12 22-28-35-36-20-6c-4 14-20 22-40 22S64 22 60 8z" fill="#3d4650" stroke="#34d44b" stroke-opacity=".5" stroke-width="2"/></svg>
 <div class="absolute left-5 lg:left-[60px] top-8 lg:top-12"><i style="font:700 34px Caveat,cursive;color:var(--g2)">miskshi presents</i><h1 class="d m-0 text-[clamp(28px,5vw,64px)] leading-none normal-case" style="color:var(--g2)">The Miscelenious Shirt</h1></div>
 <div class="absolute right-5 lg:right-[60px] bottom-20 text-right"><i style="font:700 34px Caveat,cursive;color:var(--g2)">Designed with</i><div class="d text-[clamp(28px,5vw,64px)] normal-case" style="color:var(--g2)">Tren Tech</div></div>
 <div class="flex justify-between px-5 lg:px-[60px] py-4 font-medium text-sm lg:text-base relative"><span>30-day returns</span><span>Cash On Delivery</span><span>Free shipping over 999</span></div></section>
 <section class="grid md:grid-cols-2">${[
   [
     "The Dark Kinight Collection",
     "linear-gradient(160deg,#6a7279,#20262b)",
     "dark-knight",
   ],
   [
     "The White Knight Collection",
     "linear-gradient(160deg,#d7dade,#8b939b)",
     "white-knight",
   ],
 ]
   .map(
     (c) =>
       `<div class="relative h-[420px] lg:h-[760px] flex items-end justify-between p-6 text-white" style="background:url(img/${c[2]}.jpg) center/cover,${c[1]}"><div class="absolute inset-0" style="background:linear-gradient(180deg,#2c384400 87%,#2c3844)"></div><b class="relative text-xl lg:text-2xl font-semibold">${c[0]}</b><button data-a="shop" data-v="${c[0]}" class="relative border-0 rounded-lg px-7 py-3 text-xl lg:text-2xl text-black" style="background:var(--g2)">Shop</button></div>`,
   )
   .join("")}</section>
 <section class="px-5 lg:px-[60px] pt-8"><h2 class="d py-4 m-0 lg:text-[28px]">New Featured Products</h2><div class="grid md:grid-cols-3 gap-[30px]">${P.slice(
   0,
   3,
 )
   .map((p) => tile(p, 1))
   .join("")}</div></section>
 <section class="px-5 lg:px-[60px] pt-8"><h2 class="d py-4 m-0 lg:text-[28px]">New drops</h2><div class="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">${P.slice(
   3,
   11,
 )
   .map((p) => tile(p))
   .join("")}</div></section>`,
  shop: () => {
    const l = list(),
      f = S.f,
      lab = {
        fit: f.fit || "Fit",
        col: f.col || "Colour",
        price: f.price ? FO.price.find((x) => x[0] == f.price)[1] : "Price",
        g: "Gender: " + (f.g || "all"),
      };
    const chips = ["fit", "col", "price", "g"]
      .map(
        (k) =>
          `<div class="relative"><button data-a="open" data-v="${k}" class="ch ${(k == "g" ? f.g : f[k]) ? "sel" : ""}">${lab[k]}</button>${S.open == k ? `<div class="absolute z-10 top-11 left-0 rounded-lg p-2 min-w-[190px]" style="background:var(--bg);border:1px solid var(--ln);box-shadow:0 8px 24px #0002">${[["", k == "g" ? "All" : "Any"], ...FO[k].map((o) => (Array.isArray(o) ? o : [o, o]))].map((o) => `<button data-a="setf" data-v="${k}|${o[0]}" class="block w-full text-left bg-transparent border-0 p-2 rounded hover:bg-black/5">${o[1]}</button>`).join("")}</div>` : ""}</div>`,
      )
      .join("");
    return `<div class="px-5 lg:px-[60px] py-1.5 ${S.fp ? "hidden" : "flex"} flex-wrap items-center justify-between gap-3" style="border-bottom:1px solid var(--ln)"><div class="flex flex-wrap gap-3"><button data-a="fp" class="ch">⚲ Filter</button>${chips}</div><div class="relative"><button data-a="open" data-v="sort" class="bg-transparent border-0 p-0">Sort: ${S.sort} ▾</button>${S.open == "sort" ? `<div class="absolute right-0 top-8 z-10 rounded-lg p-2 min-w-[200px]" style="background:var(--bg);border:1px solid var(--ln);box-shadow:0 8px 24px #0002">${SO.map((o) => `<button data-a="sort" data-v="${o}" class="block w-full text-left bg-transparent border-0 p-2 rounded hover:bg-black/5">${o}</button>`).join("")}</div>` : ""}</div></div>
 <div class="${S.fp ? "flex flex-col lg:flex-row items-start" : ""}">${S.fp ? panel() : ""}<div class="flex-1 min-w-0 ${S.fp ? "lg:-ml-5" : ""}"><p class="px-5 lg:px-[60px] mb-5 ${S.fp ? "text-2xl font-semibold pt-4" : "mt-[60px] text-sm"}" style="color:${S.fp ? "#5f5f5f" : "var(--mut)"}">Home / ${S.crumb}${f.q ? ` / “${f.q}”` : ""} · ${l.length} items</p>
 <div class="px-5 lg:px-[60px] grid grid-cols-2 ${S.fp ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-x-5 lg:gap-x-10 gap-y-10">${
   l
     .slice(0, S.n)
     .map((p) => tile(p))
     .join("") || "<p>No tees match. Try clearing filters.</p>"
 }</div>
 ${l.length > S.n ? `<div class="text-center mt-12"><button data-a="more" class="btn w-[220px]">Load more</button></div>` : ""}</div></div>`;
  },
  bag: () => {
    const n = S.bag.reduce((a, b) => a + b.qty, 0),
      sub = S.bag.reduce((a, b) => a + b.qty * b.price, 0),
      ship = !sub || sub >= 999 ? 0 : 99;
    return `<div class="px-5 lg:px-[60px] pt-11"><h1 class="m-0 text-[32px] font-bold">Your bag (${n})</h1><div class="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-20 mt-10">
 <div>${S.bag.map((b, i) => `<div class="flex gap-6 py-6" style="border-bottom:1px solid var(--ln)"><div class="ph shrink-0 w-[100px] h-[125px] lg:w-[120px] lg:h-[150px]"${b.rarity ? ` style="outline:2px solid ${R[b.rarity].c}"` : ""}></div><div><p class="m-0 font-semibold text-lg">${b.name}</p><p class="my-1">${money(b.price)}</p><p class="m-0 text-sm" style="color:var(--mut)">Size ${b.size}, ${b.fit}${b.rarity ? ` · <b style="color:${R[b.rarity].c}">${R[b.rarity].n} #${b.serial}/${R[b.rarity].t}</b>` : ""}</p><div class="ch inline-flex items-center gap-4 mt-4"><button data-a="qty" data-v="${i}|-1" class="bg-transparent border-0">−</button>${b.qty}<button data-a="qty" data-v="${i}|1" class="bg-transparent border-0">+</button></div></div></div>`).join("") || `<p>Your bag is empty. <a class="underline" href="#shop">Keep shopping</a></p>`}</div>
 <div class="rounded-xl p-8 self-start" style="border:1px solid var(--ln)"><h3 class="m-0 mb-6 text-[22px] font-semibold">Summary</h3><p class="flex justify-between"><span>Subtotal</span>${money(sub)}</p><p class="flex justify-between"><span>Shipping</span>${ship ? money(ship) : "Free"}</p><hr style="border:0;border-top:1px solid var(--ln)" class="my-5"><p class="flex justify-between text-xl font-semibold m-0 mb-6"><span>Total</span>${money(sub + ship)}</p><button data-a="pay" class="btn g w-full">Pay securely</button><p class="text-sm mt-4 mb-0" style="color:var(--mut)">30-day returns</p></div></div></div>`;
  },
  product: (id) => {
    const p = P.find((x) => x.id == id) || P[0],
      ch = (a, v, w) =>
        `<button data-a="${a}" data-v="${v}" class="ch ${(a == "sz" ? S.sz : S.ft) == v ? "on" : ""}" style="height:48px;width:${w}px;padding:0">${v}</button>`;
    return `<div class="px-5 lg:px-[60px] pt-11 grid lg:grid-cols-[640px_1fr] gap-10 lg:gap-[80px]"><div class="ph relative overflow-hidden h-[480px] lg:h-[800px] flex items-center justify-center text-xl font-medium" style="color:#8a8a8a">Main photo<img src="img/p${p.id}.jpg" alt="${p.name}" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()"></div><div class="lg:max-w-[600px]">
 <h1 class="m-0 text-[40px] font-bold">${p.name}</h1><p class="my-3 text-[28px]">${money(p.price)}</p>
 <p class="mt-8 mb-2 text-sm font-medium" style="color:var(--mut)">Size</p><div class="flex gap-3">${["S", "M", "L", "XL"].map((s) => ch("sz", s, 64)).join("")}</div>
 <p class="mt-6 mb-2 text-sm font-medium" style="color:var(--mut)">Fit</p><div class="flex gap-3">${["Regular", "Oversized"].map((s) => ch("ft", s, 140)).join("")}</div>
 <div class="flex gap-4 mt-10"><button data-a="add" data-v="${p.id}" class="btn g flex-1">Add to bag</button><button data-a="heart" data-v="${p.id}" class="btn w-[200px]">${S.wish.has(p.id) ? "♥" : "♡"} Wishlist</button></div>
 <div class="mt-12">${[
   ["Details", "100% cotton, 240 GSM, screen-printed. Dummy copy."],
   ["Size guide", "S 38 · M 40 · L 42 · XL 44 (chest, inches)."],
   ["Returns", "30-day returns. Cash On Delivery available."],
 ]
   .map(
     (a) =>
       `<div style="border-top:1px solid var(--ln)"><button data-a="acc" data-v="${a[0]}" class="w-full flex justify-between bg-transparent border-0 py-5 font-medium">${a[0]}<span class="text-xl">${S.acc == a[0] ? "−" : "+"}</span></button>${S.acc == a[0] ? `<p class="mt-0 pb-5" style="color:var(--mut)">${a[1]}</p>` : ""}</div>`,
   )
   .join(
     "",
   )}<div style="border-top:1px solid var(--ln)"></div></div></div></div>`;
  },
};
function render() {
  const h = location.hash.slice(1) || "home",
    v = h.startsWith("product-")
      ? VIEW.product(h.slice(8))
      : (VIEW[h] || VIEW.home)();
  $("#app").innerHTML = v;
  const n = S.bag.reduce((a, b) => a + b.qty, 0);
  $("#hb").textContent = n ? `Bag (${n})` : "Bag";
  $("#hw").textContent = S.wish.size ? `♥ ${S.wish.size}` : "♡";
}
addEventListener("hashchange", () => {
  S.open = "";
  render();
  scrollTo(0, 0);
});
