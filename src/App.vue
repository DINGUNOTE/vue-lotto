<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import AlertComponent from './components/AlertComponent.vue'
import DrawView from './views/DrawView.vue'
import HistoryView from './views/HistoryView.vue'
import LoaderComponent from './components/LoaderComponent.vue'
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

    <DrawView />
    <HistoryView />
    <AlertComponent />
    <LoaderComponent />
  </v-app>
</template>

<style>
@import 'vuetify/styles/main.css';
@import '@mdi/font/css/materialdesignicons.css';
</style>
