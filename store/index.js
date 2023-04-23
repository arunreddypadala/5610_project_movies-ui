import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import profileReducer from "./profile-reducer.js";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("content/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=93e263e41babdc8c20fdaf2d5c616fb7"
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "content/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      content: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=93e263e41babdc8c20fdaf2d5c616fb7&with_genres=${genre}`,
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "content/trending",
  async ({ type }, thunkAPI) => {
    const {
      content: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "content/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:3000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "content/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:3000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const ContentSlice = createSlice({
  name: "Content",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    content: ContentSlice.reducer,
    profile: profileReducer
  },
});

export const { setGenres, setMovies } = ContentSlice.actions;
