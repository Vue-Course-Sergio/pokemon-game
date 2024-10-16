import { mount } from '@vue/test-utils';
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';

describe('PokemonPicture', () => {
  const pokemonId = 25;
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;

  test('should render the hidden image when ShowPokemon prop is false', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: false,
      },
    });

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0',
        src: imageSource,
      }),
    );
  });

  test('should render the image when ShowPokemon prop is true', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: true,
      },
    });

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'fade-in',
        src: imageSource,
      }),
    );
  });
});
