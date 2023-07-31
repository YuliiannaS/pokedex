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
        let modalContainer = document.querySelector('#modal-container');
        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerHTML = "Height: " + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imgUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
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
            loadDetails(pokemon)
                .then(function (p) {
                    showDetails(p);
                });
        });

        li.appendChild(button);
        ul.appendChild(li);
    }
    return {
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
    };
})();

// Get all pokemons
pokemonRepository.loadList()
    .then(function () {
        const pokemons = pokemonRepository.getAll();
        // Iterate and print all pokemons
        pokemons.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    })
    .catch(function (error) {
        console.error(error);
    });

document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
});

window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});
