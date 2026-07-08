// // @ts-check
// import { defineConfig } from 'astro/config';

// // https://astro.build/config
// export default defineConfig({});


// import { defineConfig } from 'astro/config';

// export default defineConfig({
//   site: 'https://volyacore.github.io',
//   base: '/VolyaCoreWatch', 
// });

// import { defineConfig } from 'astro/config';

// // Чистий конфіг для Vercel / Netlify
// export default defineConfig({});

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://volyacore.com', // Вкажіть ваш основний домен
  integrations: [sitemap()],
});