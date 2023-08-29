import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
  comments: [],
  loading: false,
}

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      })
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create post
    builder.addCase(createComment.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false
      state.comments.push(action.payload)
    })
    builder.addCase(createComment.rejected, (state) => {
      state.loading = false
    })
  },
})

export default commentSlice.reducer
