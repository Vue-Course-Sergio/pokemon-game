<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5 text-3xl">¿Quién es este Pokémon?</h1>

    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.PLAYING" @click="getNextRound()">NUEVO JUEGO</button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.PLAYING"
    />

    <!-- Pokemon Options -->
    <PokemonOptions
      :pokemon-options="pokemonOptions"
      :block-selection="gameStatus !== GameStatus.PLAYING"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />

    <!-- Game Points -->
    <PokemonPoints :correct-answers="correctAnswers" :incorrect-answers="incorrectAnswers" />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonPoints from '../components/PokemonPoints.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  isLoading,
  randomPokemon,
  gameStatus,
  pokemonOptions,
  checkAnswer,
  getNextRound,
  correctAnswers,
  incorrectAnswers,
} = usePokemonGame();
</script>

<style scoped>
button {
  @apply bg-blue-400 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
