// features/recommendation/recommendationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../util/helper';

export const fetchRecommendations = createAsyncThunk(
    'recommendation/fetch',
    async ({ movieId, type }: { movieId: string; type: string }, { rejectWithValue }) => {
        try {
            const response = await fetchData(`${type}/${movieId}/recommendations`);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

interface RecommendationState {
    recommendationData: any[];
    loading: boolean;
    error: string | null;
}

const initialState: RecommendationState = {
    recommendationData: [],
    loading: false,
    error: null
};

const recommendationSlice = createSlice({
    name: 'recommendation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendationData = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default recommendationSlice.reducer;
