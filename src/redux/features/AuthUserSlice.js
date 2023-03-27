import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getUserAuthorization = createAsyncThunk(
    'user/getUserAuthorization', 
    async (props, {rejectWithValue, dispatch}) => {
       
    const res = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user: { ...props } }),
      })
    .then(res => res.json()).then(data => data.user)
    .catch((error) => rejectWithValue(error))

    dispatch(setUserAutorization(res))
})

export const getUserRegistration = createAsyncThunk(
    'user/getUserRegistration', 
    async (props, {rejectWithValue, dispatch}) => {
    
    const res = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user: { ...props } }),
      })
    .then(res => res.json()).then(data => data.user)
    .catch((error) => rejectWithValue(error))

    dispatch(setUserRegistration(res))
})

export const getEditUser = createAsyncThunk(
    'user/getEditUser', 
    async (props, {rejectWithValue, dispatch}) => {
    const res = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${window.localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ user: { ...props } }),
      })
    .then(res => res.json()).then(data => data.user)
    .catch((error) => rejectWithValue(error))
    dispatch(setEditUser(res))
})

const initialState = {
    username: '',
    email: '',
    token: '',
    image: '',
    isLoaded: false,
    error: ''
}

const userSlise = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAutorization: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.token = action.payload.token
            state.image = action.payload.image
        },
        setUserRegistration: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.token = action.payload.token
            state.image = action.payload.image
        },
        setEditUser: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.token = action.payload.token
            state.image = action.payload.image
        }
    },
    extraReducers: {
        [getUserAuthorization.pending]: (state) => {
            state.isLoaded = false
        },
        [getUserAuthorization.fulfilled]: (state) => {
            state.isLoaded = true
        },
        [getUserAuthorization.rejected]: (state) => {
            state.isLoaded = false
            state.error = "Email or password is not valid"
        }
    }
})

export const { setUserAutorization, setUserRegistration, setEditUser } = userSlise.actions
export const userSliceReducer = userSlise.reducer