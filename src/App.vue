<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
@import 'vuetify/styles/main.css';
@import '@mdi/font/css/materialdesignicons.css';
</style>
