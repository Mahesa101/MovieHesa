// 10.2 Callback (Latihan)

$(".search-button").on("click", function () {
  const keyword = $(".input-keyword").val();

  $.ajax({
    url: `http://www.omdbapi.com/?apikey=ac5c61ee&s=${keyword}`,
    success: (hasil) => {
      const movies = hasil.Search;
      let cards = "";

      movies.forEach((m) => {
        cards += MovieH(m);
      });

      $(".movie-container").html(cards);

      // Tombol detail dipencet
      $(".modal-detail").on("click", function () {
        const imdbID = $(this).data("imdbid");

        $.ajax({
          url: `http://www.omdbapi.com/?apikey=ac5c61ee&i=${imdbID}`,
          success: (h) => {
            const movieDetail = MovieD(h);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.error("Detail fetch error:", e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.error("Search fetch error:", e.responseText);
    },
  });
});

function MovieH(m) {
  return `
          <div class="col-md-4 movie-card-wrapper">
            <div class="card h-100">
              <img src="${m.Poster}" class="card-img-top" alt="${m.Type}" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle">${m.Year}</h6>
                <a
                  href="#"
                  class="btn-detail modal-detail"
                  data-bs-toggle="modal"
                  data-bs-target="#DetailMovie"
                  data-imdbid="${m.imdbID}"
                >
                  Show Detail
                </a>
              </div>
            </div>
          </div>
        `;
}

function MovieD(h) {
  return `
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3 mb-3 mb-md-0">
                    <img src="${h.Poster}" alt="${h.Title}" class="img-fluid" />
                  </div>
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${h.Title} | ${h.Year}</h4></li>
                      <li class="list-group-item"><strong>Director:</strong> ${h.Director}</li>
                      <li class="list-group-item"><strong>Actors:</strong> ${h.Actors}</li>
                      <li class="list-group-item"><strong>Writer:</strong> ${h.Writer}</li>
                      <li class="list-group-item"><strong>Plot:</strong> ${h.Plot}</li>
                    </ul>
                  </div>
                </div>
              </div>
            `;
}
