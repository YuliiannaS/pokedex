const pokemonRepository = (function (){
    let pokemonList = [
      {
          name: "Pikachu",
          height: 4,
          types: ['electric']
      },
      {
          name: "Charizard",
          height: 17,
          types: ['fire', 'flying']
      },
      {
          name: "Squirtle",
          height: 5,
          types: ['water']
      },
    ];
    
    return {
        getAll: function() {
          return pokemonList;
      },
      add: function(pokemon) {
        if (typeof pokemon !== "object") {
          return false;
        }
        if (typeof pokemon.height !== "number") {
          return false;
        }
        if (typeof pokemon.name !== "string") {
        return false;
        }
          pokemonList.push(pokemon);
      },
      filter: function(name) {
        return pokemonList.find(function (pokemon) {
          return pokemon.name === name;
        });
      },
    };
  })();
  
  const newPokemon = {
        name: "Jigglypuff",
        height: 5,
        types: ['normal', 'fairy']
      };
  pokemonRepository.add(newPokemon);
  const pokemons = pokemonRepository.getAll();
  
  pokemons.forEach(function (pokemon) {
      document.write(
        pokemon.name + " (height: " + pokemon.height + ")"
      );
      if (pokemon.height > 10) {
        document.write(
          " Wow, that’s big"
        );
      }
      document.write("<br>");
    });
    
  document.write("<h1>My pokemon:</h1>")
  const my = pokemonRepository.filter("Pikachu");
  document.write(
        my.name + " (height: " + my.height + ")"
      );
      if (my.height > 10) {
        document.write(
          " Wow, that’s big"
        );
      }
    

console.log(pokemonRepository);