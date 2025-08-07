import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['pl', 'en'],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
