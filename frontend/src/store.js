import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import  productApiSlice  from './features/productFilterSlice'

 export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
   products:productApiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

