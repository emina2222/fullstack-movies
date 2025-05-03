import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../util/helper';

// ------------------ Thunk ------------------
export const fetchVideos = createAsyncThunk(
    'video/fetch',
    async ({ movieId, type }: { movieId: string; type: string }, { rejectWithValue }) => {
        try {
            const response = await fetchData(`${type}/${movieId}/videos`);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

// ------------------ State ------------------
interface VideoState {
    movieVideo: any[];
    loading: boolean;
    error: string | null;
}

const initialState: VideoState = {
    movieVideo: [],
    loading: false,
    error: null
};

// ------------------ Slice ------------------
const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.movieVideo = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default videoSlice.reducer;
