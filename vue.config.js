module.exports = {
  publicPath: process.env.VUE_APP_DIRETORIO_RAIZ,
  devServer: {
    proxy: process.env.VUE_APP_API_PROXY
  },
  transpileDependencies: [
    'vuetify'
  ]
}