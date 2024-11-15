<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <v-app-bar :elevation="2">
      <nav>
        <RouterLink to="/">
          <v-btn primary>최신 회차 결과</v-btn>
        </RouterLink>
        <RouterLink to="/lotto">
          <v-btn primary>로또 번호 뽑기</v-btn>
        </RouterLink>
      </nav>
    </v-app-bar>
  </header>
</template>

<style lang="scss" scoped>
header {
  nav {
    display: flex;
    align-content: center;

    a {
      display: block;
      padding: 0.5rem;
    }
  }
}
</style>
