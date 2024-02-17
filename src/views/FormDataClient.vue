<script setup>
import SplitScreen from "../components/SplitScreen.vue"
import InfoProduct from "../components/InfoProduct.vue";
import {reactive, watch} from 'vue'
import {getCepService} from '../service/cepService'
import {AddMaskToPhone,RemoveMaskToPhone} from '../composables/useMasks'
import {useStore} from 'vuex'

const store = useStore()

const inputsDadosClientsValue = reactive({
  name: '',
  telephone: '',
  email: '',
  cep: '',
  stateinput: '',
  city: '',
  neighborhood: '',
  avenueOrStreet: '',
  number: '',
  complment: ''
});

watch(() => inputsDadosClientsValue.cep,(newValue) => searchCEP(newValue))

const verifyNameInput = [
  v => v.trim().length > 0 || "Campo Obrigatório. preencha seu nome completo!"

]

const verifyTelephoneNumber = [
  v => v.trim().length > 0 || "Campo Obrigatório. preencha seu Telefone!",
  v => RemoveMaskToPhone(v).trim().length === 11 || "Número inválido, por favor informe um número válido! ex: (xx)xxxxxxxxx"                                                                                            
]

const verifyNeighborhoodInput = [
  v => v.trim().length > 0 || "Campo Obrigatório. preencha o Bairro!"

]
const verifyStreetOrAvenueInput = [
  v => v.trim().length > 0 || "Campo Obrigatório. preencha a avenia/Rua!"

]

const verifyHouseNumberInput = [
  v => v.trim().length > 0 || "Campo Obrigatório. preencha o número da casa/apartamento!"
]


const verifyCepRules = [
  v => v.trim().length > 0 || "Campo Obrigatório, preencha o CEP",
  v => v.trim().length === 8 || "Por Favor, informe um CEP válido nesse formato Ex: xxxxx-xxx"
]

const verifyCep = (val) => {
  if(val.length != 8 ){ 
    return false
  }

  return true
}
const searchCEP = (cepValue) => {
  let ok = verifyCep(cepValue)
  if (!ok){
    return
  }

  getCepService(cepValue).then(res => {
    inputsDadosClientsValue.stateinput = res.data.uf
    inputsDadosClientsValue.neighborhood = res.data.bairro
    inputsDadosClientsValue.city = res.data.localidade
    inputsDadosClientsValue.avenueOrStreet = res.data.logradouro
  }).catch(err => {
  })
}
const formatTelephone = (value) => {
  inputsDadosClientsValue.telephone = AddMaskToPhone(value)
}

const verifyFields = () => {
  if(inputsDadosClientsValue.avenueOrStreet.trim().length === 0 || inputsDadosClientsValue.cep.trim().length === 0 || verifyCep(inputsDadosClientsValue.cep.trim()) ||
  inputsDadosClientsValue.number.trim().length === 0 || inputsDadosClientsValue.neighborhood.trim().length === 0 || inputsDadosClientsValue.telephone.trim().length === 0 ||
  RemoveMaskToPhone(v).trim().length === 11){
    return false
  }
  return true
}

const SaveInStoreAndRedirectPage = () => {
  if(!verifyFields){
    // colocar tip 
  }
  store.state.clientData = inputsDadosClientsValue
}


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
                              v-model="inputsDadosClientsValue.name"
                              variant="outlined" 
                              :rules="verifyNameInput"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field variant="outlined"
                               v-model="inputsDadosClientsValue.telephone"
                              label="Número" 
                              @input="formatTelephone(inputsDadosClientsValue.telephone)"
                              :rules="verifyTelephoneNumber"
                              />
              </v-col>
              <v-col cols="12" md="10">
                <v-text-field label="Email (opcional)"
                               v-model="inputsDadosClientsValue.email"
                              variant="outlined"
                              />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field label="CEP"
                              v-model="inputsDadosClientsValue.cep"
                              variant="outlined" 
                              :rules="verifyCepRules"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Estado"
                              v-model="inputsDadosClientsValue.stateinput"
                              variant="outlined" 
                              disabled 
                              />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Cidade" 
                               v-model="inputsDadosClientsValue.city"
                              variant="outlined"
                              disabled />
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="Bairro"
                            v-model="inputsDadosClientsValue.neighborhood"
                              variant="outlined" 
                              :rules="verifyNeighborhoodInput"
                              />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Rua/Avenida"
                               v-model="inputsDadosClientsValue.avenueOrStreet"
                              variant="outlined" 
                              :rules="verifyStreetOrAvenueInput"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Número"
                              v-model="inputsDadosClientsValue.number"
                              variant="outlined" 
                              :rules="verifyHouseNumberInput"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Complemento (opcional)"
                              v-model="inputsDadosClientsValue.complment"
                               variant="outlined" 
                               />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
      <div class="d-flex justify-end mt-4">
        <v-btn color="success" @click="SaveInStoreAndRedirectPage">Continuar</v-btn>
      </div>
    </template>

    <template #rigth>
      <InfoProduct/>
    </template>

  </SplitScreen>
</template>

<style scoped></style>
