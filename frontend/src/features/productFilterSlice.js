import { createSlice } from '@reduxjs/toolkit'
import products  from "../data"

const initialState = {
  products: products,
  filteredProducts: products,
  filters: {
    category: '',
    priceRange: { min: 0, max: 100 },
    rating: 0,
  },
  sortOption: '',
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload
      state.filteredProducts = state.products.filter((product) => {
        const withinPriceRange =
          product.price >= state.filters.priceRange.min &&
          product.price <= state.filters.priceRange.max
        return withinPriceRange
      })
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload
      state.filteredProducts = state.products.filter((product) => {
        return state.filters.category
          ? product.category === state.filters.category
          : true
      })
    },
    setRating: (state, action) => {
      state.filters.rating = action.payload
      state.filteredProducts = state.products.filter((product) => {
        return state.filters.rating
          ? product.rating >= state.filters.rating
          : true
      })
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        if (state.sortOption === 'priceLowToHigh') {
          return a.price - b.price
        } else if (state.sortOption === 'priceHighToLow') {
          return b.price - a.price
        } else if (state.sortOption === 'aToZ') {
          return a.name.localeCompare(b.name)
        } else if (state.sortOption === 'zToA') {
          return b.name.localeCompare(a.name)
        }
        return 0
      })
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: { min: 0, max: 100 },
        rating: 0,
      }
      state.filteredProducts = state.products
    },
  },
})

export const {
  setPriceRange,
  setCategory,
  setRating,
  setSortOption,
  clearFilters,
} = productSlice.actions
export default productSlice.reducer
