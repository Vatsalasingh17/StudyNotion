// Import the signup page image asset
import signupImg from "../assets/Images/signup.webp"

// Import the Template component used for authentication pages (login/signup)
import Template from "../components/core/Auth/Template"

// Signup component definition
function Signup() {
  return (
    // Render the Template component with props specific to the signup page
    <Template
      // Title text displayed at the top of the signup section
      title="Join the millions learning to code with StudyNotion for free"
      
      // First line of the description under the title
      description1="Build skills for today, tomorrow, and beyond."
      
      // Second line of the description under the title
      description2="Education to future-proof your career."
      
      // Image displayed on the signup page
      image={signupImg}
      
      // Indicates that this template should render the signup form
      formType="signup"
    />
  )
}

// Export the Signup component so it can be used elsewhere in the app
export default Signup
