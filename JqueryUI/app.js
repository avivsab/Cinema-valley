$().ready(function () {
    
    function createMovieElement(movie) {
        console.log(movie)
        const $element = $(`
         <div class="movie container">
                <span class="genre badge badge-warning">${movie.genre.toUpperCase()}</span>    
                <div class="row">
                    <div class="d-none d-lg-block col-lg-2">
                        <img src="${movie.image}"/>
                    </div>
                    <div class="col-lg-10">
                        <h2>
                            <a title="visit movie page at IMDB" target="_blank" href="${movie.imdbLink}">${movie.name}</a>
                        </h2>
                        <div>                        
                        <p>
                            <span>Actors:</span>
                            <span>${movie.actors.join(', ')}</span>
                        </p>
                        <p>
                        <button class="btn btn-sm btn-danger description-button">Show/hide Description</button>
                        </p>
                        <p class="description">${movie.description}</p>
                        <button class="btn btn-primary buy-ticket-button">BUY TICKET</button>
                    </div>
                </div>
         </div>
        `);
        $element.find('.description-button').on('click', function (e) {
            $element.find('.description').slideToggle();
        });

        $element.find('.buy-ticket-button').on('click', function () {
            $('.notification')
                .text(`Thanks for buying a ticket to "${movie.name}"!`)
                .fadeIn()
                .delay(3000)
                .slideUp();
        });
        return $element;
    }

    function renderMovieList(genre) {
        $('.movie-list').empty();

        for (let i = 0; i < movies.length; i++) {
            if (!genre || movies[i].genre === genre) {
                $('.movie-list').append(createMovieElement(movies[i]));
            }
        }
    }

    $('.filter-btn').each(function (_, btn) {
        const genre = $(btn).attr('data-filter');
        $(btn).on('click', function () {
            renderMovieList(genre);
        });
    });

    renderMovieList();
});