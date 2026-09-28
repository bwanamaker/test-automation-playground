# Test Automation Playground

A website containing varied page types for practicing automated testing.

## Live demo

The static site is published at [tap.brandonwanamaker.com](https://tap.brandonwanamaker.com/).

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

## Cloudflare Worker deployment

The Worker serves files from `public/`. Wrangler compiles the browser TypeScript into that directory before deployment using the build command in `wrangler.toml`.

To create a standalone static build with directory-based `index.html` files for each clean route, run:

```sh
npm run build -- --base-path /test-automation-playground
```

This writes an uncommitted `dist/` directory and prefixes internal URLs with the supplied base path. Omit `--base-path` for root-relative URLs.

## Tests

```sh
npx playwright install chromium
npm run test:typecheck
npm run test:unit
npm run test:static
npm run test:playwright
```

The unit and Playwright suites exercise local development through the Node.js server. The static-site test verifies the standalone artifact has every route and root-relative asset and navigation URLs. Playwright starts the local server and compiles browser scripts automatically. Coverage includes homepage navigation, theme separation, all nine catalog-to-detail journeys, mobile layout, product options, basket confirmations, email validation, and astronaut application loading, form validation, and confirmation behavior.

## License

This project is licensed under the [MIT License](LICENSE).
