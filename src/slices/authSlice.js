import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for authentication
// It checks if there's a "token" in localStorage and loads it; otherwise, it's set to null
const initialState = {
    token: localStorage.getItem("token") 
        ? JSON.parse(localStorage.getItem("token")) 
        : null,
};

// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth", // Slice name (used internally by Redux)
    initialState: initialState, // The initial state defined above

    // Reducers define how the state changes in response to actions
    reducers: {
        // Action to set the authentication token
        // The payload contains the new token value
        setToken(state, value) {
            state.token = value.payload;

            // (Optional good practice)
            // Also update localStorage so the token persists across page reloads
            // localStorage.setItem("token", JSON.stringify(value.payload));
        },
    },
});

// Export the action creator for setting a token
export const { setToken } = authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;
