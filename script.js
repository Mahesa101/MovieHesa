// 13. Fetch Refactor (Async Await)

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");

  // Menunggu (await) sampai fetch selesai dan datanya siap
  const movies = await getmovies(inputKeyword.value);

  // Setelah data siap, baru update UI
  updateUI(movies);
});

document.addEventListener("click", async function (e) {
  // Hanya eksekusi jika yang diklik memiliki class 'modal-detail'
  if (e.target.classList.contains("modal-detail")) {
    const imdbID = e.target.dataset.imdbid;
    const movieDetail = await getMoviesDetail(imdbID);
    updateUIDetail(movieDetail);
  }
});

function getmovies(keyword) {
  return fetch(`http://www.omdbapi.com/?apikey=ac5c61ee&s=${keyword}`)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function getMoviesDetail(imdbID) {
  return fetch(`http://www.omdbapi.com/?apikey=ac5c61ee&i=${imdbID}`)
    .then((response) => response.json())
    .then((movieDetails) => movieDetails);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += renderMovieCard(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function updateUIDetail(m) {
  const movieDetailMarkup = renderMovieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetailMarkup;
}

function renderMovieCard(movie) {
  return `
          <div class="col-md-4 movie-card-wrapper">
            <div class="card h-100">
              <img src="${movie.Poster}" class="card-img-top" alt="${movie.Type}" />
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle">${movie.Year}</h6>
                <a
                  href="#"
                  class="btn-detail modal-detail"
                  data-bs-toggle="modal"
                  data-bs-target="#DetailMovie"
                  data-imdbid="${movie.imdbID}"
                >
                  Show Detail
                </a>
              </div>
            </div>
          </div>
        `;
}

// Function untuk membuat elemen Detail Film di dalam Modal
function renderMovieDetails(details) {
  return `
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3 mb-3 mb-md-0">
                    <img src="${details.Poster}" alt="${details.Title}" class="img-fluid" />
                  </div>
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${details.Title} | ${details.Year}</h4></li>
                      <li class="list-group-item"><strong>Director:</strong> ${details.Director}</li>
                      <li class="list-group-item"><strong>Actors:</strong> ${details.Actors}</li>
                      <li class="list-group-item"><strong>Writer:</strong> ${details.Writer}</li>
                      <li class="list-group-item"><strong>Plot:</strong> ${details.Plot}</li>
                    </ul>
                  </div>
                </div>
              </div>
            `;
}
