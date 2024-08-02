import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk';
import { getPokemon, getPokemonDetails } from '../Api';
import { setLoading } from './uiSlices';
// import { setFavorite } from '../actions';

const initialState = {
    pokemons: [],
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {
        dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();
      const pokemonsDetailed = await Promise.all(
        pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
      );
      dispatch(setPokemons(pokemonsDetailed));
        dispatch(setLoading(false));
    }
  );
//iterara significa repetir varias veces un proceso con la intecion de alcanzar una meta deseada, en este caso el .map repite un elemento de un arreglo y devuelve un nuevo arreglo que contiene resultados al llamar una funcion del callback
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setPokemons: (state, action) => {
        state.pokemons = action.payload;
      },
      setFavorite: (state, action) => {
        const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
          return pokemon.id === action.payload.pokemonId;
        });
  
        if (currentPokemonIndex >= 0) {
          const isFavorite = state.pokemons[currentPokemonIndex].favorite;
          state.pokemons[currentPokemonIndex].favorite = !isFavorite;
        }
      },
    },
  });

export const { setFavorite, setPokemons } = dataSlice.actions;
console.log(dataSlice);
export default dataSlice.reducer;
 //el metodo find ejecuta un callback una vez cada indiice del array hasta que encuentre uno en cada callback y devuelva yb valor verdadero
//el callback  representa el uso de las funciones como parametros de otras funciones, osea se crea cuando insertamos una fucnion de un parametro de otra funcion.