# miskshi

Dummy e-commerce storefront (static HTML + CSS + JS, Tailwind via CDN).

```
miskshi/
├── index.html        page shell
├── css/styles.css    custom styles, light/dark theme tokens
├── js/
│   ├── data.js       helpers, product data, app state
│   ├── views.js      page templates + router
│   ├── menu.js       header mega menu + search
│   ├── lucky.js      Feeling Lucky quiz + rarity drops
│   ├── actions.js    click handlers
│   └── main.js       entry point
└── img/              hero.jpg, dark-knight.jpg, white-knight.jpg, p1.jpg ... p24.jpg
```

Open `index.html` in a browser, or serve with GitHub Pages (Settings > Pages > main / root).
Scripts load in the order listed in `index.html`; keep that order.
