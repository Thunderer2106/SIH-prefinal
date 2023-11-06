import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import deptService from './deptService'

const dept = JSON.parse(localStorage.getItem('dept'))

const initialState = {
    dept: dept ?dept:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

}

// Register dept
export const register = createAsyncThunk(
    'dept/register',
    async (dept, thunkAPI) => {
        try {
            return await deptService.register(dept)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Login Dept
export const login = createAsyncThunk('dept/login', async (dept, thunkAPI) => {
    try {
        return await deptService.login(dept)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout dept
export const logout = createAsyncThunk('dept/logout', async () => {
    await deptService.logout()
})


export const deptSlice = createSlice({
    name: 'dept',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.dept = action.payload
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.dept = null
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.dept = action.payload
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.dept = null
        })
        .addCase(logout.fulfilled, (state) => {
          state.dept = null
        })
    },
  })
  
  export const { reset } = deptSlice.actions
  export default deptSlice.reducer
  