const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();

  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page${page}`
  );
  const data = await response.json();

  return data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page${page}`
  );
  const data = await response.json();

  return data;
};

export const discoverMovies = async (filters, sort, page = 1) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page,
    sort_by: sort,
    include_adult: "false",
    include_video: "false",
  });

  if (filters.genre) params.append("with_genres", filters.genre.join(","));
  if (filters.language)
    params.append("with_original_language", filters.language);
  if (filters.country)
    params.append("with_origin_country", filters.country.join(","));
  if (filters.year) params.append("primary_release_year", filters.year);
  if (sort === "vote_average.asc" || sort === "vote_average.desc")
    params.append("vote_count.gte", 200);

  const response = await fetch(
    `${BASE_URL}/discover/movie?${params.toString()}`
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getMovie = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getMovieGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getCountries = async () => {
  const response = await fetch(
    `${BASE_URL}/configuration/countries?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getLanguages = async () => {
  const response = await fetch(
    `${BASE_URL}/configuration/languages?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
