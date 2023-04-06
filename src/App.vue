<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="UFPA Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/brasao_ufpa.png')"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://ppgeaa.propesp.ufpa.br/index.php/br/"
        target="_blank"
        text
      >
        <span class="mr-2">PPGEAA - UFPA</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'AppApp',

  data: () => ({
    //
  }),
};
</script>
