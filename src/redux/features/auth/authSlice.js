import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
  user: null,
  token: null,
  loading: false,
  status: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    try {
      const res = await axios.post('/auth/register', {
        username,
        password,
      })
      if (res.data.token) window.localStorage.setItem('token', res.data.token)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const res = await axios.post('/auth/login', {
        username,
        password,
      })
      if (res.data.token) window.localStorage.setItem('token', res.data.token)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log('Error:', error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.loading = false
      state.status = null
      window.localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    //Register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.status = null
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = action.payload.message
      state.loading = false
    })
    //Login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.status = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.message
      state.loading = false
    })
    //Check Auth
    builder.addCase(getMe.pending, (state) => {
      state.loading = true
      state.status = null
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.loading = false
      state.status = null
      state.user = action.payload?.user
      state.token = action.payload?.token
    })
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message
      state.loading = false
    })
  },
})

export const CheckIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer
