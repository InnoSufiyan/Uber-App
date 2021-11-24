import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducer: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDesitnation: (state, action) => {
            state.desitnation = action.payload;
        },
        settravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        }
    }
})

export const {
    setOrigin, setDesitnation, settravelTimeInformation
} = navSlice.actions


export const selectOrigin = (state) => state.nav.origin;
export const selectDesitnation = (state) => state.nav.desitnation;
export const selecttravelTimeInformation = (state) => state.nav.travelTimeInformation;



export default navSlice.reducer