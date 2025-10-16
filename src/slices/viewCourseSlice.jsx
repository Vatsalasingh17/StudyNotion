import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the course viewing feature
const initialState = {
  // Array containing data about each course section (e.g., modules, lessons)
  courseSectionData: [],

  // Stores detailed information about the entire course (e.g., title, description)
  courseEntireData: [],

  // Array that tracks which lectures the user has completed
  completedLectures: [],

  // Stores the total number of lectures in the course
  totalNoOfLectures: 0,
}

// Create a Redux slice for managing course viewing state
const viewCourseSlice = createSlice({
  name: "viewCourse", // Slice name (used internally by Redux)
  initialState,       // The initial state defined above

  // Reducers define actions that modify the slice of state
  reducers: {
    // Set or update all section data for the course
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },

    // Set or update the entire course data object
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },

    // Set or update the total number of lectures in the course
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },

    // Set or replace the list of completed lectures (useful when fetching from backend)
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },

    // Add a newly completed lecture to the completed lectures array
    // This assumes 'action.payload' contains the lecture ID or data
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

// Export individual action creators for dispatching updates
export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

// Export the reducer to be included in the Redux store
export default viewCourseSlice.reducer
