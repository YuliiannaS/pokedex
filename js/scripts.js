$(document).ready(function () {
    const pokemonRepository = (function () {
        let pokemonList = [];

        function loadList(page) {
            return $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=' + (page - 1) * 100,
                dataType: 'json'
            })
                .then(function (data) {
                    clean();
                    data.results.forEach(function (pokemon) {
                        add({
                            name: pokemon.name,
                            detailsUrl: pokemon.url
                        });
                    });
                });
        }

        function clean() {
            $("#pokemons").empty();
            pokemonList = [];
        }

        function loadDetails(pokemon) {
            return $.ajax({
                url: pokemon.detailsUrl,
                dataType: 'json'
            })
                .then(function (data) {
                    const pokemonUpdate = pokemonList.find(function (p) {
                        return p.name === pokemon.name;
                    });
                    pokemonUpdate.imgUrl = data.sprites.front_default;
                    pokemonUpdate.height = data.height;
                    return pokemonUpdate;
                });
        }

        function showDetails(pokemon) {
            let modalContainer = $('#modal-container');

            // Remove any existing modal content
            modalContainer.empty();

            // Create the modal structure using jQuery
            let modal = $('<div>').addClass('modal fade');
            modal.attr('id', 'pokemon-modal');
            modal.attr('tabindex', '-1');
            modal.attr('role', 'dialog');
            modal.attr('aria-labelledby', 'pokemon-modal-label');
            modal.attr('aria-hidden', 'true');

            let modalDialog = $('<div>').addClass('modal-dialog');
            let modalContent = $('<div>').addClass('modal-content');

            let modalHeader = $('<div>').addClass('modal-header');
            let modalTitle = $('<h5>').addClass('modal-title').attr('id', 'pokemon-modal-label');
            let closeButton = $('<button>').addClass('close').attr('type', 'button').attr('data-dismiss', 'modal').attr('aria-label', 'Close');
            closeButton.html('<span aria-hidden="true">&times;</span>');
            modalTitle.appendTo(modalHeader);
            closeButton.appendTo(modalHeader);

            let modalBody = $('<div>').addClass('modal-body');
            let heightParagraph = $('<p>').addClass('height');
            let image = $('<img>').addClass('img-fluid');
            heightParagraph.appendTo(modalBody);
            image.appendTo(modalBody);

            let modalFooter = $('<div>').addClass('modal-footer');
            let closeButtonFooter = $('<button>').addClass('btn btn-secondary').attr('type', 'button').attr('data-dismiss', 'modal').text('Close');
            closeButtonFooter.appendTo(modalFooter);

            modalHeader.appendTo(modalContent);
            modalBody.appendTo(modalContent);
            modalFooter.appendTo(modalContent);
            modalContent.appendTo(modalDialog);
            modalDialog.appendTo(modal);

            modal.appendTo(modalContainer);

            // Populate modal content
            modal.find('.modal-title').text(pokemon.name);
            modal.find('.height').html('Height: ' + pokemon.height);
            modal.find('img').attr('src', pokemon.imgUrl);

            // Show modal using Bootstrap's modal('show') method
            $('#pokemon-modal').modal('show');
        }

        function hideModal() {
            let modal = $('#pokemon-modal');
            modal.modal('hide');
        }

        function getAll() {
            return pokemonList;
        }

        function add(pokemon) {
            if (typeof pokemon !== 'object') {
                return false;
            }
            if (typeof pokemon.name !== 'string') {
                return false;
            }
            pokemonList.push(pokemon);
        }

        function addListItem(pokemon) {
            const ul = $('ul#pokemons');
            const li = $('<li>').addClass('list-group-item');
            const button = $('<button>')
                .addClass('btn btn-primary')
                .text(pokemon.name)
                .on('click', function () {
                    loadDetails(pokemon)
                        .then(function (p) {
                            showDetails(p);
                        });
                });

            li.append(button);
            ul.append(li);
        }

        return {
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            hideModal: hideModal,
        };
    })();

    // Load pokemons and add them to the list
    function loadPokemons(page) {
        pokemonRepository.loadList(page)
            .then(function () {
                const pokemons = pokemonRepository.getAll();
                pokemons.forEach(function (pokemon) {
                    pokemonRepository.addListItem(pokemon);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    loadPokemons(1);

    $("#navbarNav .btn").on("click", function() {
        const page = $(this).data("page");
        loadPokemons(page);
    });

    // Show modal when the button is clicked
    $('#show-modal').on('click', () => {
        $('#myModal').modal('show');
    });

    // Close modal when the Escape key is pressed
    $(window).on('keydown', (e) => {
        if (e.key === 'Escape' && $('#pokemon-modal').hasClass('show')) {
            pokemonRepository.hideModal();
        }
    });
});
