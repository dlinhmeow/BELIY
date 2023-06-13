import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cart'
import user from './slices/user'
import loading from './slices/loading'
const store = configureStore({
  reducer: {
    cart,
    loading,
    user
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
