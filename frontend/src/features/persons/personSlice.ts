import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, backEndCall } from '../../util/helper';

// ----------- Async Thunks ------------
export const listPeople = createAsyncThunk(
    'person/list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchData('person/popular');
            return response.results;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const listPersonDetails = createAsyncThunk(
    'person/details',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`person/${id}`);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const savePersonDetails = createAsyncThunk(
    'person/save',
    async (person: any, { rejectWithValue }) => {
        try {
            const response = await backEndCall('people', person);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

export const listTopBilledActors = createAsyncThunk(
    'person/topBilledActors',
    async (movieId: string, { rejectWithValue }) => {
        try {
            const response = await fetchData(`movie/${movieId}/credits`);
            return response.cast;
        } catch (err: any) {
            return rejectWithValue(err.response);
        }
    }
);

// ----------- Initial State ------------
interface PersonState {
    people: any[];
    person: any;
    topBilledActors: any[];
    loading: boolean;
    error: string | null;
}

const initialState: PersonState = {
    people: [],
    person: {},
    topBilledActors: [],
    loading: false,
    error: null
};

// ----------- Slice ------------
const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // listPeople
            .addCase(listPeople.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listPeople.fulfilled, (state, action) => {
                state.loading = false;
                state.people = action.payload;
            })
            .addCase(listPeople.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // listPersonDetails
            .addCase(listPersonDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listPersonDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload;
            })
            .addCase(listPersonDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // savePersonDetails
            .addCase(savePersonDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(savePersonDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload;
            })
            .addCase(savePersonDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // listTopBilledActors
            .addCase(listTopBilledActors.pending, (state) => {
                state.loading = true;
            })
            .addCase(listTopBilledActors.fulfilled, (state, action) => {
                state.loading = false;
                state.topBilledActors = action.payload;
            })
            .addCase(listTopBilledActors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default personSlice.reducer;
