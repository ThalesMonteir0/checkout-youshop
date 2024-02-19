<script setup>
import { useStore } from 'vuex';
import { formatStringToCurrency } from '../composables/useMasks';

const store = useStore()

</script>
<template>
    <v-container class="d-flex align-center justify-center">
        <div class=" text-center">
            <h1 class="text-green-darken-2">Pedido Finalizado com Sucesso!</h1>
            <h2 v-if="store.state.infoOrder.typePayment !== 'card'">Realize agora seu pagamento:</h2>
            <img v-if="store.state.infoOrder.typePayment === 'boleto'" src="../assets/images/codigo-barras.png"
                alt="bar code" width="350" height="50">
            <img v-if="store.state.infoOrder.typePayment === 'pix'" src="../assets/images/qrcode.png" alt="bar code"
                width="250" height="250">

        </div>
    </v-container>
    <v-container>
        <h2>Detalhes do Pedido:</h2>
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="12" md="2">
                        <img :src="store.state.product.srcImg" alt="image product" width="150" height="150">
                    </v-col>
                    <v-col cols="12" md="10" class="d-flex align-center justify-space-between">
                        <div>
                            <span>{{ `Produto: ${store.state.product.name}` }}</span>
                        </div>
                        <div>
                            <h3 class="text-green">{{ formatStringToCurrency(store.state.product.price) }}</h3>
                        </div>
                    </v-col>
            </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>
<style scoped></style>