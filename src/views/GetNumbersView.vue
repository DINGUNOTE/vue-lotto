<script setup>
import { ref } from 'vue'
import { useLottoStore } from '@/stores'
import BallComponent from '@/components/BallComponent.vue'
import AlertComponent from '@/components/AlertComponent.vue'
import DrawView from '@/views/DrawView.vue'
import HistoryView from './HistoryView.vue'

const lottoStore = useLottoStore()
const fixedNumberInput = ref('')
const excludedNumberInput = ref('')
</script>

<template>
  <section>
    <article>
      <h1>
        고정 번호

        <div class="tooltip-box">
          <v-icon size="24"> mdi-help-circle-outline </v-icon>
          <v-tooltip activator="parent" location="top"
            >해당 번호를 고정으로 포함시켜서 번호를 추첨합니다.<br />최소
            0개부터 최대 5개의 번호를 선택 가능합니다.</v-tooltip
          >
        </div>
      </h1>

      <v-text-field
        v-model="fixedNumberInput"
        variant="underlined"
        type="number"
        placeholder="고정 번호 입력"
        clearable
        append-inner-icon="mdi-plus-circle"
        @click:append-inner="
          lottoStore.addFixedNumber(parseInt(fixedNumberInput, 10))
        "
      />

      <v-card class="ball-container">
        <template v-if="lottoStore.fixedNumbers.length === 0">
          <p>선택된 고정 번호가 없습니다.</p>
        </template>

        <ul v-else>
          <BallComponent
            v-for="(number, index) in lottoStore.fixedNumbers"
            :key="index"
            :number="number"
            :editable="true"
            @remove-ball="lottoStore.removeFixedNumber"
          />
        </ul>
      </v-card>
    </article>

    <article>
      <h1>
        제외 번호

        <div class="tooltip-box">
          <v-icon size="24"> mdi-help-circle-outline </v-icon>
          <v-tooltip activator="parent" location="top"
            >해당 번호를 제외하고 번호를 추첨합니다.<br />최소 0개부터 최대
            38개까지 선택 가능합니다.</v-tooltip
          >
        </div>
      </h1>

      <v-text-field
        v-model="excludedNumberInput"
        variant="underlined"
        type="number"
        placeholder="제외 번호 입력"
        clearable
        append-inner-icon="mdi-plus-circle"
        @click:append-inner="
          lottoStore.addExcludedNumber(parseInt(excludedNumberInput, 10))
        "
      />

      <v-card class="ball-container">
        <template v-if="lottoStore.excludedNumbers.length === 0">
          <p>선택된 제외 번호가 없습니다.</p>
        </template>

        <ul v-else>
          <BallComponent
            v-for="(number, index) in lottoStore.excludedNumbers"
            :key="index"
            :number="number"
            :editable="true"
            @remove-ball="lottoStore.removeExcludedNumber"
          />
        </ul>
      </v-card>
    </article>

    <div class="btn-group d-flex justify-center ga-2">
      <v-btn
        variant="outlined"
        min-width="150"
        @click="lottoStore.openDrawDialog"
        >추천번호 뽑기</v-btn
      >
      <v-btn
        variant="outlined"
        min-width="150"
        @click="lottoStore.openHistoryDialog"
        >추천번호 추첨기록</v-btn
      >
    </div>

    <DrawView />
    <HistoryView />
    <AlertComponent />
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

.ball-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;

  p {
    color: #666;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>
