<script setup>
import BallComponent from '@/components/BallComponent.vue'
</script>

<template>
  <section>
    <article>
      <h1>
        고정 번호

        <div class="tooltip-box">
          <v-icon size="24"> mdi-help-circle-outline </v-icon>
          <v-tooltip activator="parent" location="top"
            >해당 번호를 고정으로 포함시켜서 번호를 추첨합니다.<br />최소 1개부터 최대 5개의 번호를
            선택 가능합니다.</v-tooltip
          >
        </div>
      </h1>

      <div>
        <v-text-field
          variant="underlined"
          type="number"
          placeholder="고정 번호 입력"
          clearable
        ></v-text-field>
      </div>

      <v-card>
        <ul>
          <BallComponent number="10" />
        </ul>
      </v-card>
    </article>

    <article>
      <h1>
        제외 번호

        <div class="tooltip-box">
          <v-icon size="24"> mdi-help-circle-outline </v-icon>
          <v-tooltip activator="parent" location="top"
            >해당 번호를 제외하고 번호를 추첨합니다.<br />최소 0개부터 최대 39개까지 선택
            가능합니다.</v-tooltip
          >
        </div>
      </h1>
    </article>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h1 {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
</style>
