<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          IWIM <v-icon x-large>mdi-beta</v-icon>
        </h2>

        <p class="subheading font-weight-regular">
          Interface Web para Identificação de Melanoma (beta)
        </p>
      </v-col>

      <v-col cols="12">
        <v-img
            :src="require('@/assets/IWIM_coracao.png')"
            class="mx-auto"
            contain
            width="200"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
            block
            elevation="2"
            color="primary"
            @click="abrirJanelaVerificacao"
        >VERIFICAR UMA IMAGEM</v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn
            disabled
            block
            elevation="2"
            color="primary"
            @click="abrirJanelaSubimissao"
        >SUBMETER UMA IMAGEM</v-btn>
      </v-col>
    </v-row>
  <JanelaVerificacao
    ref="JanelaVerificacao"
    @exibirResultados="abrirJanelaResultados"
  ></JanelaVerificacao>
  <JanelaSubimissao
    ref="JanelaSubimissao"
  ></JanelaSubimissao>
  <JanelaResultados
    ref="JanelaResultados"
  ></JanelaResultados>
  </v-container>
</template>

<script>
  import JanelaVerificacao from '@/components/JanelaVerificacao.vue';
  import JanelaSubimissao from '@/components/JanelaSubimissao.vue';
  import JanelaResultados from '@/components/JanelaResultados.vue';
  export default {
    name: 'PaginaPrincipal',
    components:{
      JanelaVerificacao,
      JanelaSubimissao,
      JanelaResultados
    },
    data: () => ({
      resultados: {},
    }),
    methods:{
      abrirJanelaVerificacao(){
        this.$refs.JanelaVerificacao.dialog = true;
      },
      abrirJanelaSubimissao(){
        this.$refs.JanelaSubimissao.dialog = true;
      },

      abrirJanelaResultados(resultados){
        this.resultados = resultados;
        this.$refs.JanelaResultados.mostrarResultados(this.resultados);
      },

    }
  }
</script>
