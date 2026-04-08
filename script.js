const movieContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");

let allMovies = [];

// 🔹 Fetch Data (API)
async function fetchMovies() {
  const res = await fetch("https://api.tvmaze.com/shows");
  const data = await res.json();

  allMovies = data;
  displayMovies(data);
  showTopMovie(data[0]);
}


// 🔹 Display Movies
function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
  <img loading="lazy" src="${movie.image?.medium || ''}" />
  <p>${movie.name}</p>
`;

    movieContainer.appendChild(div);
  });
}

// 🔹 Debounce (VERY IMPORTANT FOR INTERVIEW)************************************************************
function debounce(func, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

// 🔹 Search Function
function searchMovies() {
  const value = searchInput.value.toLowerCase();

  const filtered = allMovies.filter(movie =>
    movie.name.toLowerCase().includes(value)
  );

  displayMovies(filtered);
}


/////////////
function showTopMovie(movie) {
  const top = document.getElementById("topShow");

  top.innerHTML = `
    <h3>${movie.name}</h3>
   <img loading="lazy" src="${movie.image?.medium}" />
  `;
}
function showAll() {
  displayMovies(allMovies);
}

function filterTV() {
  // TV shows = scripted + reality
  const tv = allMovies.filter(m => m.type === "Scripted" || m.type === "Reality");
  displayMovies(tv);
}

function filterMovies() {
  // Fake movie category (API limitation)
  const movies = allMovies.slice(0, 20);
  displayMovies(movies);
}

function filterGames() {
  // Dummy category
  const games = allMovies.slice(20, 40);
  displayMovies(games);
}

// Apply debounce
const debouncedSearch = debounce(searchMovies, 500);

searchInput.addEventListener("input", debouncedSearch);

function login() {
  const user = document.getElementById("username").value;

  if (user === "") {
    alert("Enter username");
    return;
  }

  startApp();
}

function guestLogin() {
  startApp();
}

function startApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";

  fetchMovies(); // app start
}