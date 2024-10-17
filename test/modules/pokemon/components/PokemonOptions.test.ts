import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import type { Pokemon } from '@/modules/pokemon/interfaces';
import { mount } from '@vue/test-utils';

const pokemonOptions: Pokemon[] = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

describe('PokemonOptions', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions,
        blockSelection: false,
        correctAnswer: 1,
      },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(pokemonOptions.length);

    buttons.forEach((button, i) => {
      expect(button.attributes('class')).toBe(
        'capitalize disabled:shadow-none disabled:bg-gray-100',
      );
      expect(button.text()).toBe(pokemonOptions[i].name);
    });
  });

  test('should emit selectOption event when a button is clicked', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions,
        blockSelection: false,
        correctAnswer: 1,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach(async (button, i) => {
      await button.trigger('click');
      expect(wrapper.emitted().selectedOption[i]).toEqual([i + 1]);
    });
  });

  test('should disable buttons when blockSelection prop is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions,
        blockSelection: true,
        correctAnswer: 1,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      const attributes = Object.keys(button.attributes());
      expect(attributes).toContain('disabled');
    });
  });

  test('should apply correct styling to buttons based on correct/incorrect answer', () => {
    const correctAnswer = 2;

    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions,
        blockSelection: true,
        correctAnswer,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button, i) => {
      if (pokemonOptions[i].id === correctAnswer) expect(button.classes()).toContain('correct');
      else expect(button.classes()).toContain('incorrect');
    });
  });
});
