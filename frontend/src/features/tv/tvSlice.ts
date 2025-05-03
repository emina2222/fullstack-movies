import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, backEndCall, searchData } from '../../util/helper';

// ---------------------- Async Thunks ----------------------
export const fetchTvList = createAsyncThunk(
    'tv/fetchList',
    async (tvCategory: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`tv/${tvCategory}`);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const fetchTvDetails = createAsyncThunk(
    'tv/fetchDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`tv/${id}`);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const saveTvDetails = createAsyncThunk(
    'tv/saveDetails',
    async (tv: any, { rejectWithValue }) => {
        try {
            const response = await backEndCall('tv', tv);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const fetchSeriesCast = createAsyncThunk(
    'tv/fetchSeriesCast',
    async (tvId: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`tv/${tvId}/credits`);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const fetchCurrentSeason = createAsyncThunk(
    'tv/fetchCurrentSeason',
    async (tvId: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`tv/${tvId}/season/1`);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const searchTvShows = createAsyncThunk(
    'tv/search',
    async ({ mediaType, query, page }: { mediaType: string; query: string; page: number }, { rejectWithValue }) => {
        try {
            const response = await searchData(mediaType, query, page);
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

// ---------------------- State & Slice ----------------------
interface TvState {
    tvs: any[];
    tv: any;
    seriesCast: any;
    currentSeasonEpisodes: any;
    searchedTvs: any[];
    loading: boolean;
    error: string | null;
}

const initialState: TvState = {
    tvs: [],
    tv: {},
    seriesCast: {},
    currentSeasonEpisodes: {},
    searchedTvs: [],
    loading: false,
    error: null
};

const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // List
            .addCase(fetchTvList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTvList.fulfilled, (state, action) => {
                state.loading = false;
                state.tvs = action.payload;
            })
            .addCase(fetchTvList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Details
            .addCase(fetchTvDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTvDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.tv = action.payload;
            })
            .addCase(fetchTvDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Save
            .addCase(saveTvDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveTvDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.tv = action.payload;
            })
            .addCase(saveTvDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Series Cast
            .addCase(fetchSeriesCast.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSeriesCast.fulfilled, (state, action) => {
                state.loading = false;
                state.seriesCast = action.payload;
            })
            .addCase(fetchSeriesCast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Current Season
            .addCase(fetchCurrentSeason.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentSeason.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSeasonEpisodes = action.payload;
            })
            .addCase(fetchCurrentSeason.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Search
            .addCase(searchTvShows.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchTvShows.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedTvs = action.payload;
            })
            .addCase(searchTvShows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default tvSlice.reducer;
