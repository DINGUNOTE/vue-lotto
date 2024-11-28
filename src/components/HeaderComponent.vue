<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-app-bar :elevation="2">
    <nav>
      <RouterLink to="/">
        <v-btn primary>최신 회차 결과</v-btn>
      </RouterLink>
      <RouterLink to="/get-numbers">
        <v-btn primary>로또 번호 뽑기</v-btn>
      </RouterLink>
      <RouterLink to="/view-stats">
        <v-btn primary>통계 보기</v-btn>
      </RouterLink>
    </nav>
  </v-app-bar>
</template>
