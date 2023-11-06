import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'
import { toast } from "react-toastify";



const initialState = {
    tickets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const setTicket = createAsyncThunk(
    'ticket/set',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            return await ticketService.setTicket(ticketData, token)

        }
        catch (error) {
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

export const getUserTickets = createAsyncThunk(
    'ticket/getuserticket',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().dept.dept.token
            return await ticketService.getUserTickets(token)

        }
        catch (error) {
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

export const getDeptTickets = createAsyncThunk(
    'ticket/getdeptticket',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().dept.dept.token
            return await ticketService.getDeptTickets(token)

        }
        catch (error) {
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

export const updateTicket = createAsyncThunk(
    'ticket/updateticket',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().dept.dept.token
            return await ticketService.updateTicket(ticketData, token)

        }
        catch (error) {
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

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setTicket.pending, (state) => {
                state.isLoading = true
                toast.success("....")

            })
            .addCase(setTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets.push(action.payload)
                toast.success("Ticket is set Successfully")
            })
            .addCase(setTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error("Ticket is not set ")
                console.log(state.message);

            })
            .addCase(getUserTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getUserTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDeptTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDeptTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getDeptTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(updateTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset}=ticketSlice.actions
export default ticketSlice.reducer