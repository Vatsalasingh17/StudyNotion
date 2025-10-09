import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    // Access user data and loading states from Redux store
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    // Initialize dispatch for Redux actions
    const dispatch = useDispatch();

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Local state to control the logout confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null);

    // If profile or auth data is still loading, show a loading message
    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

    return (
        <div className='text-white'>

            {/* ----------------------------- */}
            {/* Sidebar Container */}
            {/* ----------------------------- */}
            <div
                className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
                h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'
            >

                {/* ----------------------------- */}
                {/* Sidebar Navigation Links */}
                {/* ----------------------------- */}
                <div className='flex flex-col'>
                    {
                        // Map through all sidebar links
                        sidebarLinks.map((link) => {

                            // If the link has a 'type' (like 'Instructor' or 'Student'),
                            // only show it if it matches the logged-in user's account type
                            if (link.type && user?.accountType !== link.type) return null;

                            // Render individual SidebarLink component
                            return (
                                <SidebarLink
                                    key={link.id}
                                    link={link}
                                    iconName={link.icon}
                                />
                            )
                        })
                    }
                </div>

                {/* Divider Line */}
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

                {/* ----------------------------- */}
                {/* Settings and Logout Section */}
                {/* ----------------------------- */}
                <div className='flex flex-col'>

                    {/* Static link to Settings page */}
                    <SidebarLink
                        link={{ name: "Settings", path: "dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    {/* Logout Button */}
                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are You Sure ?", // Confirmation title
                                text2: "You will be logged out of your Account", // Subtext
                                btn1Text: "Logout", // Confirm button
                                btn2Text: "Cancel", // Cancel button
                                btn1Handler: () => dispatch(logout(navigate)), // Handle logout
                                btn2Handler: () => setConfirmationModal(null), // Close modal
                            })
                        }
                        className='text-sm font-medium text-richblack-300'
                    >

                        {/* Logout Icon and Text */}
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg' />
                            <span>Logout</span>
                        </div>

                    </button>

                </div>
            </div>

            {/* ----------------------------- */}
            {/* Confirmation Modal (Logout) */}
            {/* ----------------------------- */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar
