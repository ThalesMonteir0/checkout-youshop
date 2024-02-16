<script setup>
import SplitScreen from "../components/SplitScreen.vue"
import InfoProduct from "../components/InfoProduct.vue";
</script>

<template>
  <SplitScreen title="Dados do Cliente">
    <template #left>
      <v-card>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nome Completo"
                              variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined"
                              label="Número (opcional)" />
              </v-col>
              <v-col cols="12" md="10">
                <v-text-field label="Email"
                              variant="outlined" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field label="CEP"
                              variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Estado"
                              variant="outlined" 
                              disabled />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Cidade" 
                              variant="outlined"
                              disabled />
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="Bairro"
                              variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Rua/Avenida"
                              variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Número"
                              variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Complemento (opcional)"
                               variant="outlined" />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
      <div class="d-flex justify-end mt-4">
        <v-btn color="success">Continuar</v-btn>
      </div>
    </template>

    <template #rigth>
      <InfoProduct></InfoProduct>
    </template>

  </SplitScreen>
</template>

<style scoped></style>
