import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteCookie, getCookie } from 'cookies-next'
interface UserReduxProps {
  id: string
  email: string
}
let initialState = { id: '', email: '' }
if (getCookie('user')) {
  initialState = JSON.parse(getCookie('user') as string) as UserReduxProps
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserReduxProps, actions: PayloadAction<UserReduxProps>) => {
      state.id = actions.payload.id
      state.email = actions.payload.email
      return state
    },
    resetUser: () => {
      deleteCookie('user')
      return { id: '', email: '' }
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
