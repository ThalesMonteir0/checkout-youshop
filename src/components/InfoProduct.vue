<script setup>
import { onMounted, ref } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex'
import { getProduct } from '../service/productService'
import { formatStringToCurrency } from '../composables/useMasks';

const store = useStore()
const isloading = ref(false)

const props = defineProps({
    productID: {
        type: String,
        required: true
    }
})

const searchProduct = async (paramsID) => {
    isloading.value = true
    if (Object.keys(store.state.product).length !== 0 && Number(paramsID) === store.state.product.id) {
        isloading.value = false
        return
    }
    await getProduct(paramsID).then(res => {
        store.state.product = res.data
        isloading.value = false


    }).catch(err => {
        console.error(err);
    })
    isloading.value = false

}
onMounted(async () => {
    // timeout to wait for msw to be initialized
    setTimeout(async () => {
        await searchProduct(props.productID)
    }, 500)

})

</script>
<template>
    <v-container>
        <h4>Resumo da compra</h4>
        <v-divider class="mt-2 mb-2" />
        <v-progress-circular v-if="isloading" indeterminate />
        <div v-else>
            <div class="d-flex justify-space-between">
                <span>Produto:</span>
                <span>{{ store.state.product.name }}</span>
            </div>
            <div class="d-flex justify-space-between">
                <span>Preço:</span>
                <span>{{ store.state.product.price }}</span>
            </div>
            <div class="d-flex justify-space-between">
                <span>Frete:</span>
                <span class="text-green">Grátis</span>
            </div>
            <v-divider class="mt-2 mb-2" />
            <div class="d-flex justify-space-between" v-if="store.state.product.price">
                <span>Total:</span>
                <span>{{ formatStringToCurrency(store.state.product.price) }}</span>
            </div>
        </div>

    </v-container>
</template>
<style scoped></style>