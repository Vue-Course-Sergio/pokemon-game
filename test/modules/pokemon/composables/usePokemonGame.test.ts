import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import type { Pokemon } from '@/modules/pokemon/interfaces';
import { withSetup } from '../../../utils/with-setup';
import { pokemonListFake } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

vitest.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  let results: any;

  beforeEach(() => {
    const [result] = withSetup(usePokemonGame);
    results = result;
  });

  test('should init with correct default values', async () => {
    expect(results.gameStatus.value).toBe(GameStatus.PLAYING);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toEqual(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly handle getNextRound', async () => {
    await flushPromises();

    results.gameStatus.value = GameStatus.WON;
    results.getNextRound(5);

    expect(results.gameStatus.value).toBe(GameStatus.PLAYING);
    expect(results.pokemonOptions.value).toHaveLength(5);
  });

  test('should correctly handle getNextRound and return different pokemons', async () => {
    await flushPromises();

    const pokemonOptions1 = results.pokemonOptions.value.map((pokemon: Pokemon) => pokemon.name);
    results.getNextRound();
    const pokemonOptions2 = results.pokemonOptions.value;

    pokemonOptions2.forEach((pokemon: Pokemon) => {
      expect(pokemonOptions1).not.toContain(pokemon.name);
    });
  });

  test('should correctly handle an incorrect answer', async () => {
    await flushPromises();
    const { checkAnswer, gameStatus } = results;
    expect(gameStatus.value).toBe(GameStatus.PLAYING);
    checkAnswer(2000);
    expect(gameStatus.value).toBe(GameStatus.LOST);
  });

  test('should correctly handle a correct answer', async () => {
    await flushPromises();
    const { checkAnswer, gameStatus, randomPokemon } = results;
    expect(gameStatus.value).toBe(GameStatus.PLAYING);
    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalledWith({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
    });
    expect(gameStatus.value).toBe(GameStatus.WON);
  });
});
