import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/movies/movieSlice';
import reviewReducer from './features/movies/reviewSlice';
import personReducer from "./features/persons/personSlice";
import recommendationReducer from "./features/recommendations/recommendationSlice";
import tvReducer from "./features/tv/tvSlice";
import videoReducer from "./features/video/videoSlice";


export const store = configureStore({
    reducer: {
        movies: movieReducer,
        reviews: reviewReducer,
        persons: personReducer,
        recommendations: recommendationReducer,
        tv: tvReducer,
        videos: videoReducer
    }
});