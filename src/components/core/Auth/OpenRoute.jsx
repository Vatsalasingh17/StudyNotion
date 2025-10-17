// This component restricts access to routes meant for unauthenticated users
// (e.g., Login or Signup pages). If a user is already logged in (has a token),
// they are redirected to their dashboard instead.

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  // Access authentication state from Redux store
  const { token } = useSelector((state) => state.auth)

  // If no token exists (user is not logged in), allow access to the child route/component
  if (token === null) {
    return children
  } 
  // If a token exists (user is authenticated), redirect them to their dashboard
  else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute
