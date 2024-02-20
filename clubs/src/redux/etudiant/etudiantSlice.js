import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentEtudiant: null,
    loading: false,
    error: null,
    };

export const etudiantSlice = createSlice({
    name: 'etudiant',
    initialState,
    reducers: {
        signinInStart: (state) => {
            state.loading = true;
            state.error = null;
        }
        ,
        signinInSuccess: (state, action) => {
            state.loading = false;
            state.currentEtudiant = action.payload;
            state.error = false;
        }
        ,
        signinInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
});


export const { signinInStart, signinInSuccess, signinInFailure } = etudiantSlice.actions;

export default etudiantSlice.reducer;
