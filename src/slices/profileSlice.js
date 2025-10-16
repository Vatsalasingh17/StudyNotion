import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user profile
// Initially, there is no user data (null)
const initialState = {
    user: null,
};

// Create a Redux slice for managing user profile data
const profileSlice = createSlice({
    name: "profile",          // The name of this slice (used in Redux DevTools)
    initialState: initialState, // Initial state defined above

    // Reducers define how the state can be updated
    reducers: {
        // Action to set or update the user data
        // 'value.payload' contains the new user object
        setUser(state, value) {
            state.user = value.payload;
        },
    },
});

// Export the action creator (for dispatching updates)
export const { setUser } = profileSlice.actions;

// Export the reducer to be included in the Redux store
export default profileSlice.reducer;
