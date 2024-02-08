import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlices'
import touristReducer from '../slices/touristSlices'
const store = configureStore({
  reducer: {
    auth: authReducer,
    tourist: touristReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
