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

// import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap';

// export default defineConfig({
//   site: 'https://volyacore.com', // Вкажіть ваш основний домен
//   integrations: [sitemap()],
// });

// import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap';
// import cloudflare from '@astrojs/cloudflare';

// export default defineConfig({
//   site: 'https://volyacore.com',
//   output: 'server', // Умикає підтримку серверних API-файлів
//   adapter: cloudflare(), // Підключає адаптер для Cloudflare
//   integrations: [sitemap()],
// });

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://volyacore.com',
  integrations: [sitemap()],
});
