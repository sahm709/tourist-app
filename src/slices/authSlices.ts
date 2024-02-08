import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'

type User = {
  email: string
  password: string
}

type NewUser = User & {
  name: string
}

export type UserBasicInfo = {
  Id: string
  Name: string
  Email: string
  Token: string
}

type UserProfileData = {
  id: string
  name: string
  email: string
  avatar: string
}

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null
  userProfileData?: UserProfileData | null
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
  userProfileData: undefined,
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk('login', async (data: User) => {
  const myHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  const urlencoded = new URLSearchParams()
  urlencoded.append('email', data.email)
  urlencoded.append('password', data.password)

  try {
    const response = await axiosInstance.post('/api/authaccount/login', urlencoded.toString(), {
      headers: myHeaders,
    })
    const resData = response.data.data

    localStorage.setItem('userInfo', JSON.stringify(resData))

    return resData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

export const register = createAsyncThunk('register', async (data: NewUser) => {
  const myHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const urlencoded = new URLSearchParams()
  urlencoded.append('email', data.email)
  urlencoded.append('password', data.password)
  urlencoded.append('name', data.name)

  try {
    const response = await axiosInstance.post(
      '/api/authaccount/registration',
      urlencoded.toString(),
      {
        headers: myHeaders,
      },
    )
    const resData = response.data.data

    localStorage.setItem('userInfo', JSON.stringify(resData))

    return resData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

export const logout = createAsyncThunk('logout', async () => {
  localStorage.removeItem('userInfo')

  return
})

export const getUser = createAsyncThunk('users/profile', async (userId: string, thunkAPI) => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    const userObject: UserBasicInfo = JSON.parse(userInfo || '')
    const token = userObject.Token

    const myHeaders = {
      Authorization: `Bearer ${token}`,
    }
    const response = await axiosInstance.get(`/api/users/${userId}`, {
      headers: myHeaders,
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserBasicInfo>) => {
        state.status = 'idle'
        state.basicUserInfo = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Login failed'
      })

      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserBasicInfo>) => {
        state.status = 'idle'
        state.basicUserInfo = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Registration failed'
      })

      .addCase(logout.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'idle'
        state.basicUserInfo = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Logout failed'
      })

      .addCase(getUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userProfileData = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Get user profile data failed'
      })
  },
})

export default authSlice.reducer
