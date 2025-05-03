import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../util/helper';

export const fetchReviews = createAsyncThunk(
    'reviews/fetch',
    async ({ movieId, type }: { movieId: string; type: string }, { rejectWithValue }) => {
        try {
            const response = await fetchData(`${type}/${movieId}/reviews`);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

interface ReviewState {
    movieReviews: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    movieReviews: [],
    loading: false,
    error: null
};

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.movieReviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default reviewSlice.reducer;
