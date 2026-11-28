/* Feeling Lucky quiz, rarity roll and reveal */
const R = {
  uncommon: { n: "Uncommon", t: 1000, off: 0.2, c: "#34d44b", w: 70 },
  rare: { n: "Rare", t: 100, off: 0.35, c: "#4da6ff", w: 22 },
  epic: { n: "Epic", t: 50, off: 0.5, c: "#b66dff", w: 7.5 },
  legendary: { n: "Legendary", t: 1, off: 0.7, c: "#ffd23f", w: 0.5 },
};
const Q = [
  {
    k: "a",
    q: "yo, what’s your aesthetic?",
    o: ["Streetwear", "Gothic", "Y2K", "Techwear", "Grunge", "Minimal"],
  },
  {
    k: "s",
    q: "what shows or movies are you into?",
    o: ["Anime", "Sci-fi", "Noir", "Horror", "Crime", "Rom-com"],
    m: 1,
  },
  {
    k: "f",
    q: "what fit do you rock with?",
    o: ["Oversized", "Baggy", "Regular", "Cropped"],
  },
];
let ST = ld("mk-stock", { uncommon: 1000, rare: 100, epic: 50, legendary: 1 }),
  L = { i: 0, a: {}, force: 0 };
const typeIt = (el, t) => {
  let i = 0;
  el.textContent = "";
  const x = setInterval(() => {
    el.textContent = t.slice(0, ++i);
    if (i >= t.length) clearInterval(x);
  }, 22);
};
function openLucky() {
  L = { i: 0, a: {}, force: 0 };
  $("#lk").classList.add("on");
  mg();
  step();
}
function step() {
  const lk = $("#lk");
  if (L.i > 2) return scan();
  const q = Q[L.i],
    a = L.a[q.k] || [];
  lk.innerHTML = `<button data-a="lx" class="fixed top-5 right-6 bg-transparent border-0 text-3xl text-white">×</button><div class="lq"><p class="m-0 mb-3 font-semibold" style="color:var(--g2)">feeling lucky? · 0${L.i + 1}/03</p><h2 id="qt" class="d normal-case text-[clamp(26px,5vw,44px)] m-0 mb-10"></h2><div>${q.o.map((o) => `<button class="lc ${a.includes(o) ? "on" : ""}" data-a="pick" data-v="${o}">${o}</button>`).join("")}</div>${q.m ? `<input id="lt" placeholder="or type your own… (e.g. Death Note)" class="fld mt-4" style="background:#ffffff18;color:#fff">` : ""}<button data-a="next" class="btn g mt-8 px-10">${L.i == 2 ? "Unlock my drop" : "Next →"}</button></div>`;
  typeIt($("#qt"), q.q);
}
function scan() {
  const A = L.a,
    w = (k) => (A[k] || ["mystery"]).join(" + "),
    ls = [
      `reading your ${w("a")} energy…`,
      `cross-checking ${w("s")}…`,
      `matching ${w("f")} silhouettes…`,
      "checking the vault for stock…",
    ];
  $("#lk").innerHTML =
    `<div class="lq"><h2 class="d normal-case text-[clamp(26px,5vw,44px)] m-0 mb-8">thinking…</h2><p id="sc" class="text-xl" style="color:var(--g2)"></p><div class="bar mt-8"><i></i></div></div>`;
  ls.forEach((t, i) =>
    setTimeout(() => {
      const e = $("#sc");
      e && typeIt(e, t);
    }, i * 600),
  );
  setTimeout(reveal, 2500);
}
function reveal() {
  const av = Object.keys(R).filter((k) => ST[k] > 0);
  let r = L.force && ST.legendary > 0 ? "legendary" : null;
  if (!r) {
    let t = av.reduce((a, k) => a + R[k].w, 0) * Math.random();
    r = av.find((k) => (t -= R[k].w) < 0) || "uncommon";
  }
  const D = R[r],
    a = L.a,
    serial = D.t - ST[r] + 1,
    fit = (a.f || ["Oversized"])[0],
    name = `${(a.a || ["Mystery"])[0]} ${NAMES[Math.floor(Math.random() * 12)]}`,
    price = Math.round(1499 * (1 - D.off));
  ST[r]--;
  sv("mk-stock", ST);
  L.prize = {
    key: "L" + r + serial,
    name,
    price,
    size: "M",
    fit,
    qty: 1,
    rarity: r,
    serial,
  };
  $("#lk").innerHTML =
    `<div class="fl"></div>${[...Array(8)].map((_, i) => `<div class="sl" style="--i:${i};left:${i * 12.5}%"></div>`).join("")}
 <div class="lq" style="animation:none;padding-top:9vh"><div class="pz" style="--rc:${D.c}"><div class="ph w-full flex items-end justify-center" style="aspect-ratio:300/340;background:linear-gradient(160deg,#27322c,#0c1410)"><span class="d mb-4 text-3xl" style="color:${D.c}">${r == "legendary" ? "1 of 1" : "#" + serial}</span></div>
 <p id="rl" class="d mt-4 mb-1 text-sm" style="color:${D.c}">· · ·</p><p class="m-0 text-xl font-semibold">${name}</p><p class="my-1 text-sm opacity-70">${fit} fit · ${serial}/${D.t} of this rarity</p>
 <p class="my-2"><s class="opacity-50">Rs. 1,499</s> <b class="text-2xl" style="color:${D.c}">${money(price)}</b> <span class="text-sm">(${D.off * 100}% off)</span></p>
 <div class="flex gap-2 my-3">${["S", "M", "L", "XL"].map((s) => `<button data-a="psz" data-v="${s}" class="lc m-0 px-4 py-2 ${s == "M" ? "on" : ""}">${s}</button>`).join("")}</div>
 <button data-a="claim" class="btn g w-full">Add to bag</button><button data-a="lx" class="w-full bg-transparent border-0 text-white mt-3 underline">Keep shopping</button></div>
 <p class="text-center mt-6"><button data-a="redo" class="bg-transparent border-0 text-white underline">Retake quiz</button></p></div>`;
  const names = Object.values(R).map((x) => x.n);
  let i = 0;
  const x = setInterval(() => {
    $("#rl").textContent = names[i++ % 4];
  }, 60);
  setTimeout(() => {
    clearInterval(x);
    const e = $("#rl");
    if (e) e.textContent = `${D.n} · limited to ${D.t}`;
  }, 1200);
}
