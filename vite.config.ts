/** @type {import('vite').UserConfig} */

export default {
  server: {
    port: 1234,
    host: true,
    allowedHosts: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
};
