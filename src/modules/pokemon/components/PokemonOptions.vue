<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="pokemon in props.pokemonOptions"
      :key="pokemon.id"
      class="capitalize"
      @click="$emit('selectedOption', pokemon.id)"
    >
      {{ pokemon.name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  pokemonOptions: Pokemon[];
}

const props = defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
