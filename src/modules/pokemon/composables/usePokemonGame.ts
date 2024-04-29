import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.PLAYING);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const pokemonFounded = ref<number[]>([]);

  const correctAnswers = ref<number>(0);
  const incorrectAnswers = ref<number>(0);
  const isPokemonShiny = ref<boolean>(false);

  let pokemonLimit: number = 151;

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>(`?limit=${pokemonLimit}`);

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');

      const id = urlParts.at(-2) ?? 0;

      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = async (howMany: number = 4) => {
    if (pokemons.value.length <= 3) {
      pokemonLimit += 100;
      if (pokemonLimit > 1302) pokemonLimit = 1302;
      pokemons.value = await getPokemons();
    }

    isPokemonShiny.value = Math.random() < 0.5;
    gameStatus.value = GameStatus.PLAYING;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (pokemonId: number): void => {
    const hasWon = randomPokemon.value.id === pokemonId;
    gameStatus.value = hasWon ? GameStatus.WON : GameStatus.LOST;

    if (gameStatus.value === GameStatus.WON) {
      correctAnswers.value++;

      if (!pokemonFounded.value.includes(pokemonId)) {
        pokemonFounded.value.push(pokemonId);
      }

      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
      });

      return;
    }

    incorrectAnswers.value++;
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    pokemonFounded,
    randomPokemon,
    correctAnswers,
    incorrectAnswers,
    isPokemonShiny,

    //Methods
    getNextRound,
    checkAnswer,
  };
};
