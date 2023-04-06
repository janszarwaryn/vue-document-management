<template>
    <form ref="formulario">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="450"
          transition="dialog-bottom-transition"
        >
          <v-card :loading="carregando">
            <v-card-title class="text-h5">
              Submeter uma Imagem
            </v-card-title>
            <v-card-text>
              <v-row>
                  <v-col cols="12">
                      <v-img
                          :src="require('@/assets/IWIM_aprendendo.png')"
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
              <v-row>
                  <v-col>
                    <v-select
                        :items="classificacoes"
                        dense
                        prepend-icon="mdi-import"
                      label="Classificação"
                      required
                      :disabled="carregando"
                      :rules="[regras.required]"
                      v-model="classificacao"
                    ></v-select>
                  </v-col>
              </v-row>
  
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                :loading="carregando"
                @click="dialog = false"
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
    export default {
        name:"JanelaSubimissao",
      data () {
        return {
          dialog: false,
          imagem: [],
          classificacao:"",
          carregando: false,
          regras: {
            required: value => !!value || 'Obrigatório.',
          },
          classificacoes:[
            {value: 1, text: "BENIGNO"},
            {value: 2, text: "MALIGNO"},
          ],
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
            console.log(!this.$refs.formulario);
            console.log("Clicou em enviar");
            this.carregando = true;
            setTimeout(this.funcaoDeTempo, 3000);
          },
          funcaoDeTempo(){
            this.carregando = false;
            console.log("Já se passaram 3 segundos");
          }
      }
    }
  </script>