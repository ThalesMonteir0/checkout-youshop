<script setup>
import { onMounted } from 'vue';
import { defineProps } from 'vue';
import {useStore} from 'vuex'
import { getProduct } from '../service/productService'

const store = useStore()

const props = defineProps({
    productID: String
    // required
})

const searchProduct = async (paramsID) => {
    if(Object.keys(store.state.product).length !== 0 && Number(productID) === store.state.product.id){
        return
    }
    await getProduct(paramsID).then(res => {
        store.state.product = res.data
        
    }).catch(err => {

    })
}
onMounted( async () => {
    // timeout to wait for msw to be initialized
    setTimeout(async() => {
        await searchProduct(props.productID)
    }, 100)

})



</script>
<template>
    <v-container>
        <h4>Resumo da compra</h4>
        <v-divider class="mt-2 mb-2"/>
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
        <v-divider class="mt-2 mb-2"/>
        <div class="d-flex justify-space-between">
            <span>Total:</span>
            <span>{{ store.state.product.price }}</span>
        </div>
    </v-container>
   
</template>
<style scoped>
    
</style>