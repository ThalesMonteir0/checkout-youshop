<script setup>
import SplitScreen from "./SplitScreen.vue"
</script>

<template>
  <SplitScreen title="Dados do Cliente">
    <template #left>
      <v-card>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nome Completo" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Número (opcional)" />
              </v-col>
              <v-col cols="12" md="10">
                <v-text-field label="Email" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field label="CEP" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Estado" readonly />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Cidade" readonly />
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="Bairro" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Rua/Avenida" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Número" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Complemento (opcional)" />
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
      olaaa
    </template>

  </SplitScreen>
</template>

<style scoped></style>
