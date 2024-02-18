<script setup>
import SplitScreen from "../components/SplitScreen.vue"
import InfoProduct from "../components/InfoProduct.vue";
import logoPix from '../assets/images/logo-pix.png';
import logoCartao from '../assets/images/logo-cartao.svg';
import logoBoleto from '../assets/images/logo-barras.svg';
import { ref, reactive,onMounted } from 'vue'
import { verifyCVV, verifyDueDate, verifyCardNumber, verifyCpf } from '../composables/rules'
import { validCPF } from "../composables/verify";
import { useStore } from "vuex";
import { postProduct } from '../service/productService'
import { useRoute } from 'vue-router';
import { inject } from 'vue';

const notyf = inject('notyf');
const route = useRoute()
const store = useStore()
const typePayment = ref('')
const paramID = ref('')
const dataInputDataPayment = reactive({
    cpf: '',
    cardNumber: '',
    DueDate: '',
    cvv: ''
})
const paymentMethods = [
    { id: 'Pix', value: 'pix', imageSrc: logoPix, alt: 'Pix', label: 'Pix' },
    { id: 'Card', value: 'card', imageSrc: logoCartao, alt: 'Cartão', label: 'Cartão' },
    { id: 'Boleto', value: 'boleto', imageSrc: logoBoleto, alt: 'Boleto', label: 'Boleto' }
];

const verifyFields = () => {
    if (typePayment.value === '') return false
    if (validCPF(dataInputDataPayment.cpf)) {
        if (typePayment === 'card') {
            if (!dataInputDataPayment.cardNumber.length > 0 || !dataInputDataPayment.cvv.length > 0 && dataInputDataPayment.DueDate.length > 0) return false
            return true
        }
        return true
    }

    return false
}

const createOrder = async () => {
    if(!verifyFields()){
        console.log("faltou algo");
        if(typePayment.value === ''){
            notyf.error('Escolha a forma de pagamento!')
            return
        }
        validCPF(dataInputDataPayment.cpf) === true ? notyf.error('Preencha todos os campos do formulario!') : notyf.error('CPF inválido!')
        return
    }
    const allDataClient = {
        name: store.state.clientData.name,
        telephone: store.state.clientData.telephone,
        email: store.state.clientData.email,
        cep: store.state.clientData.cep,
        stateinput: store.state.clientData.stateinput,
        city: store.state.clientData.city,
        neighborhood: store.state.clientData.neighborhood,
        avenueOrStreet: store.state.clientData.avenueOrStreet,
        number: store.state.clientData.number,
        complement: store.state.clientData.complment,
        cpf: dataInputDataPayment.cpf,
        cardNumber: dataInputDataPayment.cardNumber,
        DueDate: dataInputDataPayment.DueDate,
        cvv: dataInputDataPayment.cvv,
        typePayment: typePayment.value,
    }
    await postProduct(paramID.value,allDataClient).then(res => {
        console.log(res.data);


    }).catch(err => {
        notyf.error('Não foi possível realizar a efetivação da sua compra')
    })
}

onMounted(() => {
    paramID.value =  route.params.id
})

</script>
<template >
    <SplitScreen title="Como prefere seu pagamento?">
        <template #left>
            <v-row>
                <v-col cols="12">
                    <div v-for="(paymentMethod, index) in paymentMethods" :key="index">
                        <v-card flat 
                                class="size-card-payment">
                            <v-container class="d-flex align-center h-100">
                                <input type="radio" 
                                        :value="paymentMethod.value" 
                                        :id="'inputPayment' + paymentMethod.id"
                                        name="inputPayment" 
                                        v-model="typePayment"
                                        >
                                <img class="ml-2" 
                                    :src="paymentMethod.imageSrc" 
                                    :alt="paymentMethod.alt" 
                                    width="30"
                                    height="30"
                                    >
                                <label  :for="'inputPayment' + paymentMethod.id" 
                                        class="ml-2">
                                    {{ paymentMethod.label }}
                                </label>
                            </v-container>
                        </v-card>
                        <v-divider/>
                    </div>
                </v-col>
            </v-row>
            <h2 class="mt-2 mb-2">Dados do Pagamento</h2>
            <v-form>
                <v-card fla class="h-100">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="7">
                                <v-text-field   label="CPF" 
                                                id="cpfInput" variant="outlined"
                                                v-model="dataInputDataPayment.cpf"
                                                v-mask-cpf 
                                                :rules="verifyCpf" />
                            </v-col>
                        </v-row>
                        <v-row v-if="typePayment === 'card'">
                            <v-col cols="12" md="9">
                                <v-text-field   label="Número do Cartão" 
                                                id="numberCard" 
                                                variant="outlined" 
                                                v-mask-cc
                                                :rules="verifyCardNumber" 
                                                v-model="dataInputDataPayment.cardNumber"/>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field   label="Data vencimento" 
                                                id="dueDate" 
                                                v-model="dataInputDataPayment.DueDate"
                                                variant="outlined" 
                                                v-mask="'00/00'" 
                                                :rules="verifyDueDate" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field   label="CVV" 
                                                id="CvvCard" 
                                                v-model="dataInputDataPayment.cvv" 
                                                variant="outlined"
                                                v-mask="'000'"
                                                :rules="verifyCVV" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-form>
            <div class="d-flex justify-end mt-3">
                <v-btn color="success" @click="createOrder">Concluir</v-btn>
            </div>
        </template>
        <template #rigth>
            <InfoProduct :productID="paramID"/>
        </template>
    </SplitScreen>
</template>
<style scoped>
.size-card-payment {
    height: 92px;
}
</style>