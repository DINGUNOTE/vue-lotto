<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/lotto">Lotto</RouterLink>
        </nav>
      </div>
    </header>

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
