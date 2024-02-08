import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TouristInterface } from '../models'
import { UserBasicInfo } from './authSlices'
import axiosInstance from '../api/axiosInstance'

// shape of todos array
interface TouristListInterface {
  touristList: TouristInterface[]
  updateState: boolean
  loading: boolean
  error: string
  response: string
  currentPage: number
  totalPages: number
  totalRecord: number
}

export type NewTourist = {
  tourist_email: string
  tourist_location: string
  tourist_name: string
}
export type Tourist = {
  id: string
  tourist_email: string
  tourist_location: string
  tourist_name: string
}

// initial todos state
const initialState: TouristListInterface = {
  touristList: [],
  updateState: false,
  loading: false,
  error: '',
  response: '',
  currentPage: 1,
  totalPages: 1,
  totalRecord: 0,
}
export const fetchTourist = createAsyncThunk('tourist/fetchTourist', async (page: number) => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    const userObject: UserBasicInfo = JSON.parse(userInfo || '')
    const token = userObject.Token
    const response = await axiosInstance.get(`/api/Tourist?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

export const addTourist = createAsyncThunk('tourist/addTourist', async (data: NewTourist) => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    const userObject: UserBasicInfo = JSON.parse(userInfo || '')
    const token = userObject.Token
    const myHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }

    const urlencoded = new URLSearchParams()
    urlencoded.append('tourist_email', data.tourist_email)
    urlencoded.append('tourist_location', data.tourist_location)
    urlencoded.append('tourist_name', data.tourist_name)

    const response = await axiosInstance.post('/api/Tourist', urlencoded, {
      headers: myHeaders,
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

export const editTourist = createAsyncThunk('tourist/editTourist', async (data: Tourist) => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    const userObject: UserBasicInfo = JSON.parse(userInfo || '')
    const token = userObject.Token
    const myHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }

    const urlencoded = new URLSearchParams()
    urlencoded.append('tourist_email', data.tourist_email)
    urlencoded.append('tourist_location', data.tourist_location)
    urlencoded.append('tourist_name', data.tourist_name)

    const response = await axiosInstance.put(`/api/Tourist/${data.id}`, urlencoded, {
      headers: myHeaders,
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

export const removeTourist = createAsyncThunk('tourist/removeTourist', async (data: Tourist) => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    const userObject: UserBasicInfo = JSON.parse(userInfo || '')
    const token = userObject.Token
    const myHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }

    const urlencoded = new URLSearchParams()
    urlencoded.append('tourist_email', data.tourist_email)
    urlencoded.append('tourist_location', data.tourist_location)
    urlencoded.append('tourist_name', data.tourist_name)
    const response = await axiosInstance.delete(`/api/Tourist/${data.id}`, {
      headers: myHeaders,
    })

    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
})

const touristSlices = createSlice({
  name: 'tourist',
  initialState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true
    },
    changeStateFalse: (state) => {
      state.updateState = false
    },
    clearResponse: (state) => {
      state.response = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTourist.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTourist.fulfilled, (state, action) => {
        state.touristList = action.payload.data
        state.currentPage = action.payload.page
        state.totalPages = action.payload.total_pages
        state.totalRecord = action.payload.totalrecord
        state.loading = false
      })
      .addCase(fetchTourist.rejected, (state, action) => {
        state.error = action.error.message || 'error when fetch data'
      })

    builder
      .addCase(addTourist.pending, (state) => {
        state.loading = true
      })
      .addCase(addTourist.fulfilled, (state, action) => {
        state.loading = false
        state.touristList.push(action.payload)
        state.response = 'add'
      })
      .addCase(addTourist.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'error when add data'
      })

    builder.addCase(removeTourist.fulfilled, (state, action) => {
      state.touristList = state.touristList.filter((item) => item.id !== action.payload)
      state.response = 'delete'
    })

    builder.addCase(editTourist.fulfilled, (state, action) => {
      const updateItem = action.payload
      console.log(updateItem)
      const index = state.touristList.findIndex((item) => item.id === updateItem.id)
      if (index !== -1) {
        state.touristList[index] = updateItem
      }
      state.response = 'update'
    })
  },
})

export default touristSlices.reducer
export const { changeStateTrue, changeStateFalse, clearResponse } = touristSlices.actions
