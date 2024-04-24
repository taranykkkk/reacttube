import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../data';

const initialState = {
  recommended: [],
  status: null,
  error: null,
  fetching: true,
  nextPage: null,
};

export const fetchRecommended = createAsyncThunk(
  'recommended/fetchRecommended',
  async (categoryId, { rejectWithValue, dispatch, getState }) => {
    try {
      let nextPageState = getState().recommended.nextPage;
      let nextPageValue = nextPageState ? `pageToken=${nextPageState}&` : '';

      const relatedVideoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&${nextPageValue}maxResults=10&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const response = await fetch(relatedVideoURL);

      if (!response.ok) {
        throw new Error("Can't get recommended data. Server Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setFetchingRecommended(false));
    }
  },
);

export const recommendedSlice = createSlice({
  name: 'recommended',
  initialState,
  reducers: {
    setFetchingRecommended: (state, action) => {
      state.fetching = action.payload;
    },
    clearRecommended: (state) => {
      state.recommended.splice(0, state.recommended.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecommended.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRecommended.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.recommended.push(...action.payload.items);
      state.nextPage = action.payload.nextPageToken;
    });
    builder.addCase(fetchRecommended.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});
export const { setFetchingRecommended, clearRecommended } =
  recommendedSlice.actions;
export default recommendedSlice.reducer;
