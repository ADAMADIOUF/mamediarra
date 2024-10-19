import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartSlice from './slices/cartSlice'
import modalReducer from './slices/modalSlice'
 export const store = configureStore({
   reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer,
     cart: cartSlice,
     modal: modalReducer,
   },
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
 })

