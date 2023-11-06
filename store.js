import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import deptReducer from '../features/dept/deptSlice'
import ticketReducer from '../features/ticket/ticketSlice';
export const store = configureStore({
  reducer: {
    user:userReducer,
    dept:deptReducer,
    ticket:ticketReducer
  },
});
