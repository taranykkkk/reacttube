import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../data';

const initialState = {
  status: null,
  error: null,
  data: [],
};

export const fetchChannelData = createAsyncThunk(
  'video/fetchChannelData',
  async (_, { rejectWithValue, getState }) => {
    try {
      const channelInfoURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
        getState().video.data[0].snippet.channelId
      }&key=${API_KEY}`;
      const response = await fetch(channelInfoURL);

      if (!response.ok) {
        throw new Error("Can't get channel data. Server Error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchChannelData
    builder.addCase(fetchChannelData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchChannelData.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.data = action.payload.items[0];
    });
    builder.addCase(fetchChannelData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default channelSlice.reducer;
