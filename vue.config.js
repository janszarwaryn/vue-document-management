module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_API_PROXY
  },
  transpileDependencies: [
    'vuetify'
  ]
}
