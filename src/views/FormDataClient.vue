<script setup>
import SplitScreen from "../components/SplitScreen.vue"
import InfoProduct from "../components/InfoProduct.vue";
import {reactive, watch,ref, inject} from 'vue'
import {getCepService} from '../service/cepService'
import {AddMaskToPhone,RemoveMaskToPhone} from '../composables/useMasks'
import {useStore} from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import {verifyCep} from '../composables/verify'
import {verifyNameInput,
  verifyTelephoneNumber,
  verifyNeighborhoodInput,
  verifyStreetOrAvenueInput,
  verifyHouseNumberInput,
  verifyCepRules} from '../composables/rules'

const notyf = inject('notyf');
const route = useRoute()
const router = useRouter()
const store = useStore()
const paramID = ref(route.params.id)

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
  complement: ''
});

watch(() => inputsDadosClientsValue.cep,(newValue) => searchCEP(newValue))

const searchCEP = (cepValue) => {
  let ok = verifyCep(cepValue)
  if (!ok) return

  getCepService(cepValue).then(res => {
    inputsDadosClientsValue.stateinput = res.data.uf  ?? ''
    inputsDadosClientsValue.neighborhood = res.data.bairro ??''
    inputsDadosClientsValue.city = res.data.localidade ?? ''
    inputsDadosClientsValue.avenueOrStreet = res.data.logradouro ?? ''
  }).catch(err => {
    console.error(err)
  })
}

const formatTelephone = (value) => {
  inputsDadosClientsValue.telephone = AddMaskToPhone(value)
}

const verifyFields = () => {
  if(inputsDadosClientsValue.avenueOrStreet.trim().length === 0 || inputsDadosClientsValue.cep.trim().length === 0||
  inputsDadosClientsValue.number.trim().length === 0 || inputsDadosClientsValue.neighborhood.trim().length === 0 || 
  inputsDadosClientsValue.telephone.trim().length === 0 ||RemoveMaskToPhone(inputsDadosClientsValue.telephone).trim().length !== 11) return false
  
  return true
}

const SaveInStoreAndRedirectPage = () => {
  let paramString = paramID.value.toString()
  if(!verifyFields()){
    notyf.error('Preencha todos os campos do formulario!')
    return
  }
  store.state.clientData = inputsDadosClientsValue

  if(store.state.product.id === undefined) {
    notyf.error('Nenhum produto selecionado!')
    return
  }
  
  router.push({name: 'form-data-payment', params: { id: paramString }}) // redirect page to formaDataPayment
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
                              v-model="inputsDadosClientsValue.complement"
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
      <InfoProduct :productID="paramID"/>
    </template>

  </SplitScreen>
</template>

<style scoped>
</style>
