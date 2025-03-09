const API_KEY = 'TON_API_KEY_ICI';  // Remplace par ta clé TMDb
const BASE_URL = 'https://api.themoviedb.org/3';

async function getPersonalizedMovie(genre, decennie, ambiance) {
    try {
        const yearStart = parseInt(decennie);
        const yearEnd = yearStart + 9;

        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31&sort_by=popularity.asc&vote_count.gte=10&vote_count.lte=500&popularity.lte=50&vote_average.gte=6.5&include_adult=false`);
        const data = await response.json();
        let movies = data.results;

        // Filtrer selon l’ambiance choisie
        if (ambiance === "dark") {
            movies = movies.filter(movie => movie.vote_average < 7.5);
        } else if (ambiance === "joyful") {
            movies = movies.filter(movie => movie.vote_average >= 7.5);
        }

        if (movies.length > 0) {
            const selectedMovie = movies[Math.floor(Math.random() * movies.length)];

            document.getElementById("titre-film").innerText = selectedMovie.title;
            document.getElementById("affiche-film").src = `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`;
            document.getElementById("description-film").innerText = selectedMovie.overview;
            document.getElementById("resultat").style.display = "block";
        } else {
            alert("Aucune pépite de qualité trouvée selon tes critères !");
        }
    } catch (error) {
        console.error("Erreur API TMDb :", error);
        alert("Impossible de récupérer les données.");
    }
}

document.getElementById("preferences").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const genre = document.getElementById("genre").value;
    const decennie = document.getElementById("decennie").value;
    const ambiance = document.getElementById("ambiance").value;

    getPersonalizedMovie(genre, decennie, ambiance);
});
