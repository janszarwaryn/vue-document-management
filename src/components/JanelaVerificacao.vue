<template>
  <form ref="formulario">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="450"
        transition="dialog-top-transition"
      >
        <v-card :loading="carregando">
          <v-card-title class="text-h5">
            Verificar uma Imagem
          </v-card-title>
          <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-img
                        :src="require('@/assets/IWIM_lupa.png')"
                        class="mx-auto"
                        contain
                        width="200"
                    />
                </v-col>
            </v-row>
            <strong>Instruções:</strong>
            <li v-for="item in instrucoes" :key="item.instrucao">
                {{ item.instrucao }}
            </li>
            <v-row>
                <v-col>
                    <v-alert
                      v-if="carregando"
                      type="info"
                    >Por favor, aguarde...</v-alert>
                    <v-file-input
                    accept="image/*"
                    label="Lesão"
                    required
                    :disabled="carregando"
                    :rules="[regras.required]"
                    v-model="imagem"
                ></v-file-input>
                </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              :loading="carregando"
              @click="fechar"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :loading="carregando"
              @click="enviar()"
            >
              Enviar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    </form>
  </template>

  <script>
  import api from "@/api";
  export default {
    name:"JanelaVerificacao",
    data () {
      return {
        dialog: false,
        imagem: [],
        carregando: false,
        regras: {
          required: value => !!value || 'Obrigatório.',
        },
        instrucoes:[
            {instrucao:"   Permita a abertura da câmera"},
            {instrucao:"   Enquadre a lesão no centro da imagem"},
            {instrucao:"   Mantenha a lesão totalmente visível, sem cortes"},
            {instrucao:"   Mantena a imagem focada"},
            {instrucao:"   Se preferir, selecione uma imagem da galeria."},
        ]
      }
    },
    methods:{
        enviar(){
          this.carregando = true;

          let formdata = new FormData();
          formdata.append('imagem', this.imagem);

          api.post("verificar-img", formdata, {
            timeout: 120000 // Tempo de espera em milissegundos (Dois Minutos)
          })
          .then(r => {
            this.dialog = false;
            this.$emit('exibirResultados', r.data);
          })
          .catch((r) => {
            console.log(r);
          })
          .finally(() => {
            this.carregando = false;
          });
        },
        fechar(){
          this.imagem = [];
          this.dialog = false;
        }
    }
  }
</script>