<template>
  <section>
    <img v-if="!showPokemon" :src="pokemonImage" class="brightness-0" />
    <img v-else :src="!shinyPokemon ? pokemonImage : shinyPokemonImage" class="fade-in" />
    <audio :src="pokemonSound" autoplay></audio>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
  shinyPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: true,
  shinyPokemon: false,
});

const pokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.pokemonId}.png`,
);

const shinyPokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${props.pokemonId}.png`,
);

const pokemonSound = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${props.pokemonId}.ogg`,
);

console.log(props.showPokemon);
</script>

<style scoped>
img {
  height: 300px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
</style>
