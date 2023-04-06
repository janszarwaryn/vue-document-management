<template>
    <form ref="formulario">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="450"
        >
          <v-card :loading="carregando">
            <v-card-title class="text-h5">
              Resultados
            </v-card-title>
            <v-card-text>

              <v-row>
                <v-col cols="12">
                    <h3>Lesão Identificada</h3>
                    <v-img
                        :src="resultados.imagem_mascarada"
                        class="mx-auto"
                        contain
                        width="250"
                    />
                    <p class="text-justify">
                        {{resultados.texto_bordas}}
                    </p>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>Medidas</h3>
                    <v-img
                        :src="resultados.imagem_medidas"
                        class="mx-auto"
                        contain
                        width="250"
                    />
                    <p class="text-justify">
                        {{resultados.texto_assimetria}}
                    </p>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>Resultado Final</h3>
                    <v-img
                        :src="resultados.imagem_resultado"
                        class="mx-auto"
                        contain
                        width="250"
                    />
                    <p class="text-justify">
                        {{resultados.texto_cores}}
                    </p>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>Resultado da Análise</h3>
                    <p class="text-justify">
                        {{resultados.texto_resultado_analise}}
                    </p>
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
                Sair
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      </form>
    </template>
  
    <script>
    export default {
      name:"JanelaResultados",
      data () {
        return {
          dialog: false,
          carregando: false,
          resultados:{
            classificacao: '',
            imagem_mascarada: '',
            imagem_medidas: '',
            imagem_resultado: '',
            texto_assimetria: '',
            texto_bordas: '',
            texto_cores: '',
            texto_resultado_analise: '',
          },
        }
      },
      methods:{
        mostrarResultados(resultados){
          this.dialog = true;
          this.resultados = resultados;
        },
        fechar(){
          this.resultados = {
            classificacao: '',
            imagem_mascarada: '',
            imagem_medidas: '',
            imagem_resultado: '',
            texto_assimetria: '',
            texto_bordas: '',
            texto_cores: '',
            texto_diagnóstico: '',
          };
          this.dialog = false;
        }
      }
    }
  </script>