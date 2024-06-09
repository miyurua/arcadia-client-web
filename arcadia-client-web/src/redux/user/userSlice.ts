import { createSlice } from "@reduxjs/toolkit";

export interface ICurrentUser {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IUserState {
    currentUser: ICurrentUser | null;
    error: string | null;
    loading: boolean;
}
const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutStart: (state) => {
            state.loading = true;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signoutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }

    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutStart,
    signoutSuccess,
    signoutFailure
} = userSlice.actions;

export default userSlice.reducer;