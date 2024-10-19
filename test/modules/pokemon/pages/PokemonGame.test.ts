import { mount } from '@vue/test-utils';
import PokemonGame from '@pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import type { Mock } from 'vitest';
import { GameStatus } from '@/modules/pokemon/interfaces';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const fakePokemonOptions = [
  { name: 'bulbasaur', id: 1 },
  { name: 'ivysaur', id: 2 },
  { name: 'venusaur', id: 3 },
  { name: 'charmander', id: 4 },
];

describe('PokemonGame', () => {
  test('should init with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoading: true,
      gameStatus: GameStatus.PLAYING,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
      pokemonFounded: [],
      correctAnswers: 0,
      incorrectAnswers: 0,
      isPokemonShiny: false,
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

    expect(wrapper.get('h3').text()).toBe('Cargando Pokémons');
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
  });

  test('should render PokemonPicture and PokemonOptions', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: fakePokemonOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.PLAYING,
      pokemonOptions: fakePokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
      pokemonFounded: [],
      correctAnswers: 0,
      incorrectAnswers: 0,
      isPokemonShiny: false,
    });

    const wrapper = mount(PokemonGame);
    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');
    const pokemons = fakePokemonOptions.map((p) => p.name);

    const imgUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png';

    expect(wrapper.find('img').attributes('src')).toBe(imgUrl);
    expect(buttons.length).toBe(fakePokemonOptions.length);

    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });

  test('should render button for a new game', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: fakePokemonOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.WON,
      pokemonOptions: fakePokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
      pokemonFounded: [],
      correctAnswers: 1,
      incorrectAnswers: 0,
      isPokemonShiny: false,
    });

    const wrapper = mount(PokemonGame);

    const button = wrapper.find('[data-test-id="btn-new-game"]');

    expect(button.text()).toBe('NUEVO JUEGO');
  });

  test('should call the getNextRound function when the button is clicked', async () => {
    const spyNextRoundFn = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: fakePokemonOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.WON,
      pokemonOptions: fakePokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: spyNextRoundFn,
      pokemonFounded: [],
      correctAnswers: 1,
      incorrectAnswers: 0,
      isPokemonShiny: false,
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test-id="btn-new-game"]');
    await button.trigger('click');

    expect(spyNextRoundFn).toHaveBeenCalledWith();
  });
});
