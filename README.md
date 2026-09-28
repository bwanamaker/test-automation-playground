# Test Automation Playground

A website containing varied page types for practicing automated testing.

## Live demo

The static site is served at [tap.brandonwanamaker.com](https://tap.brandonwanamaker.com/) by a Cloudflare Worker. It includes the homepage, bicycle catalog and detail pages, and astronaut application at the routes described below.

## Local development

```sh
npm install
```

## Run locally

```sh
npm start
```

This starts the local Node.js server. The terminal prints the local URL, by default
`http://localhost:3000`. Set `PORT` to use another port.

Routes:

- `/` atomic-era welcome page with links to the e-commerce playground
- `/products` nine-product, national-park-inspired Wheelhouse bicycle catalog
- `/products/:slug` product details, quantity, and variant controls
- `/astronaut-application` retro-futurist astronaut intake form with a randomized 5-15 second loading sequence

Product slugs match the park-themed names (for example, Acadia Roadster lives at
`/products/acadia-roadster` and Joshua Tree Gravel at `/products/joshua-tree-gravel`). Both
themes share the original Futura-first font stack; Futura must be installed on
the visitor's device, otherwise the existing fallback fonts are used.

## Cloudflare Workers deployment

The Worker serves static assets; it does not run the local Node.js server. Build the assets locally with:

```sh
npm run build
```

This writes an uncommitted `dist/` directory with directory-based `index.html` files for each route. `wrangler.toml` serves that directory from the site root, including pull-request Previews.

In the Worker's Cloudflare dashboard under **Settings → Build**, set the repository root as the root directory and `npm run build` as the build command. The default deploy command (`npx wrangler deploy`) and preview command (`npx wrangler preview`) use `wrangler.toml`. Under **Settings → Domains & Routes**, add `tap.brandonwanamaker.com` as a Custom Domain; Cloudflare creates its DNS record. Remove any conflicting old CNAME pointing to GitHub Pages before adding the Custom Domain.

## Tests

```sh
npx playwright install chromium
npm run test:unit
npm run test:static
npm run test:playwright
```

The unit and Playwright suites exercise local development through the Node.js server. The static-site test verifies the Worker assets have every route and root-relative asset and navigation URLs. Playwright starts the local server automatically. Coverage includes homepage navigation, theme separation, all nine catalog-to-detail journeys, mobile layout, product options, basket confirmations, email validation, and astronaut application loading, form validation, and confirmation behavior.

## License

This project is licensed under the [MIT License](LICENSE).
