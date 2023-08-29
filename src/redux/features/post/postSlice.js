import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
}

export const createPost = createAsyncThunk(
  'post/postSlice',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/posts', params)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_idx, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/posts')
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const removeMyPost = createAsyncThunk(
  'post/removeMyPost',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (updatedPost, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload
    })
    builder.addCase(createPost.rejected, (state) => {
      state.loading = false
    })
    //Get all post
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload.posts
      state.popularPosts = action.payload.popularPosts
    })
    builder.addCase(getAllPosts.rejected, (state) => {
      state.loading = false
    })
    //Remove Post
    builder.addCase(removeMyPost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(removeMyPost.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(removeMyPost.rejected, (state) => {
      state.loading = false
    })
    //Update Post
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id,
      )
      state.posts[index] = action.payload
    })
    builder.addCase(updatePost.rejected, (state) => {
      state.loading = false
    })
  },
})

export default postSlice.reducer
