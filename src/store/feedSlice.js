import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../data';

const initialState = {
  data: [],
  status: null,
  error: null,
  fetching: true,
  moreFeed: null,
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (category, { rejectWithValue, dispatch, getState }) => {
    try {
      let moreFeedState = getState().feed.moreFeed;
      let moreFeedValue = moreFeedState ? `pageToken=${moreFeedState}&` : '';

      const videoListURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&${moreFeedValue}maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoListURL);

      if (!response.ok) {
        throw new Error("Can't get feeds. Server Error");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setFetchingFeed(false));
    }
  },
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFetchingFeed: (state, action) => {
      state.fetching = action.payload;
    },
    clearFeed: (state) => {
      state.moreFeed = null;
      state.data.splice(0, state.data.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.data.push(...action.payload.items);
      state.moreFeed = action.payload.nextPageToken;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setFetchingFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
