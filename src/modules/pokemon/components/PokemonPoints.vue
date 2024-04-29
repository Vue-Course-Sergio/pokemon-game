<template>
  <section class="mt-5">
    <button disabled="true" class="correct">Aciertos: {{ correctAnswers }}</button>
    <button disabled="true" class="incorrect">Fallos: {{ incorrectAnswers }}</button>
  </section>
</template>

<script setup lang="ts">
interface Props {
  correctAnswers: number;
  incorrectAnswers: number;
}

withDefaults(defineProps<Props>(), {
  correctAnswers: 0,
  incorrectAnswers: 0,
});
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-green-300;
}

.incorrect {
  @apply bg-red-300;
}
</style>
