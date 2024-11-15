<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<style>
@import 'vuetify/styles/main.css';
@import '@mdi/font/css/materialdesignicons.css';
</style>
