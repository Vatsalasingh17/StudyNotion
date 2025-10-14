// Importing the login page image asset
import loginImg from "../assets/Images/login.webp"

// Importing the reusable authentication page template component
import Template from "../components/core/Auth/Template"

// =============================
// Login Page Component
// =============================
function Login() {
  return (
    // The Template component handles the overall layout for both Login and Signup pages.
    // Here we pass props to customize it for the Login page.
    <Template
      title="Welcome Back"                                // Main heading for the login page
      description1="Build skills for today, tomorrow, and beyond."  // First line of description
      description2="Education to future-proof your career."         // Second line of description
      image={loginImg}                                    // Background or side image for the login page
      formType="login"                                    // Specifies which form (login/signup) to render
    />
  )
}

// Exporting the Login component so it can be used in routing (e.g., <Route path="/login" />)
export default Login
