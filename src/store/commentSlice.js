import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../data';

const initialState = {
  status: null,
  error: null,
  data: [],
  moreComments: null,
  fetching: true,
};

export const fetchCommentData = createAsyncThunk(
  'video/fetchCommentData',
  async (videoId, { rejectWithValue, dispatch, getState }) => {
    try {
      let moreCommentsState = getState().comment.moreComments;
      let moreCommentsValue = moreCommentsState
        ? `pageToken=${moreCommentsState}&`
        : '';
      const commentURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=5&${moreCommentsValue}videoId=${videoId}&key=${API_KEY}`;
      const response = await fetch(commentURL);

      if (!response.ok) {
        throw new Error("Can't get comment data. Server Error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setFetchingComment(false));
    }
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setFetchingComment: (state, action) => {
      state.fetching = action.payload;
    },
    clearComment: (state) => {
      state.moreComments = null;
      state.data.splice(0, state.data.length);
    },
  },
  extraReducers: (builder) => {
    //fetchCommentData
    builder.addCase(fetchCommentData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCommentData.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.data.push(...action.payload.items);
      state.moreComments = action.payload.nextPageToken;
    });
    builder.addCase(fetchCommentData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});
export const { setFetchingComment, clearComment } = commentSlice.actions;
export default commentSlice.reducer;
