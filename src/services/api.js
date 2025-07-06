const API_KEY = "f92e6d2349b423d047a1f683adf68398";
const BASE_URL = "/api";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
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
