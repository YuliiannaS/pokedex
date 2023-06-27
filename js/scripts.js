const pokemonRepository = (function () {
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

    // Show pokemon details
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        // Get all pokemons
        getAll: function () {
            return pokemonList;
        },
        // Add pokemon
        add: function (pokemon) {
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
        // Get one pokemon by name
        filter: function (name) {
            pokemonList.find(function (pokemon) {
                return pokemon.name === name;
            })
        },
        // Add button to the list
        addListItem: function (pokemon) {
            const ul = document.querySelector("ul");
            const li = document.createElement("li");
            const button = document.createElement("button");

            button.innerText = pokemon.name;
            // Addd click listener
            button.addEventListener("click", function () {
                showDetails(pokemon);
            });

            li.appendChild(button);
            ul.appendChild(li);
        },
    };
})();

// Get all pokemons
const pokemons = pokemonRepository.getAll();
// Iterate and print all pokemons
pokemons.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});