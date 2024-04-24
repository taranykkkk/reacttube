import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../data';
import { fetchVideoData } from './videoSlice';

const initialState = {
  data: [],
  status: null,
  error: null,
  moreResult: null,
  searchValue: '',
};

export const fetchSearchData = createAsyncThunk(
  'data/fetchSearchData',
  async (value, { rejectWithValue, dispatch, getState }) => {
    try {
      if (value !== getState().search.searchValue) {
        dispatch(clearFetchSearchData());
      }
      let moreSearchState = getState().search.moreResult;
      let moreSearchValue = moreSearchState
        ? `pageToken=${moreSearchState}&`
        : '';

      const videoListURL = `https://youtube.googleapis.com/youtube/v3/search?q=${value}$&key=${API_KEY}&part=snippet&type=video${moreSearchValue}`;
      const response = await fetch(videoListURL);

      if (!response.ok) {
        throw new Error("Can't get search. Server Error");
      }

      const data = await response.json();
      const statisticPromise = await data.items.map((elem) =>
        dispatch(fetchVideoData(elem.id.videoId)),
      );

      const valuePromise = await Promise.all(statisticPromise);

      const viewCont = await valuePromise.map(
        (elem) => elem.payload.items[0].statistics.viewCount,
      );
      const categoryId = await valuePromise.map(
        (elem) => elem.payload.items[0].snippet.categoryId,
      );
      const resultData = await data.items.map((elem, i) => {
        elem.viewCount = viewCont[i];
        elem.categoryId = categoryId[i];
      });
      return await data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const searchSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearFetchSearchData: (state) => {
      state.moreResult = null;
      state.data.splice(0, state.data.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchSearchData.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.data.push(...action.payload.items);
      state.moreResult = action.payload.nextPageToken;
      console.log(action.payload);
    });
    builder.addCase(fetchSearchData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setSearchValue, clearFetchSearchData } = searchSlice.actions;
export default searchSlice.reducer;
