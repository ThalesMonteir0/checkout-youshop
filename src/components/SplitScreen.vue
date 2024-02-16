<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    title: String
});

</script>

<template>
    <v-app style="background-color: #eeeeee;">
        <v-main>
            <v-container class="h-100">
                <h1>Deep Space Store</h1>
                <h2 class="mt-10">{{ props.title }}</h2>
                <v-row style="height: 90%;">
                    <v-col md="8" >
                        <slot name="left"></slot>
                    </v-col>

                    <v-col md="4" style="background-color: #f5f5f5;">
                        <slot name="rigth"></slot>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>

</style>