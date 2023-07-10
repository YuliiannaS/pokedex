const pokemonRepository = (function () {
    let pokemonList = [];
       //load data from link
    function loadList() {
        return fetch("https://pokeapi.co/api/v2/pokemon/")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.results.forEach(function (pokemon) {
                    add({
                        name: pokemon.name,
                        detailsUrl: pokemon.url,
                    });
                });
            })
    }
      //Load pokemon details
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const pokemonUpdate = pokemonList.find(function (p) {
                    return p.name == pokemon.name;
                });
                pokemonUpdate.imgUrl = data.sprites.front_default;
                pokemonUpdate.height = data.height;
                return pokemonUpdate;
            });
    }

    // Show pokemon details
    function showDetails(pokemon) {
        return loadDetails(pokemon)
            .then(function (data) {
                console.log(data);
            });
    }
    // Get all pokemons
    function getAll() {
        return pokemonList;
    }
    // Add pokemon
    function add(pokemon) {
        if (typeof pokemon !== "object") {
            return false;
        }
        // if (typeof pokemon.height !== "number") {
        //     return false;
        // }
        if (typeof pokemon.name !== "string") {
            return false;
        }
        pokemonList.push(pokemon);
    }
    // Get one pokemon by name
    function filter(name) {
        pokemonList.find(function (pokemon) {
            return pokemon.name === name;
        })
    }
    // Add button to the list
    function addListItem(pokemon) {
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
    }
    return {
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
    };
}) ();

// Get all pokemons
pokemonRepository.loadList()
 .then(function() {
    const pokemons = pokemonRepository.getAll();
    // Iterate and print all pokemons
    pokemons.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
 })
 .catch(function (error) {
    console.error(error);
});


