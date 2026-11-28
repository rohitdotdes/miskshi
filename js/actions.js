/* Click actions and global listeners */
const A = {
  menu: () => mg("Men"),
  wish: () => toast(S.wish.size ? `${S.wish.size} saved` : "Wishlist is empty"),
  sign: () => {
    $("#pm").classList.remove("on");
    $("#sp").classList.add("on");
  },
  sx: () => $("#sp").classList.remove("on"),
  mode: () => {
    const u = $("#st").textContent == "Sign in";
    $("#st").textContent = u ? "Sign up" : "Sign in";
    $("#sw").textContent = u ? "Have an account? Sign in" : "New here? Sign up";
  },
  in: () => {
    A.sx();
    toast(`Welcome back, ${($("#se").value || "guest").split("@")[0]}`);
  },
  guest: () => {
    A.sx();
    toast("Browsing as guest");
  },
  lucky: openLucky,
  lx: () => $("#lk").classList.remove("on"),
  pick: (v, el) => {
    const q = Q[L.i],
      a = L.a[q.k] || [];
    L.a[q.k] = q.m
      ? a.includes(v)
        ? a.filter((x) => x != v)
        : [...a, v]
      : [v];
    if (q.m) el.classList.toggle("on");
    else {
      document
        .querySelectorAll(".lc")
        .forEach((c) => c.classList.toggle("on", c == el));
      setTimeout(() => A.next(0, 0, {}), 260);
    }
  },
  next: (v, el, e) => {
    const q = Q[L.i],
      t = $("#lt");
    if (t && t.value.trim()) L.a[q.k] = [...(L.a[q.k] || []), t.value.trim()];
    if (!(L.a[q.k] || []).length) return toast("pick at least one");
    if (e && e.shiftKey) L.force = 1;
    L.i++;
    step();
  },
  psz: (v, el) => {
    L.prize.size = v;
    document
      .querySelectorAll("[data-a=psz]")
      .forEach((c) => c.classList.toggle("on", c == el));
  },
  claim: (v, el) => {
    S.bag.push(L.prize);
    save();
    render();
    el.textContent = "In your bag ✓";
    el.onclick = () => {
      A.lx();
      location.hash = "bag";
    };
  },
  redo: openLucky,
  cat: (v) => {
    const g = document.querySelector(".nv.on")?.dataset.n;
    S.f = ["Men", "Women"].includes(g) ? { g } : {};
    S.crumb = (g ? g + " / " : "") + (v == "All" ? "All" : v);
    S.n = 8;
    mg();
  },
  shop: (v) => {
    S.f = {};
    S.crumb = v;
    S.n = 8;
    location.hash = "shop";
  },
  open: (v) => {
    S.open = S.open == v ? "" : v;
    render();
  },
  setf: (v) => {
    const [k, x] = v.split("|");
    S.f[k] = x;
    S.open = "";
    S.n = 8;
    render();
  },
  sort: (v) => {
    S.sort = v;
    S.open = "";
    render();
  },
  clr: () => {
    S.f = {};
    S.open = "";
    render();
  },
  more: () => {
    S.n += 8;
    render();
  },
  heart: (v, el, e) => {
    e.preventDefault();
    v = +v;
    S.wish.has(v) ? S.wish.delete(v) : S.wish.add(v);
    save();
    render();
    toast(S.wish.has(v) ? "Saved to wishlist" : "Removed");
  },
  sz: (v) => {
    S.sz = v;
    render();
  },
  ft: (v) => {
    S.ft = v;
    render();
  },
  acc: (v) => {
    S.acc = S.acc == v ? "" : v;
    render();
  },
  add: (v) => {
    const p = P.find((x) => x.id == v),
      k = `${v}${S.sz}${S.ft}`,
      b = S.bag.find((x) => x.key == k);
    b
      ? b.qty++
      : S.bag.push({
          key: k,
          name: p.name,
          price: p.price,
          size: S.sz,
          fit: S.ft,
          qty: 1,
        });
    save();
    render();
    toast("Added to bag");
  },
  qty: (v) => {
    const [i, d] = v.split("|"),
      b = S.bag[i];
    if (b.rarity && d > 0) return toast("1 of a kind — one per customer");
    b.qty += +d;
    if (b.qty < 1) S.bag.splice(i, 1);
    save();
    render();
  },
  fp: () => {
    S.fp = !S.fp;
    S.open = "";
    render();
  },
  pi: (v) => {
    S.pi = S.pi == v ? "" : v;
    render();
  },
  pm: () => $("#pm").classList.toggle("on"),
  theme: () => {
    const d = document.documentElement,
      n = d.dataset.theme == "dark" ? "light" : "dark";
    d.dataset.theme = n;
    sv("mk-theme", n);
  },
  pay: () => {
    if (!S.bag.length) return toast("Your bag is empty");
    S.bag = [];
    save();
    location.hash = "home";
    render();
    toast("Order placed — thanks! (demo)");
  },
};
document.addEventListener("click", (e) => {
  if (!e.target.closest("#pw")) $("#pm").classList.remove("on");
  const el = e.target.closest("[data-a]");
  if (el && A[el.dataset.a]) A[el.dataset.a](el.dataset.v, el, e);
  else if (S.open && !e.target.closest(".ch,[data-v=sort]")) {
    S.open = "";
    render();
  }
});
addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    A.lx();
    A.sx();
  }
});
