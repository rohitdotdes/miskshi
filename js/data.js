/* Helpers, product data and app state */
const $ = (s) => document.querySelector(s),
  money = (n) => "Rs. " + n.toLocaleString("en-IN");
const ld = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  sv = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  };
const NAMES = [
    "Void Tee",
    "Raven Tee",
    "Chrome Tee",
    "Static Tee",
    "Knight Tee",
    "Ash Tee",
    "Halo Tee",
    "Rogue Tee",
    "Mono Tee",
    "Pixel Tee",
    "Relic Tee",
    "Neon Tee",
  ],
  COL = ["Black", "White", "Grey", "Green"],
  PR = [799, 899, 999, 1099, 1199, 1299, 1499];
const P = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: NAMES[i % 12] + (i > 11 ? " II" : ""),
  price: PR[(i * 3) % 7],
  fit: i % 3 ? "Oversized" : "Regular",
  col: COL[i % 4],
  g: i % 2 ? "Women" : "Men",
  cat: i % 2 ? "Plain tee" : "Graphic tee",
  fab: ["Cotton", "Blend", "Organic"][i % 3],
  sz: ["S", "M", "L", "XL"].filter((_, j) => (i + j) % 5),
  r: ((i * 7) % 5) + 1,
}));
let S = {
  bag: ld("mk-bag", []),
  wish: new Set(ld("mk-wish", [])),
  f: {},
  sort: "Newest",
  n: 8,
  crumb: "T-shirts",
  open: "",
  sz: "M",
  ft: "Regular",
  acc: "",
  fp: 0,
  pi: "",
};
const save = () => {
  sv("mk-bag", S.bag);
  sv("mk-wish", [...S.wish]);
};
const toast = (t) => {
  const e = $("#ts");
  e.textContent = t;
  e.classList.add("on");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => e.classList.remove("on"), 2200);
};
const FO = {
  fit: ["Regular", "Oversized"],
  col: COL,
  price: [
    ["u", "Under Rs. 1,099"],
    ["m", "Rs. 1,099 & above"],
  ],
  g: ["Men", "Women"],
  cat: ["Graphic tee", "Plain tee"],
  sz: ["S", "M", "L", "XL"],
  fab: ["Cotton", "Blend", "Organic"],
};
const SO = [
  "Newest",
  "Relevance",
  "Price low to high",
  "Price high to low",
  "Ratings",
];
