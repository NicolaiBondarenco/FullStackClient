import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth/authSlice'
import post from './features/post/postSlice'

export const store = configureStore({
  reducer: {
    auth,
    post,
  },
})
