import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {

    // Access user data from Redux store (state.profile)
    const { user } = useSelector((state) => state.profile);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    return (
        <div className='text-white'>
            
            {/* Page Heading */}
            <h1>My Profile</h1>

            {/* ----------------------------- */}
            {/* Section 1: Profile Image & Basic Info */}
            {/* ----------------------------- */}
            <div className='flex justify-between items-center'>
                
                {/* User Avatar and Basic Info */}
                <div className='flex items-center gap-4'>
                    <img 
                        src={user?.image} // User profile image
                        alt={`profile-${user?.firstName}`} // Accessible alt text
                        className='aspect-square w-[78px] rounded-full object-cover' 
                    />
                    
                    {/* Display user's name and email */}
                    <div>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>

                {/* Edit Button to navigate to settings */}
                <IconBtn
                    text="Edit"
                    onclick={() => navigate("/dashboard/settings")}
                />
            </div>

            {/* ----------------------------- */}
            {/* Section 2: About Section */}
            {/* ----------------------------- */}
            <div className='mt-6'>
                <div className='flex justify-between items-center'>
                    <p>About</p>

                    {/* Edit About Info Button */}
                    <IconBtn
                        text="Edit"
                        onclick={() => navigate("/dashboard/settings")}
                    />
                </div>

                {/* Show About text or fallback message */}
                <p>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
            </div>

            {/* ----------------------------- */}
            {/* Section 3: Personal Details */}
            {/* ----------------------------- */}
            <div className='mt-6'>
                <div className='flex justify-between items-center'>
                    <p>Personal Details</p>

                    {/* Edit Personal Details Button */}
                    <IconBtn
                        text="Edit"
                        onclick={() => navigate("/dashboard/settings")}
                    />
                </div>

                {/* User Info Grid */}
                <div className='grid grid-cols-2 gap-4 mt-3'>
                    
                    {/* Individual Detail Fields */}
                    <div>
                        <p>First Name</p>
                        <p>{user?.firstName}</p>
                    </div>

                    <div>
                        <p>Email</p>
                        <p>{user?.email}</p>
                    </div>

                    <div>
                        <p>Gender</p>
                        <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>

                    <div>
                        <p>Last Name</p>
                        <p>{user?.lastName}</p>
                    </div>

                    <div>
                        <p>Phone Number</p>
                        <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>

                    <div>
                        <p>Date of Birth</p>
                        <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile
