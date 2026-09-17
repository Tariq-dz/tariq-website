import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static marketing site. `site` is a placeholder domain until the founder picks one (HANDOFF TODO).
export default defineConfig({
  site: 'https://tariq-dz.github.io',
  base: '/tariq-website/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (page) => !page.includes('/lab/') })],
  devToolbar: { enabled: false },
  // 'class' so a class passed to a child component (e.g. <PhoneFrame class="hero__phone">) is matched by the parent's scoped CSS
  scopedStyleStrategy: 'class',
});
