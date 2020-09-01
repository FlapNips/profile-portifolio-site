module.exports = {
  publicPath: 
    process.env.BASE_URL = "/",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/global.scss";`
      }
    }
  }
};