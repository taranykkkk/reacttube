import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../data';

const initialState = {
  status: null,
  error: null,
  data: [],
};

export const fetchVideoData = createAsyncThunk(
  'video/fetchVideoData',
  async (videoId, { rejectWithValue }) => {
    try {
      const videoDetailsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetailsURL);

      if (!response.ok) {
        throw new Error("Can't get video data. Server Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchVideoData
    builder.addCase(fetchVideoData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchVideoData.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.data = [action.payload.items[0]];
    });
    builder.addCase(fetchVideoData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default videoSlice.reducer;
