import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, backEndCall, searchData } from '../../util/helper';

// ----------- Async Thunks ------------
export const listMovies = createAsyncThunk(
    'movies/list',
    async (movie: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`movie/${movie}`);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const listMovieDetails = createAsyncThunk(
    'movies/details',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`movie/${id}`);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const saveMovieDetails = createAsyncThunk(
    'movies/save',
    async (movie: any, { rejectWithValue }) => {
        try {
            const response = await backEndCall(`movies`, movie);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const listMovieCredits = createAsyncThunk(
    'movies/credits',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`person/${id}/movie_credits`);
            return response.cast;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const listMovieSearch = createAsyncThunk(
    'movies/search',
    async ({ movie, searchTerm, pageNumber }: { movie: string; searchTerm: string; pageNumber: number }, { rejectWithValue }) => {
        try {
            const response = await searchData(movie, searchTerm, pageNumber);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

// ----------- Initial State ------------
interface MovieState {
    movies: any[];
    movie: any;
    movieCreditsObj: any;
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    movie: {},
    movieCreditsObj: {},
    loading: false,
    error: null
};

// ----------- Slice ------------
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Movie List
            .addCase(listMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(listMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(listMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Movie Details
            .addCase(listMovieDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(listMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Save Movie Details
            .addCase(saveMovieDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(saveMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Movie Credits
            .addCase(listMovieCredits.pending, (state) => {
                state.loading = true;
            })
            .addCase(listMovieCredits.fulfilled, (state, action) => {
                state.loading = false;
                state.movieCreditsObj = action.payload;
            })
            .addCase(listMovieCredits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Movie Search
            .addCase(listMovieSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(listMovieSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(listMovieSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default movieSlice.reducer;
