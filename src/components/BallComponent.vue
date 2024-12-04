<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['removeBall'])

// 공 색을 결정하는 computed
const getNumberClass = computed(() => {
  if (props.number >= 1 && props.number <= 10) return 'yellow'
  if (props.number >= 11 && props.number <= 20) return 'blue'
  if (props.number >= 21 && props.number <= 30) return 'red'
  if (props.number >= 31 && props.number <= 40) return 'grey'
  if (props.number >= 41 && props.number <= 45) return 'green'
  return ''
})

const handleRemove = () => {
  emit('removeBall', props.number)
}
</script>

<template>
  <li :class="getNumberClass">
    {{ number }}

    <v-btn
      v-if="props.editable"
      @click.stop="handleRemove"
      class="btn-remove"
      density="compact"
      icon="mdi-close-circle"
    />
  </li>
</template>

<style lang="scss" scoped>
li {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 3rem;
  color: #fff;
  font-weight: 600;
  text-shadow: 0px 0px 3px rgba(73, 57, 0, 0.8);
  border-radius: 50%;
  aspect-ratio: 1 / 1;

  &.yellow {
    background-color: #fbc400;
  }
  &.blue {
    background-color: #69c8f2;
  }

  &.red {
    background-color: #ff7272;
  }
  &.grey {
    background-color: #aaa;
  }
  &.green {
    background-color: #b0d840;
  }
}

.btn-remove {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  color: #000;
}
</style>
