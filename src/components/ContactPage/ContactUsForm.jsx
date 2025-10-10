import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form" // Library for easy form validation and handling
import { apiConnector } from '../../services/apiconnector' // Custom API utility function
import { contactusEndpoint } from '../../services/apis' // API endpoint configuration
import CountryCode from "../../data/countrycode.json" // Country code list for phone number dropdown

const ContactUsForm = () => {

  // State to manage loading spinner or submission state
  const [loading, setLoading] = useState(false);

  // React Hook Form setup
  const {
    register, // Registers input fields for validation
    handleSubmit, // Handles form submission
    reset, // Resets form fields
    formState: { errors, isSubmitSuccessful } // Tracks validation errors and submission success
  } = useForm();

  // Function to handle form submission
  const submitContactForm = async (data) => {
    console.log("Logging Data", data);

    try {
      setLoading(true); // Start loading while submitting

      // Example API call (currently mocked)
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      const response = { status: "OK" };

      console.log("Logging response", response);
      setLoading(false); // Stop loading after response
    }
    catch (error) {
      console.log("Error:", error.message);
      setLoading(false); // Stop loading if an error occurs
    }
  };

  // Reset form fields when submission is successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    // Form wrapper, handleSubmit ensures validation before calling submitContactForm
    <form onSubmit={handleSubmit(submitContactForm)}>

      <div className='flex flex-col gap-14'>
        {/* === Name Fields Section === */}
        <div className='flex gap-5'>

          {/* First Name Field */}
          <div className='flex flex-col'>
            <label htmlFor='firstname'>First Name</label>
            <input
              type='text'
              name='firstname'
              id='firstname'
              placeholder='Enter first name'
              className='text-black'
              {...register("firstname", { required: true })}
            />
            {/* Validation error message */}
            {errors.firstname && (
              <span>Please enter your first name</span>
            )}
          </div>

          {/* Last Name Field */}
          <div className='flex flex-col'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type='text'
              name='lastname'
              id='lastname'
              className='text-black'
              placeholder='Enter last name'
              {...register("lastname")}
            />
          </div>
        </div>

        {/* === Email Field === */}
        <div className='flex flex-col'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            className='text-black'
            placeholder='Enter email address'
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span>Please enter your email address</span>
          )}
        </div>

        {/* === Phone Number Field === */}
        <div className='flex flex-col'>
          <label htmlFor='phonenumber'>Phone Number</label>

          <div className='flex flex-row gap-1'>
            {/* Country Code Dropdown */}
            <select
              name='dropdown'
              id='dropdown'
              className='bg-yellow-50 w-[80px]'
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((element, index) => (
                <option key={index} value={element.code}>
                  {element.code} - {element.country}
                </option>
              ))}
            </select>

            {/* Phone Number Input */}
            <input
              type='number'
              name='phonenumber'
              id='phonenumber'
              placeholder='12345 67890'
              className='text-black w-[calc(100%-90px)]'
              {...register("phoneNo", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "Invalid phone number" },
                minLength: { value: 8, message: "Invalid phone number" }
              })}
            />
          </div>

          {/* Phone validation message */}
          {errors.phoneNo && (
            <span>{errors.phoneNo.message}</span>
          )}
        </div>

        {/* === Message Field === */}
        <div className='flex flex-col'>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            id='message'
            cols='30'
            rows='7'
            className='text-black'
            placeholder='Enter your message here'
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span>Please enter your message</span>
          )}
        </div>

        {/* === Submit Button === */}
        <button
          type='submit'
          disabled={loading} // Optional: disable while submitting
          className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>

    </form>
  )
}

export default ContactUsForm
