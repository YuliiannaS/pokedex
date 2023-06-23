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
    {
        name: "Jigglypuff",
        height: 5,
        types: ['normal', 'fairy']
    }
];
//for loop that iterates over each item in pokemonList
for (let i = 0; i < pokemonList.length; i++) {
    document.write(
        pokemonList[i].name + " (height: " + pokemonList[i].height + ")"
      );
      if (pokemonList[i].height > 10) {
        document.write(
          " Wow, that’s big!"
        );
      }
      document.write("<br>");
}

console.log(pokemonList);