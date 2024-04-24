import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './feedSlice';
import categoryReducer from './categorySlice';
import videoReducer from './videoSlice';
import commentReducer from './commentSlice';
import channelReducer from './channelSlice';
import recommendedReducer from './recommendedSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    category: categoryReducer,
    video: videoReducer,
    comment: commentReducer,
    channel: channelReducer,
    recommended: recommendedReducer,
    search: searchReducer,
  },
});
