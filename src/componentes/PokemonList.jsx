import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  return (
    <div className='PokemonList'>
      {pokemons.map((pokemon) => {
        const image = pokemon.sprites && pokemon.sprites.front_default 
                      ? pokemon.sprites.front_default 
                      : 'default_image_url';
        return (
          <PokemonCard
            name={pokemon.name}
            key={pokemon.name}
            image={image}
            types={pokemon.types || []}
            id={pokemon.id}
            favorite={pokemon.favorite}
          />
        );
      })}
    </div>
  );
};

PokemonList.defaultProps = {
  pokemons: Array(10).fill({
    name: '',
    sprites: { front_default: '' },
    types: [],
    id: '',
    favorite: false,
  }),
};

export default PokemonList;
